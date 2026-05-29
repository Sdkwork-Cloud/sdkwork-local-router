use serde_json::{json, Value};
use sdkwork_lr_core::Protocol;

#[derive(Debug, Clone, Default)]
pub struct SseEvent {
    pub event: Option<String>,
    pub data: String,
    pub id: Option<String>,
}

impl SseEvent {
    pub fn new(data: impl Into<String>) -> Self {
        Self {
            data: data.into(),
            ..Default::default()
        }
    }

    pub fn with_event(mut self, event: impl Into<String>) -> Self {
        self.event = Some(event.into());
        self
    }

    pub fn with_id(mut self, id: impl Into<String>) -> Self {
        self.id = Some(id.into());
        self
    }

    pub fn parse_from_buffer(buffer: &mut String) -> Option<SseEvent> {
        let pos = if let Some(p) = buffer.find("\n\n") {
            p
        } else if let Some(p) = buffer.find("\r\n\r\n") {
            p
        } else {
            return None;
        };
        let sep_len = if buffer.as_bytes().get(pos + 1) == Some(&b'\r') { 4 } else { 2 };
        let event_text = buffer[..pos].to_owned();
        buffer.drain(..pos + sep_len);

        let mut evt = SseEvent::default();
        for line in event_text.lines() {
            let line = line.trim_end_matches('\r');
            if let Some(data) = line.strip_prefix("data: ") {
                if evt.data.is_empty() {
                    evt.data = data.to_owned();
                } else {
                    evt.data.push('\n');
                    evt.data.push_str(data);
                }
            } else if let Some(data) = line.strip_prefix("data:") {
                if evt.data.is_empty() {
                    evt.data = data.trim_start().to_owned();
                } else {
                    evt.data.push('\n');
                    evt.data.push_str(data.trim_start());
                }
            } else if let Some(e) = line.strip_prefix("event: ") {
                evt.event = Some(e.to_owned());
            } else if let Some(e) = line.strip_prefix("event:") {
                evt.event = Some(e.trim_start().to_owned());
            } else if let Some(id) = line.strip_prefix("id: ") {
                evt.id = Some(id.to_owned());
            } else if let Some(id) = line.strip_prefix("id:") {
                evt.id = Some(id.trim_start().to_owned());
            }
        }

        Some(evt)
    }

    pub fn serialize(&self) -> String {
        let mut result = String::new();
        if let Some(event) = &self.event {
            result.push_str(&format!("event: {}\n", event));
        }
        if let Some(id) = &self.id {
            result.push_str(&format!("id: {}\n", id));
        }
        for line in self.data.lines() {
            result.push_str(&format!("data: {}\n", line));
        }
        result.push('\n');
        result
    }
}

pub struct StreamTransformState {
    source: Protocol,
    target: Protocol,
    model: String,
    message_id: String,
    sent_start: bool,
    sent_content_start: bool,
    content_block_index: u32,
    sent_done: bool,
}

impl StreamTransformState {
    pub fn new(source: Protocol, target: Protocol, model: &str) -> Self {
        Self {
            source,
            target,
            model: model.to_owned(),
            message_id: format!("chatcmpl-{}", uuid::Uuid::new_v4()),
            sent_start: false,
            sent_content_start: false,
            content_block_index: 0,
            sent_done: false,
        }
    }

    pub fn transform(&mut self, event: SseEvent) -> Vec<SseEvent> {
        if self.sent_done {
            return vec![];
        }
        match (self.source, self.target) {
            (Protocol::Openai, Protocol::Anthropic) => self.openai_to_claude(event),
            (Protocol::Anthropic, Protocol::Openai) => self.claude_to_openai(event),
            (Protocol::Openai, Protocol::Google) => self.openai_to_gemini_stream(event),
            (Protocol::Google, Protocol::Openai) => self.gemini_to_openai_stream(event),
            _ => vec![event],
        }
    }

    pub fn flush(&mut self) -> Vec<SseEvent> {
        if self.sent_done {
            return vec![];
        }
        self.sent_done = true;
        match (self.source, self.target) {
            (Protocol::Openai, Protocol::Anthropic) => self.flush_openai_to_claude(),
            (Protocol::Anthropic, Protocol::Openai) => self.flush_claude_to_openai(),
            (Protocol::Openai, Protocol::Google) => self.flush_openai_to_gemini(),
            (Protocol::Google, Protocol::Openai) => self.flush_gemini_to_openai(),
            _ => vec![],
        }
    }
}

impl StreamTransformState {
    fn openai_to_claude(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let data = event.data.trim();
        if data == "[DONE]" {
            return self.flush_openai_to_claude();
        }

        let Ok(chunk) = serde_json::from_str::<Value>(data) else {
            return vec![];
        };

        let mut events = Vec::new();

        if !self.sent_start {
            self.sent_start = true;
            events.push(SseEvent::new(serde_json::to_string(&json!({
                "type": "message_start",
                "message": {
                    "id": format!("msg_{}", uuid::Uuid::new_v4()),
                    "type": "message",
                    "role": "assistant",
                    "content": [],
                    "model": self.model,
                    "stop_reason": null,
                    "stop_sequence": null,
                    "usage": {"input_tokens": 0, "output_tokens": 0}
                }
            })).unwrap()).with_event("message_start"));
        }

        let choices = chunk.get("choices").and_then(|c| c.as_array());
        let Some(choices) = choices else { return events; };

        for choice in choices {
            let delta = choice.get("delta");
            let finish_reason = choice.get("finish_reason").and_then(|f| f.as_str());

            if let Some(delta) = delta {
                if delta.get("role").is_some() && !self.sent_content_start {
                    continue;
                }

                if let Some(content) = delta.get("content").and_then(|c| c.as_str()) {
                    if !self.sent_content_start {
                        self.sent_content_start = true;
                        events.push(SseEvent::new(serde_json::to_string(&json!({
                            "type": "content_block_start",
                            "index": self.content_block_index,
                            "content_block": {"type": "text", "text": ""}
                        })).unwrap()).with_event("content_block_start"));
                    }

                    events.push(SseEvent::new(serde_json::to_string(&json!({
                        "type": "content_block_delta",
                        "index": self.content_block_index,
                        "delta": {"type": "text_delta", "text": content}
                    })).unwrap()).with_event("content_block_delta"));
                }

                if let Some(tool_calls) = delta.get("tool_calls").and_then(|t| t.as_array()) {
                    for tc in tool_calls {
                        if !self.sent_content_start {
                            self.sent_content_start = true;
                            events.push(SseEvent::new(serde_json::to_string(&json!({
                                "type": "content_block_start",
                                "index": self.content_block_index,
                                "content_block": {
                                    "type": "tool_use",
                                    "id": tc.get("id").and_then(|v| v.as_str()).unwrap_or(""),
                                    "name": tc.get("function").and_then(|f| f.get("name")).and_then(|n| n.as_str()).unwrap_or("")
                                }
                            })).unwrap()).with_event("content_block_start"));
                        }

                        if let Some(args) = tc.get("function").and_then(|f| f.get("arguments")).and_then(|a| a.as_str()) {
                            events.push(SseEvent::new(serde_json::to_string(&json!({
                                "type": "content_block_delta",
                                "index": self.content_block_index,
                                "delta": {"type": "input_json_delta", "partial_json": args}
                            })).unwrap()).with_event("content_block_delta"));
                        }
                    }
                }
            }

            if finish_reason.is_some() && finish_reason != Some("null") {
                if self.sent_content_start {
                    events.push(SseEvent::new(serde_json::to_string(&json!({
                        "type": "content_block_stop",
                        "index": self.content_block_index
                    })).unwrap()).with_event("content_block_stop"));
                    self.content_block_index += 1;
                    self.sent_content_start = false;
                }

                let stop_reason = match finish_reason {
                    Some("stop") => "end_turn",
                    Some("length") => "max_tokens",
                    Some("tool_calls") => "tool_use",
                    _ => "end_turn",
                };

                events.push(SseEvent::new(serde_json::to_string(&json!({
                    "type": "message_delta",
                    "delta": {"stop_reason": stop_reason, "stop_sequence": null},
                    "usage": {"output_tokens": 0}
                })).unwrap()).with_event("message_delta"));

                events.push(SseEvent::new(r#"{"type":"message_stop"}"#.to_owned()).with_event("message_stop"));
            }
        }

        events
    }

    fn flush_openai_to_claude(&mut self) -> Vec<SseEvent> {
        let mut events = Vec::new();

        if !self.sent_start {
            self.sent_start = true;
            events.push(SseEvent::new(serde_json::to_string(&json!({
                "type": "message_start",
                "message": {
                    "id": format!("msg_{}", uuid::Uuid::new_v4()),
                    "type": "message",
                    "role": "assistant",
                    "content": [],
                    "model": self.model,
                    "stop_reason": null,
                    "stop_sequence": null,
                    "usage": {"input_tokens": 0, "output_tokens": 0}
                }
            })).unwrap()).with_event("message_start"));
        }

        if self.sent_content_start {
            events.push(SseEvent::new(serde_json::to_string(&json!({
                "type": "content_block_stop",
                "index": self.content_block_index
            })).unwrap()).with_event("content_block_stop"));
            self.sent_content_start = false;
        }

        events.push(SseEvent::new(serde_json::to_string(&json!({
            "type": "message_delta",
            "delta": {"stop_reason": "end_turn", "stop_sequence": null},
            "usage": {"output_tokens": 0}
        })).unwrap()).with_event("message_delta"));

        events.push(SseEvent::new(r#"{"type":"message_stop"}"#.to_owned()).with_event("message_stop"));

        events
    }

    fn claude_to_openai(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let event_type = event.event.as_deref().unwrap_or("");
        let data = event.data.trim();

        match event_type {
            "message_start" => {
                self.sent_start = true;
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                if let Some(msg_id) = parsed.get("message").and_then(|m| m.get("id")).and_then(|v| v.as_str()) {
                    self.message_id = format!("chatcmpl-{}", msg_id.trim_start_matches("msg_"));
                }
                vec![SseEvent::new(serde_json::to_string(&json!({
                    "id": self.message_id,
                    "object": "chat.completion.chunk",
                    "created": unix_timestamp_secs(),
                    "model": self.model,
                    "choices": [{"index": 0, "delta": {"role": "assistant"}, "finish_reason": null}]
                })).unwrap())]
            }
            "content_block_start" => vec![],
            "content_block_delta" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                let delta = parsed.get("delta");
                let mut content = None;
                let mut tool_use = None;

                if let Some(d) = delta {
                    if d.get("type").and_then(|t| t.as_str()) == Some("text_delta") {
                        content = d.get("text").and_then(|t| t.as_str()).map(String::from);
                    } else if d.get("type").and_then(|t| t.as_str()) == Some("input_json_delta") {
                        tool_use = d.get("partial_json").and_then(|t| t.as_str()).map(String::from);
                    }
                }

                if let Some(text) = content {
                    vec![SseEvent::new(serde_json::to_string(&json!({
                        "id": self.message_id,
                        "object": "chat.completion.chunk",
                        "created": unix_timestamp_secs(),
                        "model": self.model,
                        "choices": [{"index": 0, "delta": {"content": text}, "finish_reason": null}]
                    })).unwrap())]
                } else if let Some(args) = tool_use {
                    vec![SseEvent::new(serde_json::to_string(&json!({
                        "id": self.message_id,
                        "object": "chat.completion.chunk",
                        "created": unix_timestamp_secs(),
                        "model": self.model,
                        "choices": [{"index": 0, "delta": {"tool_calls": [{"index": 0, "function": {"arguments": args}}]}, "finish_reason": null}]
                    })).unwrap())]
                } else {
                    vec![]
                }
            }
            "content_block_stop" => vec![],
            "message_delta" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                let stop_reason = parsed
                    .get("delta")
                    .and_then(|d| d.get("stop_reason"))
                    .and_then(|r| r.as_str());
                let finish_reason = match stop_reason {
                    Some("end_turn") | Some("stop") => "stop",
                    Some("max_tokens") => "length",
                    Some("tool_use") => "tool_calls",
                    _ => "stop",
                };
                vec![SseEvent::new(serde_json::to_string(&json!({
                    "id": self.message_id,
                    "object": "chat.completion.chunk",
                    "created": unix_timestamp_secs(),
                    "model": self.model,
                    "choices": [{"index": 0, "delta": {}, "finish_reason": finish_reason}]
                })).unwrap())]
            }
            "message_stop" => {
                vec![SseEvent::new("[DONE]")]
            }
            "ping" => vec![],
            _ => vec![],
        }
    }

    fn flush_claude_to_openai(&mut self) -> Vec<SseEvent> {
        let mut events = Vec::new();
        if !self.sent_start {
            events.push(SseEvent::new(serde_json::to_string(&json!({
                "id": self.message_id,
                "object": "chat.completion.chunk",
                "created": unix_timestamp_secs(),
                "model": self.model,
                "choices": [{"index": 0, "delta": {"role": "assistant"}, "finish_reason": null}]
            })).unwrap()));
        }
        events.push(SseEvent::new(serde_json::to_string(&json!({
            "id": self.message_id,
            "object": "chat.completion.chunk",
            "created": unix_timestamp_secs(),
            "model": self.model,
            "choices": [{"index": 0, "delta": {}, "finish_reason": "stop"}]
        })).unwrap()));
        events.push(SseEvent::new("[DONE]"));
        events
    }

    fn flush_openai_to_gemini(&mut self) -> Vec<SseEvent> {
        vec![SseEvent::new(serde_json::to_string(&json!({
            "candidates": [{
                "content": {"parts": [], "role": "model"},
                "finishReason": "STOP",
                "index": 0
            }]
        })).unwrap())]
    }

    fn flush_gemini_to_openai(&mut self) -> Vec<SseEvent> {
        let mut events = Vec::new();
        if !self.sent_start {
            events.push(SseEvent::new(serde_json::to_string(&json!({
                "id": self.message_id,
                "object": "chat.completion.chunk",
                "created": unix_timestamp_secs(),
                "model": self.model,
                "choices": [{"index": 0, "delta": {"role": "assistant"}, "finish_reason": null}]
            })).unwrap()));
        }
        events.push(SseEvent::new(serde_json::to_string(&json!({
            "id": self.message_id,
            "object": "chat.completion.chunk",
            "created": unix_timestamp_secs(),
            "model": self.model,
            "choices": [{"index": 0, "delta": {}, "finish_reason": "stop"}]
        })).unwrap()));
        events.push(SseEvent::new("[DONE]"));
        events
    }

    fn openai_to_gemini_stream(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let data = event.data.trim();
        if data == "[DONE]" {
            return self.flush_openai_to_gemini();
        }
        let Ok(chunk) = serde_json::from_str::<Value>(data) else {
            return vec![];
        };
        let choices = chunk.get("choices").and_then(|c| c.as_array());
        let Some(choices) = choices else { return vec![]; };

        let mut events = Vec::new();
        for choice in choices {
            let delta = choice.get("delta");
            let finish_reason = choice.get("finish_reason").and_then(|f| f.as_str());
            if let Some(delta) = delta {
                if let Some(content) = delta.get("content").and_then(|c| c.as_str()) {
                    events.push(SseEvent::new(serde_json::to_string(&json!({
                        "candidates": [{
                            "content": {"parts": [{"text": content}], "role": "model"},
                            "index": 0
                        }]
                    })).unwrap()));
                }

                if let Some(tool_calls) = delta.get("tool_calls").and_then(|t| t.as_array()) {
                    for tc in tool_calls {
                        let name = tc.get("function")
                            .and_then(|f| f.get("name"))
                            .and_then(|n| n.as_str())
                            .unwrap_or("");
                        let args = tc.get("function")
                            .and_then(|f| f.get("arguments"))
                            .and_then(|a| a.as_str())
                            .unwrap_or("{}");

                        if !name.is_empty() {
                            events.push(SseEvent::new(serde_json::to_string(&json!({
                                "candidates": [{
                                    "content": {"parts": [{"functionCall": {"name": name, "args": serde_json::from_str::<Value>(args).unwrap_or(json!({}))}}], "role": "model"},
                                    "index": 0
                                }]
                            })).unwrap()));
                        }
                    }
                }
            }

            if finish_reason.is_some() && finish_reason != Some("null") {
                events.push(SseEvent::new(serde_json::to_string(&json!({
                    "candidates": [{
                        "content": {"parts": [], "role": "model"},
                        "finishReason": "STOP",
                        "index": 0
                    }]
                })).unwrap()));
            }
        }
        events
    }

    fn gemini_to_openai_stream(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let data = event.data.trim();
        let Ok(chunk) = serde_json::from_str::<Value>(data) else {
            return vec![];
        };

        let candidate = chunk
            .get("candidates")
            .and_then(|c| c.as_array())
            .and_then(|c| c.first());

        let parts = candidate
            .and_then(|c| c.get("content"))
            .and_then(|c| c.get("parts"))
            .and_then(|p| p.as_array());

        let finish_reason = candidate
            .and_then(|c| c.get("finishReason"))
            .and_then(|f| f.as_str());

        let mut events = Vec::new();

        if let Some(parts) = parts {
            let mut text_parts = Vec::new();
            let mut tool_call_idx = 0u32;

            for part in parts {
                if let Some(text) = part.get("text").and_then(|t| t.as_str()) {
                    text_parts.push(text.to_owned());
                }

                if let Some(fc) = part.get("functionCall") {
                    let name = fc.get("name").and_then(|n| n.as_str()).unwrap_or("");
                    let args = fc.get("args").cloned().unwrap_or(json!({}));
                    let arguments = serde_json::to_string(&args).unwrap_or_default();

                    if !self.sent_start {
                        self.sent_start = true;
                        events.push(SseEvent::new(serde_json::to_string(&json!({
                            "id": self.message_id,
                            "object": "chat.completion.chunk",
                            "created": unix_timestamp_secs(),
                            "model": self.model,
                            "choices": [{"index": 0, "delta": {"role": "assistant"}, "finish_reason": null}]
                        })).unwrap()));
                    }

                    events.push(SseEvent::new(serde_json::to_string(&json!({
                        "id": self.message_id,
                        "object": "chat.completion.chunk",
                        "created": unix_timestamp_secs(),
                        "model": self.model,
                        "choices": [{"index": 0, "delta": {"tool_calls": [{"index": tool_call_idx, "type": "function", "function": {"name": name, "arguments": arguments}}]}, "finish_reason": null}]
                    })).unwrap()));
                    tool_call_idx += 1;
                }
            }

            let text = text_parts.join("");
            if !text.is_empty() {
                if !self.sent_start {
                    self.sent_start = true;
                    events.push(SseEvent::new(serde_json::to_string(&json!({
                        "id": self.message_id,
                        "object": "chat.completion.chunk",
                        "created": unix_timestamp_secs(),
                        "model": self.model,
                        "choices": [{"index": 0, "delta": {"role": "assistant"}, "finish_reason": null}]
                    })).unwrap()));
                }

                events.push(SseEvent::new(serde_json::to_string(&json!({
                    "id": self.message_id,
                    "object": "chat.completion.chunk",
                    "created": unix_timestamp_secs(),
                    "model": self.model,
                    "choices": [{"index": 0, "delta": {"content": text}, "finish_reason": null}]
                })).unwrap()));
            }
        }

        if let Some(reason) = finish_reason {
            let openai_finish = match reason {
                "STOP" => "stop",
                "MAX_TOKENS" => "length",
                _ => "stop",
            };
            if !self.sent_start {
                self.sent_start = true;
                events.push(SseEvent::new(serde_json::to_string(&json!({
                    "id": self.message_id,
                    "object": "chat.completion.chunk",
                    "created": unix_timestamp_secs(),
                    "model": self.model,
                    "choices": [{"index": 0, "delta": {"role": "assistant"}, "finish_reason": null}]
                })).unwrap()));
            }
            events.push(SseEvent::new(serde_json::to_string(&json!({
                "id": self.message_id,
                "object": "chat.completion.chunk",
                "created": unix_timestamp_secs(),
                "model": self.model,
                "choices": [{"index": 0, "delta": {}, "finish_reason": openai_finish}]
            })).unwrap()));
            events.push(SseEvent::new("[DONE]"));
        }

        events
    }
}

fn unix_timestamp_secs() -> u64 {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs()
}

pub fn map_upstream_path(
    client_path: &str,
    client_base_path: &str,
    upstream_protocol: Protocol,
    model: Option<&str>,
    is_streaming: bool,
) -> String {
    let stripped = client_path.strip_prefix(client_base_path).unwrap_or(client_path);

    match upstream_protocol {
        Protocol::Openai => stripped.to_owned(),
        Protocol::Anthropic => match stripped.trim_start_matches('/') {
            "chat/completions" => "/v1/messages".to_owned(),
            "models" => "/v1/models".to_owned(),
            other => format!("/v1/{}", other),
        },
        Protocol::Google => match stripped.trim_start_matches('/') {
            "chat/completions" => {
                let m = model.unwrap_or("gemini-pro");
                if is_streaming {
                    format!("/v1/models/{}:streamGenerateContent?alt=sse", m)
                } else {
                    format!("/v1/models/{}:generateContent", m)
                }
            }
            "models" => "/v1/models".to_owned(),
            other => format!("/v1/{}", other),
        },
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sse_event_parse() {
        let mut buffer = "event: message_start\ndata: {\"type\":\"message_start\"}\n\n".to_owned();
        let event = SseEvent::parse_from_buffer(&mut buffer).unwrap();
        assert_eq!(event.event.as_deref(), Some("message_start"));
        assert_eq!(event.data, "{\"type\":\"message_start\"}");
        assert!(buffer.is_empty());
    }

    #[test]
    fn test_sse_event_parse_data_only() {
        let mut buffer = "data: {\"id\":\"123\"}\n\n".to_owned();
        let event = SseEvent::parse_from_buffer(&mut buffer).unwrap();
        assert!(event.event.is_none());
        assert_eq!(event.data, "{\"id\":\"123\"}");
    }

    #[test]
    fn test_sse_event_parse_multiple() {
        let mut buffer = "data: first\n\ndata: second\n\n".to_owned();
        let e1 = SseEvent::parse_from_buffer(&mut buffer).unwrap();
        assert_eq!(e1.data, "first");
        let e2 = SseEvent::parse_from_buffer(&mut buffer).unwrap();
        assert_eq!(e2.data, "second");
    }

    #[test]
    fn test_sse_event_serialize() {
        let event = SseEvent::new("{\"type\":\"ping\"}").with_event("ping");
        let serialized = event.serialize();
        assert!(serialized.starts_with("event: ping\n"));
        assert!(serialized.contains("data: {\"type\":\"ping\"}\n"));
        assert!(serialized.ends_with("\n\n"));
    }

    #[test]
    fn test_sse_event_done() {
        let event = SseEvent::new("[DONE]");
        let serialized = event.serialize();
        assert_eq!(serialized, "data: [DONE]\n\n");
    }

    #[test]
    fn test_map_upstream_path_openai_to_anthropic() {
        let path = map_upstream_path("/v1/chat/completions", "/v1", Protocol::Anthropic, None, false);
        assert_eq!(path, "/v1/messages");
    }

    #[test]
    fn test_map_upstream_path_openai_to_google() {
        let path = map_upstream_path("/v1/chat/completions", "/v1", Protocol::Google, Some("gemini-pro"), false);
        assert_eq!(path, "/v1/models/gemini-pro:generateContent");
    }

    #[test]
    fn test_map_upstream_path_openai_to_google_streaming() {
        let path = map_upstream_path("/v1/chat/completions", "/v1", Protocol::Google, Some("gemini-pro"), true);
        assert_eq!(path, "/v1/models/gemini-pro:streamGenerateContent?alt=sse");
    }

    #[test]
    fn test_map_upstream_path_same_protocol() {
        let path = map_upstream_path("/v1/chat/completions", "/v1", Protocol::Openai, None, false);
        assert_eq!(path, "/chat/completions");
    }
}
