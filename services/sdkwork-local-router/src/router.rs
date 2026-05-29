﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿use std::sync::Arc;

use axum::extract::State;
use axum::http::header;
use axum::http::HeaderValue;
use axum::middleware;
use axum::response::IntoResponse;
use axum::routing::{delete, get, post, put};
use axum::{Json, Router};
use parking_lot::RwLock;
use serde_json::json;
use tower_http::cors::{Any, CorsLayer};
use tower_http::limit::RequestBodyLimitLayer;

use crate::auth;
use crate::integration;
use crate::passthrough;
use crate::rate_limit::{RateLimiter, rate_limit_middleware};
use sdkwork_lr_config::RuntimeConfig;
use sdkwork_lr_core::Account;
use sdkwork_lr_core::AccountPool;
use sdkwork_lr_core::CircuitBreakerConfig;
use sdkwork_lr_core::HealthManager;
use sdkwork_lr_core::InterceptorChain;
use sdkwork_lr_core::LoggingInterceptor;
use sdkwork_lr_core::MetricsInterceptor;
use sdkwork_lr_proxy::ProxyClient;
use sdkwork_lr_store::Store;

#[derive(Clone)]
pub struct AppState {
    pub config: Arc<RuntimeConfig>,
    pub pool: Arc<RwLock<AccountPool>>,
    pub client: ProxyClient,
    pub store: Store,
    pub rate_limiter: Arc<RateLimiter>,
    pub interceptor_chain: Arc<InterceptorChain>,
    pub health_manager: Arc<HealthManager>,
}

pub async fn build_router(config: &RuntimeConfig, store: Store, rate_limiter: Arc<RateLimiter>) -> anyhow::Result<(Router, Arc<HealthManager>, Arc<RwLock<AccountPool>>)> {
    let accounts: Vec<Account> = config.upstreams.iter().map(|u| Account {
        name: u.name.clone(),
        provider: u.provider.clone(),
        base_url: u.base_url.clone(),
        api_key: u.api_key.clone(),
        models: u.models.clone(),
        priority: u.priority,
        timeout: u.timeout,
        max_retries: u.max_retries,
        retry_delay_ms: u.retry_delay_ms,
        anthropic_version: u.anthropic_version.clone(),
        default_headers: u.default_headers.clone(),
        enabled: true,
        model_aliases: u.model_aliases.clone(),
    }).collect();

    let cb_config = CircuitBreakerConfig {
        failure_threshold: config.circuit_breaker.failure_threshold,
        success_threshold: config.circuit_breaker.success_threshold,
        open_duration: config.circuit_breaker.open_duration,
        half_open_max_requests: config.circuit_breaker.half_open_max_requests,
    };
    let health_manager = Arc::new(HealthManager::new(cb_config));
    let pool = sdkwork_lr_core::AccountPool::with_health_manager(accounts, config.routing.strategy, health_manager.clone());
    let pool_arc = Arc::new(RwLock::new(pool));
    let client = sdkwork_lr_proxy::build_proxy_client();

    let mut interceptor_chain = InterceptorChain::new();
    interceptor_chain.add(Arc::new(LoggingInterceptor));
    interceptor_chain.add(Arc::new(MetricsInterceptor));

    let state = AppState {
        config: Arc::new(config.clone()),
        pool: pool_arc.clone(),
        client,
        store,
        rate_limiter,
        interceptor_chain: Arc::new(interceptor_chain),
        health_manager: health_manager.clone(),
    };

    let bp = &config.base_paths;
    let cors = build_cors_layer(&config.cors);

    let health_routes = Router::new()
        .route("/healthz", get(healthz))
        .route("/readyz", get(readyz))
        .route("/metrics", get(integration::metrics_endpoint));

    let dashboard_routes = Router::new()
        .route("/", get(crate::dashboard::dashboard))
        .route("/dashboard", get(crate::dashboard::dashboard));

    let proxy_routes = passthrough::routes(&bp.openai, &bp.anthropic, &bp.google)
        .layer(middleware::from_fn_with_state(state.clone(), rate_limit_middleware))
        .layer(middleware::from_fn_with_state(state.clone(), auth::auth_middleware));

    let app_routes = app_api_routes()
        .layer(middleware::from_fn_with_state(state.clone(), auth::auth_middleware));

    let backend_routes = backend_api_routes()
        .layer(middleware::from_fn_with_state(state.clone(), auth::admin_auth_middleware));

    let body_limit_bytes = config.server.max_body_size_bytes();

    let router = Router::new()
        .merge(health_routes)
        .merge(dashboard_routes)
        .merge(proxy_routes)
        .merge(app_routes)
        .merge(backend_routes)
        .layer(RequestBodyLimitLayer::new(body_limit_bytes))
        .layer(cors)
        .with_state(state);

    Ok((router, health_manager, pool_arc))
}

fn build_cors_layer(cors_config: &sdkwork_lr_config::CorsConfig) -> CorsLayer {
    if cors_config.is_allow_any() {
        tracing::warn!("CORS allows any origin - not recommended for production");
        return CorsLayer::new()
            .allow_origin(Any)
            .allow_methods(Any)
            .allow_headers(Any);
    }

    let origins: Vec<HeaderValue> = cors_config.allowed_origins.iter()
        .filter_map(|origin| {
            if origin.contains(":*") {
                None
            } else {
                origin.parse::<HeaderValue>().ok()
            }
        })
        .collect();

    let wildcard_patterns: Vec<&str> = cors_config.allowed_origins.iter()
        .filter(|o| o.contains(":*"))
        .map(|o| o.as_str())
        .collect();

    let mut cors = CorsLayer::new()
        .allow_methods([axum::http::Method::GET, axum::http::Method::POST, axum::http::Method::PUT, axum::http::Method::DELETE, axum::http::Method::OPTIONS])
        .allow_headers([header::CONTENT_TYPE, header::AUTHORIZATION, header::ACCEPT, header::HeaderName::from_static("x-api-key"), header::HeaderName::from_static("x-request-id"), header::HeaderName::from_static("anthropic-version")])
        .expose_headers([header::HeaderName::from_static("x-request-id")]);

    if !origins.is_empty() && wildcard_patterns.is_empty() {
        cors = cors.allow_origin(origins);
    } else if !wildcard_patterns.is_empty() {
        cors = cors.allow_origin(Any);
        tracing::info!(
            patterns = ?wildcard_patterns,
            "CORS: wildcard patterns detected, allowing any origin (use specific origins in production)"
        );
    }

    cors
}

fn app_api_routes() -> Router<AppState> {
    Router::new()
        .route("/app/v3/api/router/status", get(integration::router_status))
        .route("/app/v3/api/router/models", get(integration::list_models))
        .route("/app/v3/api/auth/sessions", post(integration::create_session))
}

fn backend_api_routes() -> Router<AppState> {
    Router::new()
        .route("/backend/v3/api/router/upstreams", get(integration::list_upstreams))
        .route("/backend/v3/api/router/logs", get(integration::list_logs))
        .route("/backend/v3/api/router/plugins", get(integration::list_plugins))
        .route("/backend/v3/api/router/accounts", get(integration::list_accounts).post(integration::create_account))
        .route("/backend/v3/api/router/accounts/{id}", put(integration::update_account).delete(integration::delete_account))
        .route("/backend/v3/api/router/accounts/{id}/toggle", post(integration::toggle_account))
        .route("/backend/v3/api/router/usages", get(integration::list_usages))
        .route("/backend/v3/api/router/usages/summary", get(integration::usage_summary))
        .route("/backend/v3/api/router/health", get(integration::list_health))
        .route("/backend/v3/api/router/health/{name}/open", post(integration::force_open_account))
        .route("/backend/v3/api/router/health/{name}/close", post(integration::force_close_account))
        .route("/backend/v3/api/router/strategy", post(integration::set_routing_strategy))
}

async fn healthz() -> impl IntoResponse {
    Json(json!({"status": "ok", "service": "sdkwork-local-router"}))
}

async fn readyz(State(state): State<AppState>) -> impl IntoResponse {
    let pool = state.pool.read();
    let mut response = json!({
        "status": "ok",
        "service": "sdkwork-local-router",
        "upstream_count": pool.len(),
        "routing_strategy": format!("{:?}", pool.strategy()),
    });
    response["version"] = json!(env!("CARGO_PKG_VERSION"));
    Json(response)
}
