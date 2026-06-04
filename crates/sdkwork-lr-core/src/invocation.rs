use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fmt;
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

impl fmt::Display for InvocationStatus {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Pending => f.write_str("pending"),
            Self::Forwarding => f.write_str("forwarding"),
            Self::Completed => f.write_str("completed"),
            Self::Error => f.write_str("error"),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TokenUsage {
    pub prompt_tokens: Option<i64>,
    pub completion_tokens: Option<i64>,
    pub total_tokens: Option<i64>,
}

impl TokenUsage {
    pub fn zero() -> Self {
        Self {
            prompt_tokens: Some(0),
            completion_tokens: Some(0),
            total_tokens: Some(0),
        }
    }

    pub fn from_openai(usage: &serde_json::Value) -> Self {
        let prompt_tokens = usage
            .get("prompt_tokens")
            .or_else(|| usage.get("input_tokens"))
            .and_then(|v| v.as_i64());
        let completion_tokens = usage
            .get("completion_tokens")
            .or_else(|| usage.get("output_tokens"))
            .and_then(|v| v.as_i64());
        let total_tokens = usage
            .get("total_tokens")
            .and_then(|v| v.as_i64())
            .or_else(|| Some(prompt_tokens? + completion_tokens?));
        Self {
            prompt_tokens,
            completion_tokens,
            total_tokens,
        }
    }

    pub fn from_claude(usage: &serde_json::Value) -> Self {
        let input = usage
            .get("input_tokens")
            .and_then(|v| v.as_i64())
            .unwrap_or(0);
        let output = usage
            .get("output_tokens")
            .and_then(|v| v.as_i64())
            .unwrap_or(0);
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

#[derive(Debug, Clone, Default)]
pub struct StreamUsageAccumulator {
    prompt_tokens: Option<i64>,
    completion_tokens: Option<i64>,
    total_tokens: Option<i64>,
}

impl StreamUsageAccumulator {
    pub fn observe_event_data(&mut self, protocol: Protocol, data: &serde_json::Value) {
        match protocol {
            Protocol::Openai => self.observe_openai(data),
            Protocol::Anthropic => self.observe_anthropic(data),
            Protocol::Google => self.observe_gemini(data),
        }
    }

    pub fn token_usage(&self) -> Option<TokenUsage> {
        if self.prompt_tokens.is_none()
            && self.completion_tokens.is_none()
            && self.total_tokens.is_none()
        {
            return None;
        }
        Some(TokenUsage {
            prompt_tokens: self.prompt_tokens,
            completion_tokens: self.completion_tokens,
            total_tokens: self.total_tokens.or_else(|| {
                Some(self.prompt_tokens.unwrap_or(0) + self.completion_tokens.unwrap_or(0))
            }),
        })
    }

    fn observe_openai(&mut self, data: &serde_json::Value) {
        let usage = data.get("usage").or_else(|| {
            data.get("response")
                .and_then(|response| response.get("usage"))
        });
        if let Some(usage) = usage {
            self.merge_usage(TokenUsage::from_openai(usage));
        }
    }

    fn observe_anthropic(&mut self, data: &serde_json::Value) {
        if let Some(usage) = data
            .get("message")
            .and_then(|message| message.get("usage"))
            .or_else(|| data.get("usage"))
        {
            let input = usage.get("input_tokens").and_then(|v| v.as_i64());
            let output = usage.get("output_tokens").and_then(|v| v.as_i64());
            if let Some(tokens) = input {
                self.prompt_tokens = Some(tokens);
            }
            if let Some(tokens) = output {
                self.completion_tokens = Some(tokens);
            }
            self.total_tokens =
                Some(self.prompt_tokens.unwrap_or(0) + self.completion_tokens.unwrap_or(0));
        }
    }

    fn observe_gemini(&mut self, data: &serde_json::Value) {
        if let Some(usage) = data.get("usageMetadata") {
            self.merge_usage(TokenUsage::from_gemini(usage));
        }
    }

    fn merge_usage(&mut self, usage: TokenUsage) {
        if usage.prompt_tokens.is_some() {
            self.prompt_tokens = usage.prompt_tokens;
        }
        if usage.completion_tokens.is_some() {
            self.completion_tokens = usage.completion_tokens;
        }
        if usage.total_tokens.is_some() {
            self.total_tokens = usage.total_tokens;
        } else if self.prompt_tokens.is_some() || self.completion_tokens.is_some() {
            self.total_tokens =
                Some(self.prompt_tokens.unwrap_or(0) + self.completion_tokens.unwrap_or(0));
        }
    }
}

#[derive(Clone)]
pub struct Invocation {
    pub id: String,
    pub user_id: i64,
    pub api_group: String,
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
    pub upstream_protocol: Option<String>,
    pub upstream_path: Option<String>,
    pub client_api: Option<String>,
    pub request_surface: Option<String>,
    pub target_surface: Option<String>,
    pub plugin_policy: Option<String>,
    pub plugin_id: Option<String>,
    pub model_vendor: Option<String>,
    pub streaming: bool,
    pub attempt_count: i32,
    start_time: Instant,
    end_time: Option<Instant>,
}

impl Invocation {
    pub fn new(id: String, protocol: Protocol, method: String, path: String) -> Self {
        Self {
            id,
            user_id: 0,
            api_group: "local-router-open-api".to_owned(),
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
            upstream_protocol: None,
            upstream_path: None,
            client_api: None,
            request_surface: None,
            target_surface: None,
            plugin_policy: None,
            plugin_id: None,
            model_vendor: None,
            streaming: false,
            attempt_count: 1,
            start_time: Instant::now(),
            end_time: None,
        }
    }

    pub fn with_model(mut self, model: &str) -> Self {
        self.model = Some(model.to_owned());
        self
    }

    pub fn with_user_id(mut self, user_id: i64) -> Self {
        self.user_id = user_id.max(0);
        self
    }

    pub fn with_api_group(mut self, api_group: impl Into<String>) -> Self {
        self.api_group = api_group.into();
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

    pub fn set_routing_metadata(
        &mut self,
        upstream_protocol: impl Into<String>,
        upstream_path: impl Into<String>,
        client_api: impl Into<String>,
        request_surface: impl Into<String>,
        target_surface: impl Into<String>,
        plugin_policy: impl Into<String>,
        plugin_id: Option<String>,
        model_vendor: Option<String>,
        streaming: bool,
        attempt_count: i32,
    ) {
        self.upstream_protocol = Some(upstream_protocol.into());
        self.upstream_path = Some(upstream_path.into());
        self.client_api = Some(client_api.into());
        self.request_surface = Some(request_surface.into());
        self.target_surface = Some(target_surface.into());
        self.plugin_policy = Some(plugin_policy.into());
        self.plugin_id = plugin_id;
        self.model_vendor = model_vendor;
        self.streaming = streaming;
        self.attempt_count = attempt_count.max(1);
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
            Protocol::Google => body
                .get("usageMetadata")
                .map(|u| TokenUsage::from_gemini(u)),
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

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn openai_usage_supports_chat_completions_token_fields() {
        let usage = TokenUsage::from_openai(&json!({
            "prompt_tokens": 11,
            "completion_tokens": 7,
            "total_tokens": 18
        }));

        assert_eq!(usage.prompt_tokens, Some(11));
        assert_eq!(usage.completion_tokens, Some(7));
        assert_eq!(usage.total_tokens, Some(18));
    }

    #[test]
    fn openai_usage_supports_responses_token_fields() {
        let usage = TokenUsage::from_openai(&json!({
            "input_tokens": 13,
            "output_tokens": 5,
            "total_tokens": 18,
            "input_tokens_details": {"cached_tokens": 2},
            "output_tokens_details": {"reasoning_tokens": 1}
        }));

        assert_eq!(usage.prompt_tokens, Some(13));
        assert_eq!(usage.completion_tokens, Some(5));
        assert_eq!(usage.total_tokens, Some(18));
    }

    #[test]
    fn openai_usage_derives_total_when_provider_omits_it() {
        let usage = TokenUsage::from_openai(&json!({
            "input_tokens": 9,
            "output_tokens": 4
        }));

        assert_eq!(usage.prompt_tokens, Some(9));
        assert_eq!(usage.completion_tokens, Some(4));
        assert_eq!(usage.total_tokens, Some(13));
    }

    #[test]
    fn invocation_extracts_openai_responses_usage() {
        let mut invocation = Invocation::new(
            "req_1".to_owned(),
            Protocol::Openai,
            "POST".to_owned(),
            "/v1/responses".to_owned(),
        );
        invocation.extract_usage_from_response(
            &json!({
                "id": "resp_1",
                "usage": {
                    "input_tokens": 21,
                    "output_tokens": 8,
                    "total_tokens": 29
                }
            }),
            Protocol::Openai,
        );

        let usage = invocation.token_usage.expect("usage should be extracted");
        assert_eq!(usage.prompt_tokens, Some(21));
        assert_eq!(usage.completion_tokens, Some(8));
        assert_eq!(usage.total_tokens, Some(29));
    }

    #[test]
    fn stream_usage_accumulator_reads_openai_chat_usage_chunk() {
        let mut accumulator = StreamUsageAccumulator::default();
        accumulator.observe_event_data(
            Protocol::Openai,
            &json!({
                "id": "chatcmpl_1",
                "object": "chat.completion.chunk",
                "choices": [],
                "usage": {
                    "prompt_tokens": 31,
                    "completion_tokens": 9,
                    "total_tokens": 40
                }
            }),
        );

        let usage = accumulator.token_usage().expect("stream usage");
        assert_eq!(usage.prompt_tokens, Some(31));
        assert_eq!(usage.completion_tokens, Some(9));
        assert_eq!(usage.total_tokens, Some(40));
    }

    #[test]
    fn stream_usage_accumulator_reads_openai_responses_completed_usage() {
        let mut accumulator = StreamUsageAccumulator::default();
        accumulator.observe_event_data(
            Protocol::Openai,
            &json!({
                "type": "response.completed",
                "response": {
                    "id": "resp_1",
                    "usage": {
                        "input_tokens": 23,
                        "output_tokens": 11,
                        "total_tokens": 34
                    }
                }
            }),
        );

        let usage = accumulator.token_usage().expect("responses stream usage");
        assert_eq!(usage.prompt_tokens, Some(23));
        assert_eq!(usage.completion_tokens, Some(11));
        assert_eq!(usage.total_tokens, Some(34));
    }

    #[test]
    fn stream_usage_accumulator_combines_anthropic_message_start_and_delta() {
        let mut accumulator = StreamUsageAccumulator::default();
        accumulator.observe_event_data(
            Protocol::Anthropic,
            &json!({
                "type": "message_start",
                "message": {
                    "usage": {
                        "input_tokens": 17,
                        "output_tokens": 0
                    }
                }
            }),
        );
        accumulator.observe_event_data(
            Protocol::Anthropic,
            &json!({
                "type": "message_delta",
                "usage": {
                    "output_tokens": 6
                }
            }),
        );

        let usage = accumulator.token_usage().expect("anthropic stream usage");
        assert_eq!(usage.prompt_tokens, Some(17));
        assert_eq!(usage.completion_tokens, Some(6));
        assert_eq!(usage.total_tokens, Some(23));
    }

    #[test]
    fn stream_usage_accumulator_reads_gemini_usage_metadata() {
        let mut accumulator = StreamUsageAccumulator::default();
        accumulator.observe_event_data(
            Protocol::Google,
            &json!({
                "candidates": [{
                    "content": {"role": "model", "parts": [{"text": "ok"}]},
                    "finishReason": "STOP"
                }],
                "usageMetadata": {
                    "promptTokenCount": 12,
                    "candidatesTokenCount": 3,
                    "totalTokenCount": 15
                }
            }),
        );

        let usage = accumulator.token_usage().expect("gemini stream usage");
        assert_eq!(usage.prompt_tokens, Some(12));
        assert_eq!(usage.completion_tokens, Some(3));
        assert_eq!(usage.total_tokens, Some(15));
    }
}
