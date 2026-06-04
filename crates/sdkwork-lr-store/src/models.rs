use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct AccountRow {
    pub id: i64,
    pub user_id: i64,
    pub name: String,
    pub provider: String,
    pub base_url: String,
    pub upstream_api_key: String,
    pub upstream_auth_scheme: Option<String>,
    pub models: String,
    pub priority: i32,
    pub timeout_secs: i64,
    pub max_retries: i32,
    pub retry_delay_ms: i64,
    pub anthropic_version: Option<String>,
    pub default_headers: Option<String>,
    pub model_route_mappings: Option<String>,
    pub enabled: bool,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewAccount {
    pub user_id: i64,
    pub name: String,
    pub provider: String,
    pub base_url: String,
    pub upstream_api_key: String,
    pub upstream_auth_scheme: Option<String>,
    pub models: Vec<String>,
    pub priority: i32,
    pub timeout_secs: i64,
    pub max_retries: i32,
    pub retry_delay_ms: i64,
    pub anthropic_version: Option<String>,
    pub default_headers: std::collections::BTreeMap<String, String>,
    pub model_route_mappings: std::collections::BTreeMap<String, String>,
    pub enabled: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct ModelRouteMappingRow {
    pub id: i64,
    pub user_id: i64,
    pub account_id: i64,
    pub account_name: String,
    pub client_model: String,
    pub upstream_model: String,
    pub enabled: bool,
    pub notes: Option<String>,
    pub version: i64,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewModelRouteMapping {
    pub user_id: i64,
    pub account_id: i64,
    pub account_name: String,
    pub client_model: String,
    pub upstream_model: String,
    pub enabled: bool,
    pub notes: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct ClientApiKeyRow {
    pub id: i64,
    pub user_id: i64,
    pub name: String,
    pub key_hash: String,
    pub key_prefix: Option<String>,
    pub enabled: bool,
    pub last_used_at: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewClientApiKey {
    pub user_id: i64,
    pub name: String,
    pub key_hash: String,
    pub key_prefix: Option<String>,
    pub enabled: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct InvocationRow {
    pub id: i64,
    pub user_id: i64,
    pub request_id: String,
    pub account_name: Option<String>,
    pub protocol: String,
    pub method: String,
    pub path: String,
    pub query: Option<String>,
    pub model: Option<String>,
    pub status: String,
    pub status_code: Option<i32>,
    pub latency_ms: Option<i64>,
    pub error_message: Option<String>,
    pub request_body: Option<String>,
    pub response_body: Option<String>,
    pub request_body_size: Option<i64>,
    pub response_body_size: Option<i64>,
    pub upstream_protocol: Option<String>,
    pub upstream_path: Option<String>,
    pub client_api: Option<String>,
    pub request_surface: Option<String>,
    pub target_surface: Option<String>,
    pub plugin_policy: Option<String>,
    pub plugin_id: Option<String>,
    pub model_vendor: Option<String>,
    pub metadata: Option<String>,
    pub streaming: bool,
    pub attempt_count: i32,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewInvocation {
    pub user_id: i64,
    pub request_id: String,
    pub account_name: Option<String>,
    pub protocol: String,
    pub method: String,
    pub path: String,
    pub query: Option<String>,
    pub model: Option<String>,
    pub status: String,
    pub status_code: Option<i32>,
    pub latency_ms: Option<i64>,
    pub error_message: Option<String>,
    pub request_body: Option<String>,
    pub response_body: Option<String>,
    pub request_body_size: Option<i64>,
    pub response_body_size: Option<i64>,
    pub upstream_protocol: Option<String>,
    pub upstream_path: Option<String>,
    pub client_api: Option<String>,
    pub request_surface: Option<String>,
    pub target_surface: Option<String>,
    pub plugin_policy: Option<String>,
    pub plugin_id: Option<String>,
    pub model_vendor: Option<String>,
    pub metadata: Option<String>,
    pub streaming: bool,
    pub attempt_count: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct UsageRow {
    pub id: i64,
    pub user_id: i64,
    pub request_id: String,
    pub model: Option<String>,
    pub prompt_tokens: Option<i64>,
    pub completion_tokens: Option<i64>,
    pub total_tokens: Option<i64>,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NewUsage {
    pub user_id: i64,
    pub request_id: String,
    pub model: Option<String>,
    pub prompt_tokens: Option<i64>,
    pub completion_tokens: Option<i64>,
    pub total_tokens: Option<i64>,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct UsageByModelRow {
    pub user_id: i64,
    pub model: Option<String>,
    pub request_count: i64,
    pub prompt_tokens: i64,
    pub completion_tokens: i64,
    pub total_tokens: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UsageTotals {
    pub prompt_tokens: i64,
    pub completion_tokens: i64,
    pub total_tokens: i64,
}
