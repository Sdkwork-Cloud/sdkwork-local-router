use axum::http::header::{self, HeaderName, HeaderValue};
use axum::http::{HeaderMap, Method, Uri};
use axum::response::Response;
use bytes::Bytes;
use http_body_util::Full;
use hyper::Request as HyperRequest;
use hyper_rustls::HttpsConnector;
use hyper_util::client::legacy::connect::HttpConnector;
use hyper_util::client::legacy::Client;
use hyper_util::rt::TokioExecutor;
use std::collections::HashSet;
use std::time::Duration;

pub type ProxyBody = Full<Bytes>;
pub type ProxyConnector = HttpsConnector<HttpConnector>;
pub type ProxyClient = Client<ProxyConnector, ProxyBody>;

#[derive(Debug, Clone)]
pub enum AuthInjection {
    Bearer(String),
    Header(String, String),
    Query(String, String),
}

#[derive(Debug, Clone)]
pub struct ForwardTarget {
    pub base_url: String,
    pub auth: Option<AuthInjection>,
    pub default_headers: Vec<(String, String)>,
    pub anthropic_version: Option<String>,
    pub timeout: Option<Duration>,
    pub request_id: String,
}

pub fn build_proxy_client() -> ProxyClient {
    let mut http = HttpConnector::new();
    http.set_connect_timeout(Some(Duration::from_secs(10)));
    http.set_nodelay(true);
    let connector = hyper_rustls::HttpsConnectorBuilder::new()
        .with_webpki_roots()
        .https_only()
        .enable_http1()
        .build();
    Client::builder(TokioExecutor::new()).build(connector)
}

pub async fn forward_to_target(
    client: &ProxyClient,
    method: Method,
    original_headers: &HeaderMap,
    body: Bytes,
    target: &ForwardTarget,
    upstream_path_and_query: &str,
) -> Result<Response, String> {
    let upstream_response = forward_raw(
        client,
        method,
        original_headers,
        body,
        target,
        upstream_path_and_query,
    )
    .await?;
    Ok(upstream_to_axum_response(upstream_response))
}

pub async fn forward_raw(
    client: &ProxyClient,
    method: Method,
    original_headers: &HeaderMap,
    body: Bytes,
    target: &ForwardTarget,
    upstream_path_and_query: &str,
) -> Result<hyper::Response<hyper::body::Incoming>, String> {
    let upstream_uri = build_upstream_uri(target, upstream_path_and_query)?;
    let mut builder = HyperRequest::builder().method(method).uri(upstream_uri);

    let connection_header_names = connection_header_names(original_headers);
    let configured_header_names = configured_header_names(target);

    for (name, value) in original_headers.iter() {
        if should_forward_request_header(name, &connection_header_names, &configured_header_names) {
            builder = builder.header(name, value);
        }
    }

    for (name, value) in &target.default_headers {
        if let (Ok(header_name), Ok(header_value)) = (
            HeaderName::from_bytes(name.as_bytes()),
            HeaderValue::from_str(value),
        ) {
            builder = builder.header(header_name, header_value);
        }
    }

    if let Some(version) = &target.anthropic_version {
        if let Ok(val) = HeaderValue::from_str(version) {
            builder = builder.header("anthropic-version", val);
        }
    }

    if let Some(auth) = &target.auth {
        builder = apply_auth(builder, auth)?;
    }

    if let Ok(val) = HeaderValue::from_str(&target.request_id) {
        builder = builder.header("x-request-id", val);
    }

    let upstream_request = builder
        .body(Full::new(body))
        .map_err(|e| format!("failed to build upstream request: {e}"))?;

    let response_future = client.request(upstream_request);

    match target.timeout {
        Some(timeout) => tokio::time::timeout(timeout, response_future)
            .await
            .map_err(|_| format!("upstream request timed out after {}s", timeout.as_secs()))?
            .map_err(|e| format!("upstream request failed: {e}")),
        None => response_future
            .await
            .map_err(|e| format!("upstream request failed: {e}")),
    }
}

fn build_upstream_uri(target: &ForwardTarget, path_and_query: &str) -> Result<Uri, String> {
    let base = format!("{}{}", target.base_url, path_and_query);
    let uri_str = match &target.auth {
        Some(AuthInjection::Query(key, value)) => {
            let separator = if base.contains('?') { "&" } else { "?" };
            format!(
                "{}{}{}={}",
                base,
                separator,
                urlencoding::encode(key),
                urlencoding::encode(value)
            )
        }
        _ => base,
    };
    uri_str
        .parse::<Uri>()
        .map_err(|e| format!("invalid upstream URI: {e}"))
}

fn apply_auth(
    builder: axum::http::request::Builder,
    auth: &AuthInjection,
) -> Result<axum::http::request::Builder, String> {
    match auth {
        AuthInjection::Bearer(token) => {
            let value = HeaderValue::from_str(&format!("Bearer {token}"))
                .map_err(|e| format!("invalid bearer token: {e}"))?;
            Ok(builder.header(header::AUTHORIZATION, value))
        }
        AuthInjection::Header(name, value) => {
            let header_name = HeaderName::from_bytes(name.as_bytes())
                .map_err(|e| format!("invalid auth header name: {e}"))?;
            let header_value = HeaderValue::from_str(value)
                .map_err(|e| format!("invalid auth header value: {e}"))?;
            Ok(builder.header(header_name, header_value))
        }
        AuthInjection::Query(_, _) => Ok(builder),
    }
}

pub fn upstream_to_axum_response(
    upstream_response: hyper::Response<hyper::body::Incoming>,
) -> Response {
    let (parts, body) = upstream_response.into_parts();
    let mut response = Response::new(axum::body::Body::new(body));
    *response.status_mut() = parts.status;
    let connection_header_names = connection_header_names(&parts.headers);
    for (name, value) in parts.headers.iter() {
        if should_forward_response_header(name, &connection_header_names) {
            response.headers_mut().append(name, value.clone());
        }
    }
    response
}

fn should_forward_request_header(
    name: &HeaderName,
    connection_header_names: &HashSet<String>,
    configured_header_names: &HashSet<String>,
) -> bool {
    !is_hop_by_hop_header(name)
        && !connection_header_names.contains(name.as_str())
        && !configured_header_names.contains(&name.as_str().to_ascii_lowercase())
        && name != header::HOST
        && name != header::AUTHORIZATION
        && name != header::CONTENT_LENGTH
        && name.as_str() != "x-api-key"
        && name.as_str() != "x-goog-api-key"
}

fn should_forward_response_header(
    name: &HeaderName,
    connection_header_names: &HashSet<String>,
) -> bool {
    !is_hop_by_hop_header(name)
        && !connection_header_names.contains(name.as_str())
        && name != header::CONTENT_LENGTH
        && name != header::TRANSFER_ENCODING
}

fn is_hop_by_hop_header(name: &HeaderName) -> bool {
    matches!(
        name.as_str(),
        "connection"
            | "keep-alive"
            | "proxy-authenticate"
            | "proxy-authorization"
            | "te"
            | "trailer"
            | "transfer-encoding"
            | "upgrade"
    )
}

fn connection_header_names(headers: &HeaderMap) -> HashSet<String> {
    headers
        .get_all(header::CONNECTION)
        .iter()
        .filter_map(|value| value.to_str().ok())
        .flat_map(|value| value.split(','))
        .map(|value| value.trim().to_ascii_lowercase())
        .filter(|value| !value.is_empty())
        .collect()
}

fn configured_header_names(target: &ForwardTarget) -> HashSet<String> {
    let mut names: HashSet<String> = target
        .default_headers
        .iter()
        .map(|(name, _)| name.to_ascii_lowercase())
        .collect();
    if let Some(AuthInjection::Header(name, _)) = &target.auth {
        names.insert(name.to_ascii_lowercase());
    }
    names
}
