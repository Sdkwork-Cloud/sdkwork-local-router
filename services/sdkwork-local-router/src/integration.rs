﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿use axum::extract::{Path, Query, State};
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::Json;
use serde::Deserialize;
use serde_json::json;

use crate::router::AppState;
use sdkwork_lr_core::Account;
use sdkwork_lr_store::NewAccount;

#[derive(Deserialize)]
pub struct PaginationParams {
    pub limit: Option<i64>,
    pub offset: Option<i64>,
}

#[derive(Deserialize)]
pub struct UsageQueryParams {
    pub limit: Option<i64>,
    pub offset: Option<i64>,
    pub model: Option<String>,
}

#[derive(Deserialize)]
pub struct CreateAccountRequest {
    pub name: String,
    pub provider: String,
    pub base_url: String,
    #[serde(default)]
    pub api_key: String,
    #[serde(default)]
    pub models: Vec<String>,
    #[serde(default = "default_priority")]
    pub priority: i32,
    #[serde(default = "default_timeout")]
    pub timeout_secs: i64,
    #[serde(default)]
    pub max_retries: i32,
    #[serde(default = "default_retry_delay")]
    pub retry_delay_ms: i64,
    pub anthropic_version: Option<String>,
    #[serde(default)]
    pub default_headers: std::collections::BTreeMap<String, String>,
    #[serde(default)]
    pub model_aliases: std::collections::BTreeMap<String, String>,
    #[serde(default = "default_enabled")]
    pub enabled: bool,
}

fn default_priority() -> i32 { 10 }
fn default_timeout() -> i64 { 120 }
fn default_enabled() -> bool { true }
fn default_retry_delay() -> i64 { 500 }

impl From<&CreateAccountRequest> for NewAccount {
    fn from(req: &CreateAccountRequest) -> Self {
        NewAccount {
            name: req.name.clone(),
            provider: req.provider.clone(),
            base_url: req.base_url.clone(),
            api_key: req.api_key.clone(),
            models: req.models.clone(),
            priority: req.priority,
            timeout_secs: req.timeout_secs,
            max_retries: req.max_retries,
            retry_delay_ms: req.retry_delay_ms,
            anthropic_version: req.anthropic_version.clone(),
            default_headers: req.default_headers.clone(),
            model_aliases: req.model_aliases.clone(),
            enabled: req.enabled,
        }
    }
}

#[derive(Deserialize)]
pub struct UpdateAccountRequest {
    pub name: Option<String>,
    pub provider: Option<String>,
    pub base_url: Option<String>,
    pub api_key: Option<String>,
    pub models: Option<Vec<String>>,
    pub priority: Option<i32>,
    pub timeout_secs: Option<i64>,
    pub max_retries: Option<i32>,
    pub retry_delay_ms: Option<i64>,
    pub anthropic_version: Option<String>,
    pub default_headers: Option<std::collections::BTreeMap<String, String>>,
    pub model_aliases: Option<std::collections::BTreeMap<String, String>>,
    pub enabled: Option<bool>,
}

pub async fn router_status(State(state): State<AppState>) -> impl IntoResponse {
    let pool = state.pool.read();
    let upstreams: Vec<serde_json::Value> = pool.enabled_accounts().iter().map(|a| {
        json!({
            "name": a.name,
            "provider": a.provider.to_string(),
            "base_url": a.base_url,
            "models": a.models,
            "priority": a.priority,
        })
    }).collect();
    let routing_strategy = format!("{:?}", pool.strategy());
    drop(pool);

    Json(json!({
        "status": "ok",
        "service": "sdkwork-local-router",
        "version": env!("CARGO_PKG_VERSION"),
        "upstream_count": upstreams.len(),
        "upstreams": upstreams,
        "routing_strategy": routing_strategy,
        "fallback_enabled": state.config.fallback.enabled,
        "auth_mode": match state.config.auth.mode {
            sdkwork_lr_config::AuthMode::None => "none",
            sdkwork_lr_config::AuthMode::StaticKey => "static-key",
        },
    }))
}

pub async fn list_models(State(state): State<AppState>) -> impl IntoResponse {
    let pool = state.pool.read();
    let mut models: Vec<serde_json::Value> = pool.enabled_accounts().iter()
        .flat_map(|a| {
            a.models.iter().map(move |m| {
                json!({
                    "id": m,
                    "object": "model",
                    "owned_by": a.provider.to_string(),
                })
            })
        })
        .collect();
    models.sort_by(|a, b| {
        a.get("id").and_then(|v| v.as_str()).unwrap_or("")
            .cmp(b.get("id").and_then(|v| v.as_str()).unwrap_or(""))
    });
    models.dedup_by(|a, b| a.get("id") == b.get("id"));
    Json(json!({
        "object": "list",
        "data": models
    }))
}

pub async fn create_session() -> impl IntoResponse {
    Json(json!({
        "id": uuid::Uuid::new_v4().to_string(),
        "token": uuid::Uuid::new_v4().to_string(),
    }))
}

pub async fn list_upstreams(State(state): State<AppState>) -> impl IntoResponse {
    let pool = state.pool.read();
    let upstreams: Vec<serde_json::Value> = pool.accounts().iter().map(|a| {
        json!({
            "name": a.name,
            "provider": a.provider.to_string(),
            "base_url": a.base_url,
            "models": a.models,
            "priority": a.priority,
            "enabled": a.enabled,
        })
    }).collect();
    Json(json!({"upstreams": upstreams}))
}

pub async fn list_logs(
    State(state): State<AppState>,
    Query(params): Query<PaginationParams>,
) -> impl IntoResponse {
    let limit = params.limit.unwrap_or(100).min(1000);
    let offset = params.offset.unwrap_or(0);
    match state.store.list_invocations(limit, offset).await {
        Ok(logs) => Json(json!({"logs": logs, "limit": limit, "offset": offset})).into_response(),
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": e.to_string()}))).into_response(),
    }
}

pub async fn list_plugins() -> impl IntoResponse {
    Json(json!({
        "plugins": [
            {"name": "logging", "enabled": true},
            {"name": "metrics", "enabled": true},
            {"name": "transform", "enabled": true},
            {"name": "fallback", "enabled": true},
        ]
    }))
}

pub async fn list_accounts(State(state): State<AppState>) -> impl IntoResponse {
    match state.store.list_accounts().await {
        Ok(accounts) => {
            let masked: Vec<serde_json::Value> = accounts.iter().map(|a| {
                let masked_key = if a.api_key.is_empty() {
                    String::new()
                } else if a.api_key.len() > 8 {
                    format!("{}...{}", &a.api_key[..4], &a.api_key[a.api_key.len()-4..])
                } else {
                    "****".to_owned()
                };
                json!({
                    "id": a.id,
                    "name": a.name,
                    "provider": a.provider,
                    "base_url": a.base_url,
                    "api_key": masked_key,
                    "models": a.models,
                    "priority": a.priority,
                    "timeout_secs": a.timeout_secs,
                    "max_retries": a.max_retries,
                    "retry_delay_ms": a.retry_delay_ms,
                    "anthropic_version": a.anthropic_version,
                    "default_headers": a.default_headers,
                    "model_aliases": a.model_aliases,
                    "enabled": a.enabled,
                })
            }).collect();
            Json(json!({"accounts": masked})).into_response()
        }
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": e.to_string()}))).into_response(),
    }
}

pub async fn create_account(
    State(state): State<AppState>,
    Json(req): Json<CreateAccountRequest>,
) -> impl IntoResponse {
    if req.name.trim().is_empty() {
        return (StatusCode::BAD_REQUEST, Json(json!({"error": "name is required"}))).into_response();
    }
    if req.base_url.trim().is_empty() {
        return (StatusCode::BAD_REQUEST, Json(json!({"error": "base_url is required"}))).into_response();
    }
    if !req.base_url.starts_with("http://") && !req.base_url.starts_with("https://") {
        return (StatusCode::BAD_REQUEST, Json(json!({"error": "base_url must start with http:// or https://"}))).into_response();
    }
    let valid_providers = ["openai", "anthropic", "google"];
    if !req.provider.is_empty() && !valid_providers.contains(&req.provider.to_ascii_lowercase().as_str()) {
        if !req.provider.chars().all(|c| c.is_alphanumeric() || c == '_' || c == '-') {
            return (StatusCode::BAD_REQUEST, Json(json!({"error": "provider must be one of: openai, anthropic, google, or a custom alphanumeric name"}))).into_response();
        }
    }
    if req.priority < 0 {
        return (StatusCode::BAD_REQUEST, Json(json!({"error": "priority must be non-negative"}))).into_response();
    }
    if req.timeout_secs < 1 || req.timeout_secs > 600 {
        return (StatusCode::BAD_REQUEST, Json(json!({"error": "timeout_secs must be between 1 and 600"}))).into_response();
    }
    if req.max_retries < 0 || req.max_retries > 10 {
        return (StatusCode::BAD_REQUEST, Json(json!({"error": "max_retries must be between 0 and 10"}))).into_response();
    }

    let new_account: NewAccount = (&req).into();
    match state.store.insert_account(&new_account).await {
        Ok(id) => {
            reload_pool_from_store(&state).await;
            (StatusCode::CREATED, Json(json!({"id": id, "name": req.name}))).into_response()
        }
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": e.to_string()}))).into_response(),
    }
}

pub async fn update_account(
    State(state): State<AppState>,
    Path(id): Path<i64>,
    Json(req): Json<UpdateAccountRequest>,
) -> impl IntoResponse {
    if let Some(ref name) = req.name {
        if name.trim().is_empty() {
            return (StatusCode::BAD_REQUEST, Json(json!({"error": "name must not be empty"}))).into_response();
        }
    }
    if let Some(ref base_url) = req.base_url {
        if base_url.trim().is_empty() {
            return (StatusCode::BAD_REQUEST, Json(json!({"error": "base_url must not be empty"}))).into_response();
        }
        if !base_url.starts_with("http://") && !base_url.starts_with("https://") {
            return (StatusCode::BAD_REQUEST, Json(json!({"error": "base_url must start with http:// or https://"}))).into_response();
        }
    }
    if let Some(ref provider) = req.provider {
        let valid_providers = ["openai", "anthropic", "google"];
        if !provider.is_empty() && !valid_providers.contains(&provider.to_ascii_lowercase().as_str()) {
            if !provider.chars().all(|c| c.is_alphanumeric() || c == '_' || c == '-') {
                return (StatusCode::BAD_REQUEST, Json(json!({"error": "provider must be one of: openai, anthropic, google, or a custom alphanumeric name"}))).into_response();
            }
        }
    }
    if let Some(priority) = req.priority {
        if priority < 0 {
            return (StatusCode::BAD_REQUEST, Json(json!({"error": "priority must be non-negative"}))).into_response();
        }
    }
    if let Some(timeout_secs) = req.timeout_secs {
        if timeout_secs < 1 || timeout_secs > 600 {
            return (StatusCode::BAD_REQUEST, Json(json!({"error": "timeout_secs must be between 1 and 600"}))).into_response();
        }
    }
    if let Some(max_retries) = req.max_retries {
        if max_retries < 0 || max_retries > 10 {
            return (StatusCode::BAD_REQUEST, Json(json!({"error": "max_retries must be between 0 and 10"}))).into_response();
        }
    }

    let existing = match state.store.get_account(id).await {
        Ok(account) => account,
        Err(sdkwork_lr_store::StoreError::NotFound(_)) => {
            return (StatusCode::NOT_FOUND, Json(json!({"error": "account not found"}))).into_response();
        }
        Err(e) => return (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": e.to_string()}))).into_response(),
    };

    let updated = NewAccount {
        name: req.name.unwrap_or(existing.name),
        provider: req.provider.unwrap_or(existing.provider),
        base_url: req.base_url.unwrap_or(existing.base_url),
        api_key: req.api_key.filter(|k| !k.is_empty()).unwrap_or(existing.api_key),
        models: req.models.unwrap_or_else(|| {
            serde_json::from_str(&existing.models).unwrap_or_default()
        }),
        priority: req.priority.unwrap_or(existing.priority),
        timeout_secs: req.timeout_secs.unwrap_or(existing.timeout_secs),
        max_retries: req.max_retries.unwrap_or(existing.max_retries),
        retry_delay_ms: req.retry_delay_ms.unwrap_or(existing.retry_delay_ms),
        anthropic_version: req.anthropic_version.or(existing.anthropic_version),
        default_headers: req.default_headers.unwrap_or_else(|| {
            serde_json::from_str(&existing.default_headers.unwrap_or_default()).unwrap_or_default()
        }),
        model_aliases: req.model_aliases.unwrap_or_else(|| {
            serde_json::from_str(&existing.model_aliases.unwrap_or_default()).unwrap_or_default()
        }),
        enabled: req.enabled.unwrap_or(existing.enabled),
    };

    match state.store.update_account(id, &updated).await {
        Ok(()) => {
            reload_pool_from_store(&state).await;
            Json(json!({"id": id, "status": "updated"})).into_response()
        }
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": e.to_string()}))).into_response(),
    }
}

pub async fn delete_account(
    State(state): State<AppState>,
    Path(id): Path<i64>,
) -> impl IntoResponse {
    match state.store.delete_account(id).await {
        Ok(()) => {
            reload_pool_from_store(&state).await;
            Json(json!({"id": id, "status": "deleted"})).into_response()
        }
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": e.to_string()}))).into_response(),
    }
}

pub async fn toggle_account(
    State(state): State<AppState>,
    Path(id): Path<i64>,
    Json(body): Json<serde_json::Value>,
) -> impl IntoResponse {
    let enabled = body.get("enabled").and_then(|v| v.as_bool()).unwrap_or(true);
    match state.store.toggle_account(id, enabled).await {
        Ok(()) => {
            reload_pool_from_store(&state).await;
            Json(json!({"id": id, "enabled": enabled})).into_response()
        }
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": e.to_string()}))).into_response(),
    }
}

pub async fn list_usages(
    State(state): State<AppState>,
    Query(params): Query<UsageQueryParams>,
) -> impl IntoResponse {
    let limit = params.limit.unwrap_or(100).min(1000);
    let offset = params.offset.unwrap_or(0);
    match state.store.list_usages(limit, offset).await {
        Ok(usages) => Json(json!({"usages": usages, "limit": limit, "offset": offset})).into_response(),
        Err(e) => (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": e.to_string()}))).into_response(),
    }
}

pub async fn usage_summary(State(state): State<AppState>) -> impl IntoResponse {
    let totals = state.store.usage_totals().await;
    let by_model = state.store.usage_by_model().await;
    let invocation_count = state.store.count_invocations().await;
    let account_count = state.store.count_accounts().await;

    match (totals, by_model, invocation_count, account_count) {
        (Ok(totals), Ok(by_model), Ok(invocations), Ok(accounts)) => {
            Json(json!({
                "totals": totals,
                "by_model": by_model,
                "invocation_count": invocations,
                "account_count": accounts,
            })).into_response()
        }
        (Err(e), _, _, _) | (_, Err(e), _, _) | (_, _, Err(e), _) | (_, _, _, Err(e)) => {
            (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({"error": format!("failed to aggregate usage: {e}")}))).into_response()
        }
    }
}

pub async fn list_health(State(state): State<AppState>) -> impl IntoResponse {
    let pool = state.pool.read();
    let snapshots = pool.health_manager().snapshots();
    let healthy = pool.health_manager().healthy_count();
    let degraded = pool.health_manager().degraded_count();
    let circuit_open = pool.health_manager().circuit_open_count();
    drop(pool);
    Json(json!({
        "summary": {
            "healthy": healthy,
            "degraded": degraded,
            "circuit_open": circuit_open,
            "total": snapshots.len(),
        },
        "accounts": snapshots,
    }))
}

pub async fn force_open_account(
    State(state): State<AppState>,
    Path(name): Path<String>,
) -> impl IntoResponse {
    let pool = state.pool.read();
    if pool.health_manager().force_open(&name) {
        drop(pool);
        Json(json!({"account": name, "action": "force_open", "status": "ok"})).into_response()
    } else {
        drop(pool);
        (StatusCode::NOT_FOUND, Json(json!({"error": "account not found in health registry"}))).into_response()
    }
}

pub async fn force_close_account(
    State(state): State<AppState>,
    Path(name): Path<String>,
) -> impl IntoResponse {
    let pool = state.pool.read();
    if pool.health_manager().force_close(&name) {
        drop(pool);
        Json(json!({"account": name, "action": "force_close", "status": "ok"})).into_response()
    } else {
        drop(pool);
        (StatusCode::NOT_FOUND, Json(json!({"error": "account not found in health registry"}))).into_response()
    }
}

#[derive(Deserialize)]
pub struct SetStrategyRequest {
    pub strategy: String,
}

pub async fn set_routing_strategy(
    State(state): State<AppState>,
    Json(req): Json<SetStrategyRequest>,
) -> impl IntoResponse {
    let strategy = match req.strategy.to_ascii_lowercase().as_str() {
        "priority" => sdkwork_lr_core::RoutingStrategy::Priority,
        "round_robin" | "roundrobin" => sdkwork_lr_core::RoutingStrategy::RoundRobin,
        "random" => sdkwork_lr_core::RoutingStrategy::Random,
        "least_latency" | "leastlatency" => sdkwork_lr_core::RoutingStrategy::LeastLatency,
        _ => return (StatusCode::BAD_REQUEST, Json(json!({"error": "invalid strategy, valid: priority, round_robin, random, least_latency"}))).into_response(),
    };
    let pool = state.pool.read();
    let old = pool.strategy();
    pool.set_strategy(strategy);
    drop(pool);
    Json(json!({"old_strategy": format!("{:?}", old), "new_strategy": format!("{:?}", strategy)})).into_response()
}

async fn reload_pool_from_store(state: &AppState) {
    match state.store.list_accounts().await {
        Ok(rows) => {
            let accounts: Vec<Account> = rows.into_iter().filter_map(|r| {
                let provider = match r.provider.as_str() {
                    "openai" => sdkwork_lr_core::ProviderKind::Openai,
                    "anthropic" => sdkwork_lr_core::ProviderKind::Anthropic,
                    "google" => sdkwork_lr_core::ProviderKind::Google,
                    other => sdkwork_lr_core::ProviderKind::Custom(other.to_owned()),
                };
                let models: Vec<String> = serde_json::from_str(&r.models).unwrap_or_default();
                let default_headers: std::collections::BTreeMap<String, String> =
                    serde_json::from_str(&r.default_headers.unwrap_or_default()).unwrap_or_default();
                let model_aliases: std::collections::BTreeMap<String, String> =
                    serde_json::from_str(&r.model_aliases.unwrap_or_default()).unwrap_or_default();

                Some(Account {
                    name: r.name,
                    provider,
                    base_url: r.base_url,
                    api_key: r.api_key,
                    models,
                    priority: r.priority as u32,
                    timeout: std::time::Duration::from_secs(r.timeout_secs as u64),
                    max_retries: r.max_retries as u32,
                    retry_delay_ms: r.retry_delay_ms as u64,
                    anthropic_version: r.anthropic_version,
                    default_headers,
                    enabled: r.enabled,
                    model_aliases,
                })
            }).collect();

            let (strategy, health_manager) = {
                let pool = state.pool.read();
                (pool.strategy(), pool.health_manager().clone())
            };
            let new_pool = sdkwork_lr_core::AccountPool::with_health_manager(
                accounts, strategy, health_manager,
            );
            *state.pool.write() = new_pool;
            tracing::info!("account pool hot-reloaded from database");
        }
        Err(e) => {
            tracing::error!(error = %e, "failed to reload account pool from database");
        }
    }
}

pub async fn metrics_endpoint(State(state): State<AppState>) -> impl IntoResponse {
    let pool = state.pool.read();
    let hm = pool.health_manager();
    sdkwork_lr_observability::metrics::ACTIVE_ACCOUNTS.set(hm.healthy_count() as i64);
    sdkwork_lr_observability::metrics::DEGRADED_ACCOUNTS.set(hm.degraded_count() as i64);
    sdkwork_lr_observability::metrics::CIRCUIT_OPEN_ACCOUNTS.set(hm.circuit_open_count() as i64);
    drop(pool);

    let body = sdkwork_lr_observability::metrics::gather_metrics();
    (
        axum::http::StatusCode::OK,
        [(axum::http::header::CONTENT_TYPE, "text/plain; version=0.0.4; charset=utf-8")],
        body,
    )
}
