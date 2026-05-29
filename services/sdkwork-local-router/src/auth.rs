use axum::extract::{Request, State};
use axum::http::StatusCode;
use axum::middleware::Next;
use axum::response::{IntoResponse, Response};
use serde_json::json;

use crate::router::AppState;
use sdkwork_lr_config::AuthMode;

pub async fn auth_middleware(
    State(state): State<AppState>,
    req: Request,
    next: Next,
) -> Response {
    match state.config.auth.mode {
        AuthMode::None => next.run(req).await,
        AuthMode::StaticKey => {
            if state.config.auth.api_keys.is_empty() {
                tracing::warn!("static-key auth mode configured but no api_keys provided, denying all requests");
                return (StatusCode::UNAUTHORIZED, axum::Json(json!({
                    "error": {"message": "server misconfiguration: no api keys configured", "type": "auth_error"}
                }))).into_response();
            }

            if validate_static_key(&req, &state.config.auth.api_keys) {
                next.run(req).await
            } else {
                (StatusCode::UNAUTHORIZED, axum::Json(json!({
                    "error": {"message": "invalid api key", "type": "auth_error"}
                }))).into_response()
            }
        }
    }
}

pub async fn admin_auth_middleware(
    State(state): State<AppState>,
    req: Request,
    next: Next,
) -> Response {
    match state.config.auth.mode {
        AuthMode::None => {
            tracing::warn!("admin API access allowed without authentication (auth.mode = none) - not recommended for production");
            next.run(req).await
        }
        AuthMode::StaticKey => {
            if state.config.auth.api_keys.is_empty() {
                return (StatusCode::FORBIDDEN, axum::Json(json!({
                    "error": {"message": "admin access requires authentication", "type": "auth_error"}
                }))).into_response();
            }

            if validate_static_key(&req, &state.config.auth.api_keys) {
                next.run(req).await
            } else {
                (StatusCode::FORBIDDEN, axum::Json(json!({
                    "error": {"message": "admin access denied", "type": "auth_error"}
                }))).into_response()
            }
        }
    }
}

fn validate_static_key(req: &Request, valid_keys: &[String]) -> bool {
    let auth_header = req
        .headers()
        .get(axum::http::header::AUTHORIZATION)
        .and_then(|v| v.to_str().ok());

    if let Some(header) = auth_header {
        if let Some(token) = header.strip_prefix("Bearer ") {
            return valid_keys.iter().any(|k| constant_time_eq(k.as_bytes(), token.as_bytes()));
        }
        return valid_keys.iter().any(|k| constant_time_eq(k.as_bytes(), header.as_bytes()));
    }

    let api_key_header = req
        .headers()
        .get("x-api-key")
        .and_then(|v| v.to_str().ok());

    if let Some(key) = api_key_header {
        return valid_keys.iter().any(|k| constant_time_eq(k.as_bytes(), key.as_bytes()));
    }

    false
}

fn constant_time_eq(a: &[u8], b: &[u8]) -> bool {
    let max_len = a.len().max(b.len());
    let mut result: u8 = 0;
    result |= (a.len() != b.len()) as u8;
    for i in 0..max_len {
        result |= a.get(i).unwrap_or(&0) ^ b.get(i).unwrap_or(&0);
    }
    result == 0
}
