﻿﻿﻿﻿﻿﻿use std::sync::{Arc, LazyLock};

use axum::extract::{Request, State};
use axum::http::StatusCode;
use axum::http::header;
use axum::response::{IntoResponse, Response};
use axum::routing::any;
use axum::{Json, Router};
use bytes::Bytes;
use serde_json::json;

use crate::router::AppState;
use crate::streaming;
use sdkwork_lr_core::{Account, Invocation, Protocol, ProviderKind};
use sdkwork_lr_proxy::{AuthInjection, ForwardTarget};
use sdkwork_lr_store::{NewInvocation as StoreInvocation, NewUsage};

static GEMINI_MODEL_REGEX: LazyLock<regex::Regex> = LazyLock::new(|| {
    regex::Regex::new(r"/models/([^:]+)").unwrap()
});

pub fn routes(openai_prefix: &str, anthropic_prefix: &str, google_prefix: &str) -> Router<AppState> {
    Router::new()
        .route(&format!("{openai_prefix}/{{*path}}"), any(handle_openai))
        .route(&format!("{anthropic_prefix}/{{*path}}"), any(handle_anthropic))
        .route(&format!("{google_prefix}/{{*path}}"), any(handle_google))
}

async fn handle_openai(State(state): State<AppState>, req: Request) -> Response {
    handle_provider_passthrough(state, req, Protocol::Openai).await
}

async fn handle_anthropic(State(state): State<AppState>, req: Request) -> Response {
    handle_provider_passthrough(state, req, Protocol::Anthropic).await
}

async fn handle_google(State(state): State<AppState>, req: Request) -> Response {
    handle_provider_passthrough(state, req, Protocol::Google).await
}

async fn handle_provider_passthrough(
    state: AppState,
    req: Request,
    client_protocol: Protocol,
) -> Response {
    let request_id = uuid::Uuid::new_v4().to_string();
    let path = req.uri().path().to_owned();
    let query = req.uri().query().map(|q| q.to_owned());
    let method = req.method().clone();
    let headers = req.headers().clone();

    let mut invocation = Invocation::new(
        request_id.clone(),
        client_protocol,
        method.to_string(),
        path.clone(),
    );

    let body_limit = state.config.server.max_body_size_bytes();
    let body = match axum::body::to_bytes(req.into_body(), body_limit).await {
        Ok(b) => b,
        Err(e) => {
            return protocol_error(client_protocol, StatusCode::BAD_REQUEST, &format!("failed to read body: {e}"), &request_id);
        }
    };

    let model = extract_model(&body, &path, client_protocol);
    sdkwork_lr_observability::metrics::REQUESTS_TOTAL.inc();
    if let Some(ref m) = model {
        invocation = invocation.with_model(m);
    }

    if let Some(ref q) = query {
        invocation = invocation.with_query(q);
    }

    if state.config.recording.save_request_body {
        invocation.set_request_body(&String::from_utf8_lossy(&body));
    }

    let _ = state.interceptor_chain.before_request(&mut invocation);

    let is_streaming = detect_streaming(&body, client_protocol, &headers, query.as_deref());

    let client_base_path = match client_protocol {
        Protocol::Openai => state.config.base_paths.openai.as_str(),
        Protocol::Anthropic => state.config.base_paths.anthropic.as_str(),
        Protocol::Google => state.config.base_paths.google.as_str(),
    };

    let candidates: Vec<Arc<Account>> = match model.as_deref() {
        Some(m) => state.pool.read().select_all(m),
        None => state.pool.read().enabled_accounts_arc(),
    };

    if candidates.is_empty() {
        invocation.set_error("no upstream account available");
        let _ = state.interceptor_chain.notify_error(&invocation, "no upstream account available");
        persist_invocation(&state, &invocation).await;
        return protocol_error(client_protocol, StatusCode::SERVICE_UNAVAILABLE, "no upstream account available", &request_id);
    }

    let max_attempts = if state.config.fallback.enabled {
        state.config.fallback.max_attempts.min(5) as usize
    } else {
        1
    };

    let mut last_error = String::new();

    for (attempt, account) in candidates.iter().enumerate() {
        if attempt >= max_attempts {
            break;
        }

        if attempt > 0 {
            let backoff_ms = 100u64 * (1 << (attempt - 1)).min(4);
            tokio::time::sleep(std::time::Duration::from_millis(backoff_ms)).await;
        }

        invocation = invocation.with_account(&account.name);
        invocation.set_forwarding();

        let upstream_protocol = account.provider.to_protocol();
        let needs_transform = client_protocol != upstream_protocol;

        let upstream_path = sdkwork_lr_transform::streaming::map_upstream_path(
            &path, client_base_path, upstream_protocol, model.as_deref(), is_streaming,
        );

        let upstream_path_and_query = match &query {
            Some(q) => format!("{}?{}", upstream_path, q),
            None => upstream_path,
        };

        let account_max_retries = account.max_retries.min(3) as usize;
        let account_retry_delay = account.retry_delay_ms.max(100);

        let mut account_attempt = 0;
        let total_account_attempts = 1 + account_max_retries;

        loop {
            let forward_body = build_forward_body(&body, client_protocol, upstream_protocol, account);

            let auth = build_auth_for_provider(account);
            let target = ForwardTarget {
                base_url: account.base_url.clone(),
                auth,
                default_headers: account.default_headers.iter().map(|(k, v)| (k.clone(), v.clone())).collect(),
                anthropic_version: account.anthropic_version.clone(),
                timeout: Some(account.timeout),
                request_id: request_id.clone(),
            };

            tracing::info!(attempt = attempt + 1, account = %account.name, upstream_protocol = %upstream_protocol, request_id = %request_id, retry = account_attempt, "forwarding request");

            let result = sdkwork_lr_proxy::forward_raw(
                &state.client, method.clone(), &headers, forward_body, &target, &upstream_path_and_query,
            ).await;

            match result {
                Ok(hyper_response) => {
                    let status = hyper_response.status();

                    if should_fallback(status) {
                        if account_attempt + 1 < total_account_attempts && is_retryable_status(status) {
                            account_attempt += 1;
                            let delay = account_retry_delay * (1 << account_attempt.min(3));
                            tracing::warn!(status = %status, account = %account.name, request_id = %request_id, retry = account_attempt, delay_ms = delay, "retryable error, retrying same account");
                            tokio::time::sleep(std::time::Duration::from_millis(delay)).await;
                            continue;
                        }

                        {
                            let pool = state.pool.read();
                            pool.health_manager().record_failure(&account.name);
                        }

                        if attempt + 1 < max_attempts {
                            last_error = format!("upstream {} returned {}", account.name, status);
                            tracing::warn!(status = %status, account = %account.name, request_id = %request_id, "upstream error, trying fallback");
                            break;
                        }
                    }

                    {
                        let pool = state.pool.read();
                        pool.record_latency(&account.name, invocation.latency_ms() as u64);

                        if status.is_success() {
                            pool.health_manager().record_success(&account.name);
                            sdkwork_lr_observability::metrics::REQUESTS_SUCCESS.inc();
                        } else if should_fallback(status) {
                            pool.health_manager().record_failure(&account.name);
                            sdkwork_lr_observability::metrics::REQUESTS_FAILURE.inc();
                            sdkwork_lr_observability::metrics::FALLBACK_TOTAL.inc();
                        }
                    }

                    sdkwork_lr_observability::metrics::REQUEST_DURATION
                        .with_label_values(&[account.provider.to_string().as_str(), model.as_deref().unwrap_or("unknown")])
                        .observe(invocation.latency_ms() as f64 / 1000.0);

                    let response = handle_upstream_response(
                        hyper_response, client_protocol, upstream_protocol, needs_transform, is_streaming, model.as_deref(), &request_id, &state, &mut invocation,
                    ).await;

                    return response;
                }
                Err(e) => {
                    if account_attempt + 1 < total_account_attempts {
                        account_attempt += 1;
                        let delay = account_retry_delay * (1 << account_attempt.min(3));
                        tracing::warn!(error = %e, account = %account.name, request_id = %request_id, retry = account_attempt, delay_ms = delay, "connection error, retrying same account");
                        tokio::time::sleep(std::time::Duration::from_millis(delay)).await;
                        continue;
                    }
                    last_error = e.clone();
                    {
                        let pool = state.pool.read();
                        pool.health_manager().record_failure(&account.name);
                    }
                    sdkwork_lr_observability::metrics::REQUESTS_FAILURE.inc();
                    tracing::warn!(error = %e, account = %account.name, request_id = %request_id, "forward failed, trying fallback");
                    break;
                }
            }
        }
    }

    invocation.set_error(&last_error);
    let _ = state.interceptor_chain.notify_error(&invocation, &last_error);
    persist_invocation(&state, &invocation).await;

    protocol_error(client_protocol, StatusCode::BAD_GATEWAY, &last_error, &request_id)
}

async fn handle_upstream_response(
    hyper_response: hyper::Response<hyper::body::Incoming>,
    client_protocol: Protocol,
    upstream_protocol: Protocol,
    needs_transform: bool,
    is_streaming: bool,
    model: Option<&str>,
    request_id: &str,
    state: &AppState,
    invocation: &mut Invocation,
) -> Response {
    let status = hyper_response.status();
    let (parts, incoming_body) = hyper_response.into_parts();

    if status.is_client_error() {
        let resp_bytes = match read_body_bytes(incoming_body).await {
            Ok(b) => b,
            Err(e) => {
                return protocol_error(client_protocol, status, &e, request_id);
            }
        };

        let final_body = if needs_transform {
            match transform_response(&resp_bytes, upstream_protocol, client_protocol, model.unwrap_or("unknown")) {
                Ok(transformed) => serde_json_to_bytes(&transformed),
                Err(_) => resp_bytes,
            }
        } else {
            resp_bytes
        };

        invocation.set_response(status.as_u16(), None);
        let _ = state.interceptor_chain.after_response(invocation);
        persist_invocation(state, invocation).await;

        return build_response_from_parts(parts, final_body, request_id);
    }

    if is_streaming && needs_transform {
        let hyper_resp = hyper::Response::from_parts(parts, incoming_body);
        invocation.set_response(status.as_u16(), None);
        let _ = state.interceptor_chain.after_response(invocation);
        persist_invocation(state, invocation).await;

        return streaming::wrap_streaming_response(hyper_resp, upstream_protocol, client_protocol, model.unwrap_or("unknown").to_owned(), request_id);
    }

    if is_streaming {
        invocation.set_response(status.as_u16(), None);
        let _ = state.interceptor_chain.after_response(invocation);
        persist_invocation(state, invocation).await;

        let mut response = sdkwork_lr_proxy::upstream_to_axum_response(hyper::Response::from_parts(parts, incoming_body));
        add_request_id_header(&mut response, request_id);
        return response;
    }

    let resp_bytes = match read_body_bytes(incoming_body).await {
        Ok(b) => b,
        Err(e) => {
            return protocol_error(client_protocol, StatusCode::BAD_GATEWAY, &format!("failed to read response: {e}"), request_id);
        }
    };

    let final_body = if needs_transform {
        match transform_response(&resp_bytes, upstream_protocol, client_protocol, model.unwrap_or("unknown")) {
            Ok(transformed) => {
                if let Ok(parsed) = serde_json::from_slice::<serde_json::Value>(&transformed) {
                    invocation.extract_usage_from_response(&parsed, client_protocol);
                    if let Some(ref usage) = invocation.token_usage {
                        if let Some(tokens) = usage.prompt_tokens { sdkwork_lr_observability::metrics::TOKENS_INPUT_TOTAL.inc_by(tokens as u64); }
                        if let Some(tokens) = usage.completion_tokens { sdkwork_lr_observability::metrics::TOKENS_OUTPUT_TOTAL.inc_by(tokens as u64); }
                    }
                }
                serde_json_to_bytes(&transformed)
            }
            Err(e) => {
                tracing::warn!(error = %e, "response transform failed, returning original body");
                resp_bytes
            }
        }
    } else {
        if let Ok(parsed) = serde_json::from_slice::<serde_json::Value>(&resp_bytes) {
            invocation.extract_usage_from_response(&parsed, upstream_protocol);
            if let Some(ref usage) = invocation.token_usage {
                if let Some(tokens) = usage.prompt_tokens { sdkwork_lr_observability::metrics::TOKENS_INPUT_TOTAL.inc_by(tokens as u64); }
                if let Some(tokens) = usage.completion_tokens { sdkwork_lr_observability::metrics::TOKENS_OUTPUT_TOTAL.inc_by(tokens as u64); }
            }
        }
        resp_bytes
    };

    let response_body_str = if state.config.recording.save_response_body {
        Some(String::from_utf8_lossy(&final_body).to_string())
    } else {
        None
    };

    invocation.set_response(status.as_u16(), response_body_str.as_deref());
    let _ = state.interceptor_chain.after_response(invocation);
    persist_invocation(state, invocation).await;

    build_response_from_parts(parts, final_body, request_id)
}

async fn persist_invocation(state: &AppState, invocation: &Invocation) {
    let store = state.store.clone();
    let store_inv = StoreInvocation {
        request_id: invocation.id.clone(),
        account_name: invocation.account_name.clone(),
        protocol: invocation.protocol.to_string(),
        method: invocation.method.clone(),
        path: invocation.path.clone(),
        model: invocation.model.clone(),
        status_code: invocation.status_code.map(|s| s as i32),
        latency_ms: Some(invocation.latency_ms()),
        error_message: invocation.error.clone(),
        request_body: invocation.request_body.clone(),
        response_body: invocation.response_body.clone(),
    };

    let usage = invocation.token_usage.clone();
    let usage_model = invocation.model.clone();
    let usage_request_id = invocation.id.clone();

    tokio::spawn(async move {
        if let Err(e) = store.insert_invocation(&store_inv).await {
            tracing::error!(request_id = %store_inv.request_id, error = %e, "failed to persist invocation");
        }
        if let Some(u) = usage {
            let new_usage = NewUsage {
                request_id: usage_request_id,
                model: usage_model,
                prompt_tokens: u.prompt_tokens,
                completion_tokens: u.completion_tokens,
                total_tokens: u.total_tokens,
            };
            if let Err(e) = store.insert_usage(&new_usage).await {
                tracing::error!(request_id = %new_usage.request_id, error = %e, "failed to persist usage");
            }
        }
    });
}

fn build_forward_body(body: &[u8], client_protocol: Protocol, upstream_protocol: Protocol, account: &Account) -> Bytes {
    let needs_transform = client_protocol != upstream_protocol;
    if needs_transform {
        match transform_request(body, client_protocol, upstream_protocol) {
            Ok(mut transformed) => {
                apply_model_alias(&mut transformed, account);
                serde_json_to_bytes(&transformed)
            }
            Err(e) => {
                tracing::warn!(error = %e, "request transform failed, forwarding original body");
                Bytes::copy_from_slice(body)
            }
        }
    } else {
        match serde_json::from_slice::<serde_json::Value>(body) {
            Ok(mut parsed) => {
                apply_model_alias(&mut parsed, account);
                serde_json_to_bytes(&parsed)
            }
            Err(e) => {
                tracing::debug!(error = %e, "body is not valid JSON, forwarding as-is");
                Bytes::copy_from_slice(body)
            }
        }
    }
}

fn build_response_from_parts(parts: axum::http::response::Parts, body: Bytes, request_id: &str) -> Response {
    let mut response = Response::new(body);
    *response.status_mut() = parts.status;
    for (name, value) in parts.headers.iter() {
        if name != header::CONTENT_LENGTH && name != header::TRANSFER_ENCODING {
            response.headers_mut().append(name, value.clone());
        }
    }
    add_request_id_header(&mut response, request_id);
    response
}

fn add_request_id_header(response: &mut Response, request_id: &str) {
    if let Ok(val) = header::HeaderValue::from_str(request_id) {
        response.headers_mut().insert("x-request-id", val);
    }
}

fn serde_json_to_bytes(value: &serde_json::Value) -> Bytes {
    Bytes::from(serde_json::to_vec(value).unwrap_or_default())
}

fn protocol_error(protocol: Protocol, status: StatusCode, message: &str, request_id: &str) -> Response {
    let mut response = match protocol {
        Protocol::Anthropic => (
            status,
            Json(json!({"type": "error", "error": {"type": "api_error", "message": message}}))
        ).into_response(),
        Protocol::Google => (
            status,
            Json(json!({"error": {"code": status.as_u16(), "message": message, "status": "INTERNAL"}}))
        ).into_response(),
        _ => (
            status,
            Json(json!({"error": {"message": message, "type": "upstream_error", "code": status.as_u16()}}))
        ).into_response(),
    };
    add_request_id_header(&mut response, request_id);
    response
}

async fn read_body_bytes(body: hyper::body::Incoming) -> Result<Bytes, String> {
    use http_body_util::BodyExt;
    body.collect().await.map(|c| c.to_bytes()).map_err(|e| format!("failed to read response body: {e}"))
}

fn build_auth_for_provider(account: &Account) -> Option<AuthInjection> {
    if account.api_key.is_empty() { return None; }
    match account.provider {
        ProviderKind::Openai | ProviderKind::Custom(_) => Some(AuthInjection::Bearer(account.api_key.clone())),
        ProviderKind::Anthropic => Some(AuthInjection::Header("x-api-key".to_owned(), account.api_key.clone())),
        ProviderKind::Google => Some(AuthInjection::Header("x-goog-api-key".to_owned(), account.api_key.clone())),
    }
}

fn extract_model(body: &[u8], path: &str, protocol: Protocol) -> Option<String> {
    if let Ok(value) = serde_json::from_slice::<serde_json::Value>(body) {
        if let Some(model) = value.get("model").and_then(|v| v.as_str()) {
            return Some(model.to_owned());
        }
    }

    if protocol == Protocol::Google {
        if let Some(captures) = GEMINI_MODEL_REGEX.captures(path) {
            if let Some(m) = captures.get(1) {
                return Some(m.as_str().to_owned());
            }
        }
    }

    None
}

fn detect_streaming(body: &[u8], protocol: Protocol, headers: &HeaderMap, query: Option<&str>) -> bool {
    if let Some(accept) = headers.get(header::ACCEPT).and_then(|v| v.to_str().ok()) {
        if accept.contains("text/event-stream") {
            return true;
        }
    }
    let Ok(value) = serde_json::from_slice::<serde_json::Value>(body) else { return false };
    match protocol {
        Protocol::Openai => value.get("stream").and_then(|v| v.as_bool()).unwrap_or(false),
        Protocol::Anthropic => value.get("stream").and_then(|v| v.as_bool()).unwrap_or(false),
        Protocol::Google => {
            value.get("stream").and_then(|v| v.as_bool()).unwrap_or(false)
                || query.map_or(false, |q| q.contains("alt=sse"))
                || query.map_or(false, |q| q.contains("streamGenerateContent"))
        }
    }
}

fn transform_request(body: &[u8], source: Protocol, target: Protocol) -> Result<serde_json::Value, String> {
    let parsed: serde_json::Value = serde_json::from_slice(body).map_err(|e| format!("invalid JSON body: {e}"))?;
    sdkwork_lr_transform::transform_request_body(&parsed, source, target)
}

fn transform_response(body: &[u8], source: Protocol, target: Protocol, model: &str) -> Result<serde_json::Value, String> {
    let parsed: serde_json::Value = serde_json::from_slice(body).map_err(|e| format!("invalid JSON response: {e}"))?;
    sdkwork_lr_transform::transform_response_body(&parsed, source, target, model)
}

fn apply_model_alias(body: &mut serde_json::Value, account: &Account) {
    if account.model_aliases.is_empty() { return; }
    if let Some(model) = body.get("model").and_then(|v| v.as_str()) {
        if let Some(alias) = account.model_aliases.get(model) {
            body["model"] = serde_json::Value::String(alias.clone());
        }
    }
}

fn should_fallback(status: axum::http::StatusCode) -> bool {
    status.is_server_error()
        || status == StatusCode::TOO_MANY_REQUESTS
        || status == StatusCode::SERVICE_UNAVAILABLE
}

fn is_retryable_status(status: axum::http::StatusCode) -> bool {
    status.is_server_error()
        || status == StatusCode::TOO_MANY_REQUESTS
        || status == StatusCode::SERVICE_UNAVAILABLE
        || status == StatusCode::GATEWAY_TIMEOUT
}
