use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::time::Instant;

use crate::Protocol;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum InvocationStatus {
    Pending,
    Forwarding,
    Completed,
    Error,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TokenUsage {
    pub prompt_tokens: Option<i64>,
    pub completion_tokens: Option<i64>,
    pub total_tokens: Option<i64>,
}

impl TokenUsage {
    pub fn zero() -> Self {
        Self { prompt_tokens: Some(0), completion_tokens: Some(0), total_tokens: Some(0) }
    }

    pub fn from_openai(usage: &serde_json::Value) -> Self {
        Self {
            prompt_tokens: usage.get("prompt_tokens").and_then(|v| v.as_i64()),
            completion_tokens: usage.get("completion_tokens").and_then(|v| v.as_i64()),
            total_tokens: usage.get("total_tokens").and_then(|v| v.as_i64()),
        }
    }

    pub fn from_claude(usage: &serde_json::Value) -> Self {
        let input = usage.get("input_tokens").and_then(|v| v.as_i64()).unwrap_or(0);
        let output = usage.get("output_tokens").and_then(|v| v.as_i64()).unwrap_or(0);
        Self {
            prompt_tokens: Some(input),
            completion_tokens: Some(output),
            total_tokens: Some(input + output),
        }
    }

    pub fn from_gemini(usage: &serde_json::Value) -> Self {
        Self {
            prompt_tokens: usage.get("promptTokenCount").and_then(|v| v.as_i64()),
            completion_tokens: usage.get("candidatesTokenCount").and_then(|v| v.as_i64()),
            total_tokens: usage.get("totalTokenCount").and_then(|v| v.as_i64()),
        }
    }
}

pub struct Invocation {
    pub id: String,
    pub protocol: Protocol,
    pub method: String,
    pub path: String,
    pub query: Option<String>,
    pub model: Option<String>,
    pub account_name: Option<String>,
    pub status: InvocationStatus,
    pub status_code: Option<u16>,
    pub error: Option<String>,
    pub metadata: HashMap<String, String>,
    pub token_usage: Option<TokenUsage>,
    pub request_body: Option<String>,
    pub response_body: Option<String>,
    start_time: Instant,
    end_time: Option<Instant>,
}

impl Invocation {
    pub fn new(id: String, protocol: Protocol, method: String, path: String) -> Self {
        Self {
            id,
            protocol,
            method,
            path,
            query: None,
            model: None,
            account_name: None,
            status: InvocationStatus::Pending,
            status_code: None,
            error: None,
            metadata: HashMap::new(),
            token_usage: None,
            request_body: None,
            response_body: None,
            start_time: Instant::now(),
            end_time: None,
        }
    }

    pub fn with_model(mut self, model: &str) -> Self {
        self.model = Some(model.to_owned());
        self
    }

    pub fn with_account(mut self, name: &str) -> Self {
        self.account_name = Some(name.to_owned());
        self
    }

    pub fn with_query(mut self, query: &str) -> Self {
        self.query = Some(query.to_owned());
        self
    }

    pub fn set_forwarding(&mut self) {
        self.status = InvocationStatus::Forwarding;
    }

    pub fn set_response(&mut self, status_code: u16, body: Option<&str>) {
        self.status = InvocationStatus::Completed;
        self.status_code = Some(status_code);
        self.response_body = body.map(String::from);
        self.end_time = Some(Instant::now());
    }

    pub fn set_error(&mut self, error: &str) {
        self.status = InvocationStatus::Error;
        self.error = Some(error.to_owned());
        self.end_time = Some(Instant::now());
    }

    pub fn set_request_body(&mut self, body: &str) {
        self.request_body = Some(body.to_owned());
    }

    pub fn set_token_usage(&mut self, usage: TokenUsage) {
        self.token_usage = Some(usage);
    }

    pub fn extract_usage_from_response(&mut self, body: &serde_json::Value, protocol: Protocol) {
        let usage = match protocol {
            Protocol::Openai => body.get("usage").map(|u| TokenUsage::from_openai(u)),
            Protocol::Anthropic => body.get("usage").map(|u| TokenUsage::from_claude(u)),
            Protocol::Google => body.get("usageMetadata").map(|u| TokenUsage::from_gemini(u)),
        };
        if let Some(u) = usage {
            self.token_usage = Some(u);
        }
    }

    pub fn latency_ms(&self) -> i64 {
        let end = self.end_time.unwrap_or_else(|| Instant::now());
        end.duration_since(self.start_time).as_millis() as i64
    }
}
