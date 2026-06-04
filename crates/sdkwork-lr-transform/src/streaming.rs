use sdkwork_lr_core::Protocol;
use sdkwork_lr_plugin::ApiSurface;
use serde_json::{json, Value};
use std::collections::{HashMap, HashSet};

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
        let sep_len = if buffer.as_bytes().get(pos + 1) == Some(&b'\r') {
            4
        } else {
            2
        };
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
    source_surface: ApiSurface,
    target_surface: ApiSurface,
    model: String,
    message_id: String,
    sent_start: bool,
    content_block_index: u32,
    active_claude_block: Option<ActiveClaudeBlock>,
    openai_tool_blocks: HashMap<u32, u32>,
    open_claude_tool_blocks: Vec<u32>,
    claude_tool_blocks: HashMap<u32, u32>,
    next_openai_tool_call_index: u32,
    emitted_openai_tool_call: bool,
    responses_next_output_index: u32,
    responses_text_output_index: Option<u32>,
    responses_text_item_id: Option<String>,
    responses_text: String,
    responses_active_text: String,
    responses_tool_blocks: HashMap<u32, ResponsesToolBlock>,
    responses_completed_output: Vec<Value>,
    responses_stop_reason: Option<String>,
    responses_usage: Option<Value>,
    responses_sequence_number: u64,
    chat_tool_calls_emitted: HashSet<u32>,
    pending_claude_stop_reason: Option<String>,
    pending_gemini_finish_reason: Option<String>,
    gemini_tool_calls: HashMap<u32, GeminiToolCallBlock>,
    sent_done: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum ActiveClaudeBlockKind {
    Text,
    Tool(u32),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
struct ActiveClaudeBlock {
    index: u32,
    kind: ActiveClaudeBlockKind,
}

#[derive(Debug, Clone)]
struct ResponsesToolBlock {
    output_index: u32,
    item_id: String,
    call_id: String,
    name: String,
    arguments: String,
}

#[derive(Debug, Clone, Default)]
struct GeminiToolCallBlock {
    name: String,
    arguments: String,
}

impl StreamTransformState {
    pub fn new(source: Protocol, target: Protocol, model: &str) -> Self {
        Self::new_for_surfaces(
            source,
            target,
            default_surface_for_protocol(source),
            default_surface_for_protocol(target),
            model,
        )
    }

    pub fn new_for_surfaces(
        source: Protocol,
        target: Protocol,
        source_surface: ApiSurface,
        target_surface: ApiSurface,
        model: &str,
    ) -> Self {
        Self {
            source,
            target,
            source_surface,
            target_surface,
            model: model.to_owned(),
            message_id: format!("chatcmpl-{}", uuid::Uuid::new_v4()),
            sent_start: false,
            content_block_index: 0,
            active_claude_block: None,
            openai_tool_blocks: HashMap::new(),
            open_claude_tool_blocks: Vec::new(),
            claude_tool_blocks: HashMap::new(),
            next_openai_tool_call_index: 0,
            emitted_openai_tool_call: false,
            responses_next_output_index: 0,
            responses_text_output_index: None,
            responses_text_item_id: None,
            responses_text: String::new(),
            responses_active_text: String::new(),
            responses_tool_blocks: HashMap::new(),
            responses_completed_output: Vec::new(),
            responses_stop_reason: None,
            responses_usage: None,
            responses_sequence_number: 0,
            chat_tool_calls_emitted: HashSet::new(),
            pending_claude_stop_reason: None,
            pending_gemini_finish_reason: None,
            gemini_tool_calls: HashMap::new(),
            sent_done: false,
        }
    }

    pub fn transform(&mut self, event: SseEvent) -> Vec<SseEvent> {
        if self.sent_done {
            return vec![];
        }
        match (self.source_surface, self.target_surface) {
            (ApiSurface::AnthropicMessages, ApiSurface::OpenAiResponses) => {
                self.claude_to_openai_responses_stream(event)
            }
            (ApiSurface::OpenAiResponses, ApiSurface::AnthropicMessages) => {
                self.openai_responses_to_claude_stream(event)
            }
            (ApiSurface::GeminiGenerateContent, ApiSurface::OpenAiResponses) => {
                self.gemini_to_openai_responses_stream(event)
            }
            (ApiSurface::OpenAiChatCompletions, ApiSurface::OpenAiResponses) => {
                self.openai_chat_to_responses_stream(event)
            }
            (ApiSurface::OpenAiResponses, ApiSurface::OpenAiChatCompletions) => {
                self.openai_responses_to_chat_stream(event)
            }
            (ApiSurface::OpenAiResponses, ApiSurface::GeminiGenerateContent) => {
                self.openai_responses_to_gemini_stream(event)
            }
            (ApiSurface::AnthropicMessages, ApiSurface::GeminiGenerateContent) => {
                self.claude_to_gemini_stream(event)
            }
            (ApiSurface::GeminiGenerateContent, ApiSurface::AnthropicMessages) => {
                self.gemini_to_claude_stream(event)
            }
            _ => match (self.source, self.target) {
                (Protocol::Openai, Protocol::Anthropic) => self.openai_to_claude(event),
                (Protocol::Anthropic, Protocol::Openai) => self.claude_to_openai(event),
                (Protocol::Openai, Protocol::Google) => self.openai_to_gemini_stream(event),
                (Protocol::Google, Protocol::Openai) => self.gemini_to_openai_stream(event),
                _ => vec![event],
            },
        }
    }

    pub fn flush(&mut self) -> Vec<SseEvent> {
        if self.sent_done {
            return vec![];
        }
        self.sent_done = true;
        match (self.source_surface, self.target_surface) {
            (ApiSurface::AnthropicMessages, ApiSurface::OpenAiResponses) => {
                self.flush_claude_to_openai_responses_stream()
            }
            (ApiSurface::OpenAiResponses, ApiSurface::AnthropicMessages) => {
                self.flush_openai_responses_to_claude_stream()
            }
            (ApiSurface::GeminiGenerateContent, ApiSurface::OpenAiResponses) => {
                self.flush_gemini_to_openai_responses_stream()
            }
            (ApiSurface::OpenAiChatCompletions, ApiSurface::OpenAiResponses) => {
                self.flush_openai_chat_to_responses_stream()
            }
            (ApiSurface::OpenAiResponses, ApiSurface::OpenAiChatCompletions) => {
                self.flush_openai_responses_to_chat_stream()
            }
            (ApiSurface::OpenAiResponses, ApiSurface::GeminiGenerateContent) => {
                self.flush_openai_responses_to_gemini_stream()
            }
            (ApiSurface::AnthropicMessages, ApiSurface::GeminiGenerateContent) => {
                self.flush_claude_to_gemini_stream()
            }
            (ApiSurface::GeminiGenerateContent, ApiSurface::AnthropicMessages) => {
                self.flush_gemini_to_claude_stream()
            }
            _ => match (self.source, self.target) {
                (Protocol::Openai, Protocol::Anthropic) => self.flush_openai_to_claude(),
                (Protocol::Anthropic, Protocol::Openai) => self.flush_claude_to_openai(),
                (Protocol::Openai, Protocol::Google) => self.flush_openai_to_gemini(),
                (Protocol::Google, Protocol::Openai) => self.flush_gemini_to_openai(),
                _ => vec![],
            },
        }
    }
}

impl StreamTransformState {
    fn openai_to_claude(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let data = event.data.trim();
        if data == "[DONE]" {
            let events = self.flush_openai_to_claude();
            self.sent_done = true;
            return events;
        }

        let Ok(chunk) = serde_json::from_str::<Value>(data) else {
            return vec![];
        };

        if let Some(usage) = chunk.get("usage") {
            self.responses_usage = Some(chat_usage_to_responses_usage(usage));
        }

        let mut events = Vec::new();

        if !self.sent_start {
            self.sent_start = true;
            events.push(
                SseEvent::new(
                    serde_json::to_string(&json!({
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
                    }))
                    .unwrap(),
                )
                .with_event("message_start"),
            );
        }

        let choices = chunk.get("choices").and_then(|c| c.as_array());
        let Some(choices) = choices else {
            return events;
        };

        for choice in choices {
            let delta = choice.get("delta");
            let finish_reason = choice.get("finish_reason").and_then(|f| f.as_str());

            if let Some(delta) = delta {
                if delta.get("role").is_some() && self.active_claude_block.is_none() {
                    continue;
                }

                if let Some(content) = delta.get("content").and_then(|c| c.as_str()) {
                    let block_index = self.ensure_claude_text_block(&mut events);

                    events.push(
                        SseEvent::new(
                            serde_json::to_string(&json!({
                                "type": "content_block_delta",
                                "index": block_index,
                                "delta": {"type": "text_delta", "text": content}
                            }))
                            .unwrap(),
                        )
                        .with_event("content_block_delta"),
                    );
                }

                if let Some(tool_calls) = delta.get("tool_calls").and_then(|t| t.as_array()) {
                    for tc in tool_calls {
                        let tool_call_index =
                            tc.get("index").and_then(|v| v.as_u64()).unwrap_or(0) as u32;
                        let block_index = self.ensure_claude_tool_block(
                            &mut events,
                            tool_call_index,
                            tc.get("id").and_then(|v| v.as_str()).unwrap_or(""),
                            tc.get("function")
                                .and_then(|f| f.get("name"))
                                .and_then(|n| n.as_str())
                                .unwrap_or(""),
                        );

                        if let Some(args) = tc
                            .get("function")
                            .and_then(|f| f.get("arguments"))
                            .and_then(|a| a.as_str())
                            .filter(|args| !args.is_empty())
                        {
                            events.push(
                                SseEvent::new(
                                    serde_json::to_string(&json!({
                                        "type": "content_block_delta",
                                        "index": block_index,
                                        "delta": {"type": "input_json_delta", "partial_json": args}
                                    }))
                                    .unwrap(),
                                )
                                .with_event("content_block_delta"),
                            );
                        }
                    }
                }
            }

            if finish_reason.is_some() && finish_reason != Some("null") {
                self.stop_active_claude_block(&mut events);
                self.stop_open_claude_tool_blocks(&mut events);

                let stop_reason = match finish_reason {
                    Some("stop") => "end_turn",
                    Some("length") => "max_tokens",
                    Some("tool_calls") => "tool_use",
                    Some("content_filter") => "refusal",
                    _ => "end_turn",
                };

                self.pending_claude_stop_reason = Some(stop_reason.to_owned());
            }
        }

        events
    }

    fn flush_openai_to_claude(&mut self) -> Vec<SseEvent> {
        let stop_reason = self
            .pending_claude_stop_reason
            .take()
            .unwrap_or_else(|| "end_turn".to_owned());
        self.finish_claude_message_stream(&stop_reason)
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
                if let Some(msg_id) = parsed
                    .get("message")
                    .and_then(|m| m.get("id"))
                    .and_then(|v| v.as_str())
                {
                    self.message_id = format!("chatcmpl-{}", msg_id.trim_start_matches("msg_"));
                }
                if let Some(usage) = parsed
                    .get("message")
                    .and_then(|message| message.get("usage"))
                {
                    self.merge_responses_usage(usage);
                }
                vec![SseEvent::new(serde_json::to_string(&json!({
                    "id": self.message_id,
                    "object": "chat.completion.chunk",
                    "created": unix_timestamp_secs(),
                    "model": self.model,
                    "choices": [{"index": 0, "delta": {"role": "assistant"}, "finish_reason": null}]
                })).unwrap())]
            }
            "content_block_start" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                let block_index = parsed.get("index").and_then(|v| v.as_u64()).unwrap_or(0) as u32;
                let Some(content_block) = parsed.get("content_block") else {
                    return vec![];
                };
                if content_block.get("type").and_then(|t| t.as_str()) != Some("tool_use") {
                    return vec![];
                }

                let tool_call_index = self.openai_tool_call_index_for_claude_block(block_index);
                let id = content_block
                    .get("id")
                    .and_then(|v| v.as_str())
                    .unwrap_or("");
                let name = content_block
                    .get("name")
                    .and_then(|v| v.as_str())
                    .unwrap_or("");
                let arguments = content_block
                    .get("input")
                    .filter(|input| !input.as_object().is_some_and(|object| object.is_empty()))
                    .and_then(|input| serde_json::to_string(input).ok())
                    .unwrap_or_default();

                vec![SseEvent::new(
                    serde_json::to_string(&json!({
                        "id": self.message_id,
                        "object": "chat.completion.chunk",
                        "created": unix_timestamp_secs(),
                        "model": self.model,
                        "choices": [{"index": 0, "delta": {"tool_calls": [{
                            "index": tool_call_index,
                            "id": id,
                            "type": "function",
                            "function": {"name": name, "arguments": arguments}
                        }]}, "finish_reason": null}]
                    }))
                    .unwrap(),
                )]
            }
            "content_block_delta" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                let block_index = parsed.get("index").and_then(|v| v.as_u64()).unwrap_or(0) as u32;
                let delta = parsed.get("delta");
                let mut content = None;
                let mut tool_use = None;

                if let Some(d) = delta {
                    if d.get("type").and_then(|t| t.as_str()) == Some("text_delta") {
                        content = d.get("text").and_then(|t| t.as_str()).map(String::from);
                    } else if d.get("type").and_then(|t| t.as_str()) == Some("input_json_delta") {
                        tool_use = d
                            .get("partial_json")
                            .and_then(|t| t.as_str())
                            .map(String::from);
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
                    let tool_call_index = self.openai_tool_call_index_for_claude_block(block_index);
                    vec![SseEvent::new(serde_json::to_string(&json!({
                        "id": self.message_id,
                        "object": "chat.completion.chunk",
                        "created": unix_timestamp_secs(),
                        "model": self.model,
                        "choices": [{"index": 0, "delta": {"tool_calls": [{"index": tool_call_index, "function": {"arguments": args}}]}, "finish_reason": null}]
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
                if let Some(usage) = parsed.get("usage") {
                    self.merge_responses_usage(usage);
                }
                let stop_reason = parsed
                    .get("delta")
                    .and_then(|d| d.get("stop_reason"))
                    .and_then(|r| r.as_str());
                let finish_reason = match stop_reason {
                    Some("end_turn") | Some("stop") | Some("pause_turn") => "stop",
                    Some("max_tokens") | Some("model_context_window_exceeded") => "length",
                    Some("tool_use") => "tool_calls",
                    Some("refusal") => "content_filter",
                    _ => "stop",
                };
                vec![SseEvent::new(
                    serde_json::to_string(&json!({
                        "id": self.message_id,
                        "object": "chat.completion.chunk",
                        "created": unix_timestamp_secs(),
                        "model": self.model,
                        "choices": [{"index": 0, "delta": {}, "finish_reason": finish_reason}]
                    }))
                    .unwrap(),
                )]
            }
            "message_stop" => {
                self.sent_done = true;
                let mut events = Vec::new();
                if self.responses_usage.is_some() {
                    events.push(self.openai_chat_usage_chunk());
                }
                events.push(SseEvent::new("[DONE]"));
                events
            }
            "ping" => vec![],
            _ => vec![],
        }
    }

    fn claude_to_openai_responses_stream(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let event_type = event.event.as_deref().unwrap_or("");
        let data = event.data.trim();

        match event_type {
            "message_start" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                if let Some(message_id) = parsed
                    .get("message")
                    .and_then(|message| message.get("id"))
                    .and_then(|value| value.as_str())
                {
                    self.message_id = format!("resp_{}", message_id.trim_start_matches("msg_"));
                }
                self.responses_usage = parsed
                    .get("message")
                    .and_then(|message| message.get("usage"))
                    .cloned();
                self.sent_start = true;
                vec![
                    self.responses_event(
                        "response.created",
                        json!({
                            "type": "response.created",
                            "response": self.responses_snapshot("in_progress")
                        }),
                    ),
                    self.responses_event(
                        "response.in_progress",
                        json!({
                            "type": "response.in_progress",
                            "response": self.responses_snapshot("in_progress")
                        }),
                    ),
                ]
            }
            "content_block_start" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                let block_index = parsed.get("index").and_then(|v| v.as_u64()).unwrap_or(0) as u32;
                let Some(content_block) = parsed.get("content_block") else {
                    return vec![];
                };

                match content_block.get("type").and_then(|value| value.as_str()) {
                    Some("text") => self.start_responses_text_item(),
                    Some("tool_use") => {
                        let item_id = content_block
                            .get("id")
                            .and_then(|value| value.as_str())
                            .unwrap_or("")
                            .to_owned();
                        let name = content_block
                            .get("name")
                            .and_then(|value| value.as_str())
                            .unwrap_or("")
                            .to_owned();
                        let arguments = content_block
                            .get("input")
                            .filter(|input| {
                                !input.as_object().is_some_and(|object| object.is_empty())
                            })
                            .and_then(|input| serde_json::to_string(input).ok())
                            .unwrap_or_default();
                        self.start_responses_tool_item(block_index, item_id, name, arguments)
                    }
                    _ => vec![],
                }
            }
            "content_block_delta" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                let block_index = parsed.get("index").and_then(|v| v.as_u64()).unwrap_or(0) as u32;
                let Some(delta) = parsed.get("delta") else {
                    return vec![];
                };
                match delta.get("type").and_then(|value| value.as_str()) {
                    Some("text_delta") => {
                        let text = delta
                            .get("text")
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        self.emit_responses_text_delta(text)
                    }
                    Some("input_json_delta") => {
                        let partial_json = delta
                            .get("partial_json")
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        self.emit_responses_tool_arguments_delta(block_index, partial_json)
                    }
                    _ => vec![],
                }
            }
            "content_block_stop" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                let block_index = parsed.get("index").and_then(|v| v.as_u64()).unwrap_or(0) as u32;
                self.stop_responses_output_item(block_index)
            }
            "message_delta" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                self.responses_stop_reason = parsed
                    .get("delta")
                    .and_then(|delta| delta.get("stop_reason"))
                    .and_then(|value| value.as_str())
                    .map(str::to_owned);
                if let Some(usage) = parsed.get("usage") {
                    self.merge_responses_usage(usage);
                }
                vec![]
            }
            "message_stop" => {
                self.sent_done = true;
                let mut events = self.finish_open_responses_items();
                events.push(self.responses_completion_event());
                events.push(SseEvent::new("[DONE]"));
                events
            }
            "ping" => vec![],
            _ => vec![],
        }
    }

    fn start_responses_text_item(&mut self) -> Vec<SseEvent> {
        if self.responses_text_output_index.is_some() {
            return vec![];
        }
        let output_index = self.responses_next_output_index;
        self.responses_next_output_index += 1;
        let item_id = format!("msg_{}", uuid::Uuid::new_v4());
        self.responses_text_output_index = Some(output_index);
        self.responses_text_item_id = Some(item_id.clone());
        self.responses_active_text.clear();
        vec![
            self.responses_event(
                "response.output_item.added",
                json!({
                    "type": "response.output_item.added",
                    "output_index": output_index,
                    "item": {
                        "type": "message",
                        "id": item_id,
                        "status": "in_progress",
                        "role": "assistant",
                        "content": []
                    }
                }),
            ),
            self.responses_event(
                "response.content_part.added",
                json!({
                    "type": "response.content_part.added",
                    "item_id": item_id,
                    "output_index": output_index,
                    "content_index": 0,
                    "part": {"type": "output_text", "text": "", "annotations": []}
                }),
            ),
        ]
    }

    fn emit_responses_text_delta(&mut self, text: &str) -> Vec<SseEvent> {
        let mut events = self.start_responses_text_item();
        self.responses_text.push_str(text);
        self.responses_active_text.push_str(text);
        let output_index = self.responses_text_output_index.unwrap_or(0);
        let item_id = self
            .responses_text_item_id
            .clone()
            .unwrap_or_else(|| format!("msg_{}", uuid::Uuid::new_v4()));
        events.push(self.responses_event(
            "response.output_text.delta",
            json!({
                "type": "response.output_text.delta",
                "item_id": item_id,
                "output_index": output_index,
                "content_index": 0,
                "delta": text
            }),
        ));
        events
    }

    fn start_responses_tool_item(
        &mut self,
        block_index: u32,
        item_id: String,
        name: String,
        arguments: String,
    ) -> Vec<SseEvent> {
        if self.responses_tool_blocks.contains_key(&block_index) {
            return vec![];
        }
        let output_index = self.responses_next_output_index;
        self.responses_next_output_index += 1;
        let item_id = if item_id.is_empty() {
            format!("fc_{}", uuid::Uuid::new_v4())
        } else {
            item_id
        };
        let call_id = item_id.clone();
        let tool_block = ResponsesToolBlock {
            output_index,
            item_id: item_id.clone(),
            call_id: call_id.clone(),
            name: name.clone(),
            arguments: arguments.clone(),
        };
        self.responses_tool_blocks.insert(block_index, tool_block);
        vec![self.responses_event(
            "response.output_item.added",
            json!({
                "type": "response.output_item.added",
                "output_index": output_index,
                "item": {
                    "type": "function_call",
                    "id": item_id,
                    "call_id": call_id,
                    "name": name,
                    "arguments": arguments,
                    "status": "in_progress"
                }
            }),
        )]
    }

    fn emit_responses_tool_arguments_delta(
        &mut self,
        block_index: u32,
        partial_json: &str,
    ) -> Vec<SseEvent> {
        let Some((item_id, output_index)) =
            self.responses_tool_blocks
                .get_mut(&block_index)
                .map(|tool_block| {
                    tool_block.arguments.push_str(partial_json);
                    (tool_block.item_id.clone(), tool_block.output_index)
                })
        else {
            return vec![];
        };
        vec![self.responses_event(
            "response.function_call_arguments.delta",
            json!({
                "type": "response.function_call_arguments.delta",
                "item_id": item_id,
                "output_index": output_index,
                "delta": partial_json
            }),
        )]
    }

    fn stop_responses_output_item(&mut self, block_index: u32) -> Vec<SseEvent> {
        if let Some(tool_block) = self.responses_tool_blocks.remove(&block_index) {
            let completed_item = json!({
                "type": "function_call",
                "id": tool_block.item_id,
                "call_id": tool_block.call_id,
                "name": tool_block.name,
                "arguments": tool_block.arguments,
                "status": "completed"
            });
            self.responses_completed_output.push(completed_item.clone());
            return vec![
                self.responses_event(
                    "response.function_call_arguments.done",
                    json!({
                        "type": "response.function_call_arguments.done",
                        "item_id": tool_block.item_id,
                        "output_index": tool_block.output_index,
                        "name": tool_block.name,
                        "arguments": tool_block.arguments
                    }),
                ),
                self.responses_event(
                    "response.output_item.done",
                    json!({
                        "type": "response.output_item.done",
                        "output_index": tool_block.output_index,
                        "item": completed_item
                    }),
                ),
            ];
        }

        let Some(output_index) = self.responses_text_output_index else {
            return vec![];
        };
        let item_id = self.responses_text_item_id.clone().unwrap_or_default();
        let completed_item = json!({
            "type": "message",
            "id": item_id,
            "status": "completed",
            "role": "assistant",
            "content": [{"type": "output_text", "text": self.responses_active_text, "annotations": []}]
        });
        self.responses_completed_output.push(completed_item.clone());
        self.responses_text_output_index = None;
        vec![
            self.responses_event(
                "response.output_text.done",
                json!({
                    "type": "response.output_text.done",
                    "item_id": item_id,
                    "output_index": output_index,
                    "content_index": 0,
                    "text": self.responses_active_text
                }),
            ),
            self.responses_event(
                "response.content_part.done",
                json!({
                    "type": "response.content_part.done",
                    "item_id": item_id,
                    "output_index": output_index,
                    "content_index": 0,
                    "part": {"type": "output_text", "text": self.responses_active_text, "annotations": []}
                }),
            ),
            self.responses_event(
                "response.output_item.done",
                json!({
                    "type": "response.output_item.done",
                    "output_index": output_index,
                    "item": completed_item
                }),
            ),
        ]
    }

    fn finish_open_responses_items(&mut self) -> Vec<SseEvent> {
        let mut events = Vec::new();
        if self.responses_text_output_index.is_some() {
            events.extend(self.stop_responses_output_item(u32::MAX));
        }
        let open_tool_indexes = self
            .responses_tool_blocks
            .keys()
            .copied()
            .collect::<Vec<_>>();
        for block_index in open_tool_indexes {
            events.extend(self.stop_responses_output_item(block_index));
        }
        events
    }

    fn responses_completion_event(&mut self) -> SseEvent {
        let status = match self.responses_stop_reason.as_deref() {
            Some("max_tokens") | Some("model_context_window_exceeded") | Some("refusal") => {
                "incomplete"
            }
            _ => "completed",
        };
        let event_type = if status == "incomplete" {
            "response.incomplete"
        } else {
            "response.completed"
        };
        self.responses_event(
            event_type,
            json!({
                "type": event_type,
                "response": self.responses_snapshot(status)
            }),
        )
    }

    fn responses_snapshot(&self, status: &str) -> Value {
        let mut response = json!({
            "id": self.message_id,
            "object": "response",
            "created_at": unix_timestamp_secs(),
            "status": status,
            "model": self.model,
            "output": self.responses_output_snapshot(status),
            "output_text": self.responses_text,
            "usage": self.responses_usage_snapshot()
        });
        if status == "incomplete" {
            response["incomplete_details"] = json!({
                "reason": match self.responses_stop_reason.as_deref() {
                    Some("max_tokens") | Some("model_context_window_exceeded") => "max_output_tokens",
                    Some("refusal") => "content_filter",
                    _ => "max_output_tokens",
                }
            });
        } else {
            response["incomplete_details"] = Value::Null;
        }
        response
    }

    fn responses_output_snapshot(&self, status: &str) -> Value {
        let item_status = if status == "completed" {
            "completed"
        } else {
            "incomplete"
        };
        let mut output = self.responses_completed_output.clone();
        if let Some(output_index) = self.responses_text_output_index {
            output.push(json!({
                "type": "message",
                "id": self.responses_text_item_id.clone().unwrap_or_default(),
                "status": item_status,
                "role": "assistant",
                "content": [{"type": "output_text", "text": self.responses_active_text, "annotations": []}],
                "output_index": output_index
            }));
        }
        for tool_block in self.responses_tool_blocks.values() {
            output.push(json!({
                "type": "function_call",
                "id": tool_block.item_id,
                "call_id": tool_block.call_id,
                "name": tool_block.name,
                "arguments": tool_block.arguments,
                "status": item_status,
                "output_index": tool_block.output_index
            }));
        }
        Value::Array(output)
    }

    fn responses_usage_snapshot(&self) -> Value {
        let input = self
            .responses_usage
            .as_ref()
            .and_then(|usage| usage.get("input_tokens"))
            .and_then(|value| value.as_u64())
            .unwrap_or(0);
        let output = self
            .responses_usage
            .as_ref()
            .and_then(|usage| usage.get("output_tokens"))
            .and_then(|value| value.as_u64())
            .unwrap_or(0);
        json!({
            "input_tokens": input,
            "output_tokens": output,
            "total_tokens": input + output
        })
    }

    fn merge_responses_usage(&mut self, usage_update: &Value) {
        let mut usage = self.responses_usage.clone().unwrap_or_else(|| json!({}));
        let Some(target) = usage.as_object_mut() else {
            self.responses_usage = Some(usage_update.clone());
            return;
        };
        if let Some(update) = usage_update.as_object() {
            for (key, value) in update {
                target.insert(key.clone(), value.clone());
            }
            self.responses_usage = Some(usage);
        } else {
            self.responses_usage = Some(usage_update.clone());
        }
    }

    fn responses_event(&mut self, event_type: &str, mut payload: Value) -> SseEvent {
        if payload.get("sequence_number").is_none() {
            payload["sequence_number"] = Value::from(self.responses_sequence_number);
            self.responses_sequence_number += 1;
        }
        SseEvent::new(serde_json::to_string(&payload).unwrap()).with_event(event_type)
    }

    fn flush_claude_to_openai_responses_stream(&mut self) -> Vec<SseEvent> {
        let mut events = Vec::new();
        if !self.sent_start {
            self.sent_start = true;
            events.push(self.responses_event(
                "response.created",
                json!({
                    "type": "response.created",
                    "response": self.responses_snapshot("in_progress")
                }),
            ));
            events.push(self.responses_event(
                "response.in_progress",
                json!({
                    "type": "response.in_progress",
                    "response": self.responses_snapshot("in_progress")
                }),
            ));
        }
        events.extend(self.finish_open_responses_items());
        events.push(self.responses_completion_event());
        events.push(SseEvent::new("[DONE]"));
        events
    }

    fn gemini_to_openai_responses_stream(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let data = event.data.trim();
        let Ok(chunk) = serde_json::from_str::<Value>(data) else {
            return vec![];
        };

        let mut events = Vec::new();
        events.extend(self.ensure_openai_responses_started());

        if let Some(usage) = chunk.get("usageMetadata") {
            self.responses_usage = Some(gemini_usage_to_responses_usage(usage));
        }

        let candidate = chunk
            .get("candidates")
            .and_then(|value| value.as_array())
            .and_then(|items| items.first());

        if let Some(parts) = candidate
            .and_then(|candidate| candidate.get("content"))
            .and_then(|content| content.get("parts"))
            .and_then(|parts| parts.as_array())
        {
            for part in parts {
                if let Some(text) = part.get("text").and_then(|value| value.as_str()) {
                    events.extend(self.emit_responses_text_delta(text));
                }
                if let Some(function_call) = part.get("functionCall") {
                    if self.responses_text_output_index.is_some() {
                        events.extend(self.stop_responses_output_item(u32::MAX));
                    }
                    let name = function_call
                        .get("name")
                        .and_then(|value| value.as_str())
                        .unwrap_or("")
                        .to_owned();
                    let arguments = function_call
                        .get("args")
                        .cloned()
                        .unwrap_or_else(|| json!({}));
                    let arguments =
                        serde_json::to_string(&arguments).unwrap_or_else(|_| "{}".to_owned());
                    events.extend(self.emit_gemini_responses_function_call(name, arguments));
                }
            }
        }

        if let Some(reason) = candidate
            .and_then(|candidate| candidate.get("finishReason"))
            .and_then(|value| value.as_str())
        {
            self.responses_stop_reason = Some(gemini_finish_reason_to_responses_stop(reason));
            self.sent_done = true;
            events.extend(self.finish_open_responses_items());
            events.push(self.responses_completion_event());
            events.push(SseEvent::new("[DONE]"));
        }

        events
    }

    fn ensure_openai_responses_started(&mut self) -> Vec<SseEvent> {
        if self.sent_start {
            return vec![];
        }
        self.sent_start = true;
        vec![
            self.responses_event(
                "response.created",
                json!({
                    "type": "response.created",
                    "response": self.responses_snapshot("in_progress")
                }),
            ),
            self.responses_event(
                "response.in_progress",
                json!({
                    "type": "response.in_progress",
                    "response": self.responses_snapshot("in_progress")
                }),
            ),
        ]
    }

    fn emit_gemini_responses_function_call(
        &mut self,
        name: String,
        arguments: String,
    ) -> Vec<SseEvent> {
        let output_index = self.responses_next_output_index;
        self.responses_next_output_index += 1;
        let item_id = format!("fc_{}", uuid::Uuid::new_v4());
        let call_id = item_id.clone();
        let completed_item = json!({
            "type": "function_call",
            "id": item_id,
            "call_id": call_id,
            "name": name,
            "arguments": arguments,
            "status": "completed"
        });
        self.responses_completed_output.push(completed_item.clone());
        vec![
            self.responses_event(
                "response.output_item.added",
                json!({
                    "type": "response.output_item.added",
                    "output_index": output_index,
                    "item": {
                        "type": "function_call",
                        "id": item_id,
                        "call_id": call_id,
                        "name": name,
                        "arguments": "",
                        "status": "in_progress"
                    }
                }),
            ),
            self.responses_event(
                "response.function_call_arguments.delta",
                json!({
                    "type": "response.function_call_arguments.delta",
                    "item_id": item_id,
                    "output_index": output_index,
                    "delta": arguments
                }),
            ),
            self.responses_event(
                "response.function_call_arguments.done",
                json!({
                    "type": "response.function_call_arguments.done",
                    "item_id": item_id,
                    "output_index": output_index,
                    "name": name,
                    "arguments": arguments
                }),
            ),
            self.responses_event(
                "response.output_item.done",
                json!({
                    "type": "response.output_item.done",
                    "output_index": output_index,
                    "item": completed_item
                }),
            ),
        ]
    }

    fn flush_gemini_to_openai_responses_stream(&mut self) -> Vec<SseEvent> {
        let mut events = self.ensure_openai_responses_started();
        events.extend(self.finish_open_responses_items());
        events.push(self.responses_completion_event());
        events.push(SseEvent::new("[DONE]"));
        events
    }

    fn openai_chat_to_responses_stream(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let data = event.data.trim();
        if data == "[DONE]" {
            let mut events = self.finish_open_responses_items();
            events.push(self.responses_completion_event());
            events.push(SseEvent::new("[DONE]"));
            self.sent_done = true;
            return events;
        }

        let Ok(chunk) = serde_json::from_str::<Value>(data) else {
            return vec![];
        };

        if let Some(id) = chunk.get("id").and_then(|value| value.as_str()) {
            self.message_id = format!("resp_{}", id.trim_start_matches("chatcmpl_"));
        }
        if let Some(model) = chunk.get("model").and_then(|value| value.as_str()) {
            self.model = model.to_owned();
        }
        if let Some(usage) = chunk.get("usage") {
            self.responses_usage = Some(chat_usage_to_responses_usage(usage));
        }

        let mut events = self.ensure_openai_responses_started();
        let choices = chunk.get("choices").and_then(|value| value.as_array());
        let Some(choices) = choices else {
            return events;
        };

        for choice in choices {
            if let Some(delta) = choice.get("delta") {
                if let Some(content) = delta.get("content").and_then(|value| value.as_str()) {
                    if !content.is_empty() {
                        events.extend(self.emit_responses_text_delta(content));
                    }
                }
                if let Some(tool_calls) = delta.get("tool_calls").and_then(|value| value.as_array())
                {
                    for tool_call in tool_calls {
                        events.extend(self.handle_chat_tool_call_delta_for_responses(tool_call));
                    }
                }
            }

            if let Some(finish_reason) =
                choice.get("finish_reason").and_then(|value| value.as_str())
            {
                self.responses_stop_reason =
                    Some(chat_finish_reason_to_responses_stop(finish_reason).to_owned());
            }
        }

        events
    }

    fn handle_chat_tool_call_delta_for_responses(&mut self, tool_call: &Value) -> Vec<SseEvent> {
        let tool_index = tool_call
            .get("index")
            .and_then(|value| value.as_u64())
            .unwrap_or(self.next_openai_tool_call_index as u64) as u32;
        let function = tool_call.get("function").unwrap_or(&Value::Null);
        let call_id = tool_call
            .get("id")
            .and_then(|value| value.as_str())
            .unwrap_or("");
        let name = function
            .get("name")
            .and_then(|value| value.as_str())
            .unwrap_or("");
        let arguments = function
            .get("arguments")
            .and_then(|value| value.as_str())
            .unwrap_or("");

        let mut events = Vec::new();
        if !self.responses_tool_blocks.contains_key(&tool_index) {
            let item_id = if call_id.is_empty() {
                format!("fc_{}", uuid::Uuid::new_v4())
            } else {
                call_id.to_owned()
            };
            events.extend(self.start_responses_tool_item(
                tool_index,
                item_id,
                name.to_owned(),
                String::new(),
            ));
        }

        if !arguments.is_empty() {
            events.extend(self.emit_responses_tool_arguments_delta(tool_index, arguments));
        }
        events
    }

    fn flush_openai_chat_to_responses_stream(&mut self) -> Vec<SseEvent> {
        let mut events = self.ensure_openai_responses_started();
        events.extend(self.finish_open_responses_items());
        events.push(self.responses_completion_event());
        events.push(SseEvent::new("[DONE]"));
        events
    }

    fn openai_responses_to_chat_stream(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let data = event.data.trim();
        if data == "[DONE]" {
            let events = self.flush_openai_responses_to_chat_stream();
            self.sent_done = true;
            return events;
        }

        let Ok(parsed) = serde_json::from_str::<Value>(data) else {
            return vec![];
        };
        let event_type = parsed
            .get("type")
            .and_then(|value| value.as_str())
            .or(event.event.as_deref())
            .unwrap_or("");
        let mut events = Vec::new();

        match event_type {
            "response.created" | "response.in_progress" => {
                if let Some(response) = parsed.get("response") {
                    self.observe_responses_id_model_and_usage(response);
                }
                events.extend(self.ensure_openai_chat_started());
            }
            "response.output_text.delta" => {
                events.extend(self.ensure_openai_chat_started());
                let text = parsed
                    .get("delta")
                    .and_then(|value| value.as_str())
                    .unwrap_or("");
                if !text.is_empty() {
                    events.push(self.openai_chat_chunk(json!({"content": text}), Value::Null));
                }
            }
            "response.output_item.added" => {
                events.extend(self.ensure_openai_chat_started());
                if let Some(item) = parsed.get("item") {
                    if item.get("type").and_then(|value| value.as_str()) == Some("function_call") {
                        let output_index = parsed
                            .get("output_index")
                            .and_then(|value| value.as_u64())
                            .unwrap_or(self.next_openai_tool_call_index as u64)
                            as u32;
                        let id = item
                            .get("call_id")
                            .or_else(|| item.get("id"))
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        let name = item
                            .get("name")
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        self.chat_tool_calls_emitted.insert(output_index);
                        events.push(self.openai_chat_chunk(
                            json!({
                                "tool_calls": [{
                                    "index": output_index,
                                    "id": id,
                                    "type": "function",
                                    "function": {"name": name, "arguments": ""}
                                }]
                            }),
                            Value::Null,
                        ));
                    }
                }
            }
            "response.function_call_arguments.delta" => {
                events.extend(self.ensure_openai_chat_started());
                let output_index = parsed
                    .get("output_index")
                    .and_then(|value| value.as_u64())
                    .unwrap_or(0);
                let delta = parsed
                    .get("delta")
                    .and_then(|value| value.as_str())
                    .unwrap_or("");
                if !delta.is_empty() {
                    events.push(self.openai_chat_chunk(
                        json!({
                            "tool_calls": [{
                                "index": output_index,
                                "function": {"arguments": delta}
                            }]
                        }),
                        Value::Null,
                    ));
                }
            }
            "response.output_item.done" => {
                if let Some(item) = parsed.get("item") {
                    if item.get("type").and_then(|value| value.as_str()) == Some("function_call") {
                        let output_index = parsed
                            .get("output_index")
                            .and_then(|value| value.as_u64())
                            .unwrap_or(0) as u32;
                        if !self.chat_tool_calls_emitted.contains(&output_index) {
                            events.extend(self.ensure_openai_chat_started());
                            self.chat_tool_calls_emitted.insert(output_index);
                            let id = item
                                .get("call_id")
                                .or_else(|| item.get("id"))
                                .and_then(|value| value.as_str())
                                .unwrap_or("");
                            let name = item
                                .get("name")
                                .and_then(|value| value.as_str())
                                .unwrap_or("");
                            let arguments = item
                                .get("arguments")
                                .and_then(|value| value.as_str())
                                .unwrap_or("");
                            events.push(self.openai_chat_chunk(
                                json!({
                                    "tool_calls": [{
                                        "index": output_index,
                                        "id": id,
                                        "type": "function",
                                        "function": {"name": name, "arguments": arguments}
                                    }]
                                }),
                                Value::Null,
                            ));
                        }
                    }
                }
            }
            "response.completed" | "response.incomplete" | "response.failed" => {
                if let Some(response) = parsed.get("response") {
                    self.observe_responses_id_model_and_usage(response);
                }
                let finish_reason =
                    chat_finish_reason_from_responses_event(event_type, parsed.get("response"));
                events.extend(self.ensure_openai_chat_started());
                events.push(
                    self.openai_chat_chunk(json!({}), Value::String(finish_reason.to_owned())),
                );
                if self.responses_usage.is_some() {
                    events.push(self.openai_chat_usage_chunk());
                }
                events.push(SseEvent::new("[DONE]"));
                self.sent_done = true;
            }
            _ => {}
        }

        events
    }

    fn ensure_openai_chat_started(&mut self) -> Vec<SseEvent> {
        if self.sent_start {
            return vec![];
        }
        self.sent_start = true;
        vec![self.openai_chat_chunk(json!({"role": "assistant"}), Value::Null)]
    }

    fn openai_chat_chunk(&self, delta: Value, finish_reason: Value) -> SseEvent {
        SseEvent::new(
            serde_json::to_string(&json!({
                "id": self.openai_chat_message_id(),
                "object": "chat.completion.chunk",
                "created": unix_timestamp_secs(),
                "model": self.model,
                "choices": [{"index": 0, "delta": delta, "finish_reason": finish_reason}]
            }))
            .unwrap(),
        )
    }

    fn openai_chat_usage_chunk(&self) -> SseEvent {
        SseEvent::new(
            serde_json::to_string(&json!({
                "id": self.openai_chat_message_id(),
                "object": "chat.completion.chunk",
                "created": unix_timestamp_secs(),
                "model": self.model,
                "choices": [],
                "usage": responses_usage_to_chat_usage(self.responses_usage.as_ref())
            }))
            .unwrap(),
        )
    }

    fn openai_chat_message_id(&self) -> String {
        if self.message_id.starts_with("chatcmpl") {
            self.message_id.clone()
        } else if self.message_id.starts_with("resp_") {
            format!("chatcmpl_{}", self.message_id.trim_start_matches("resp_"))
        } else {
            format!("chatcmpl_{}", self.message_id)
        }
    }

    fn flush_openai_responses_to_chat_stream(&mut self) -> Vec<SseEvent> {
        let mut events = self.ensure_openai_chat_started();
        events.push(self.openai_chat_chunk(json!({}), Value::String("stop".to_owned())));
        if self.responses_usage.is_some() {
            events.push(self.openai_chat_usage_chunk());
        }
        events.push(SseEvent::new("[DONE]"));
        events
    }

    fn openai_responses_to_claude_stream(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let data = event.data.trim();
        if data == "[DONE]" {
            let events = self.finish_claude_message_stream("end_turn");
            self.sent_done = true;
            return events;
        }

        let Ok(parsed) = serde_json::from_str::<Value>(data) else {
            return vec![];
        };
        let event_type = parsed
            .get("type")
            .and_then(|value| value.as_str())
            .or(event.event.as_deref())
            .unwrap_or("");
        let mut events = Vec::new();

        match event_type {
            "response.created" | "response.in_progress" => {
                if let Some(response) = parsed.get("response") {
                    self.observe_responses_id_and_usage(response);
                }
                events.extend(self.ensure_claude_message_started());
            }
            "response.output_text.delta" => {
                events.extend(self.ensure_claude_message_started());
                let text = parsed
                    .get("delta")
                    .and_then(|value| value.as_str())
                    .unwrap_or("");
                if !text.is_empty() {
                    events.extend(self.emit_claude_text_delta(text));
                }
            }
            "response.output_item.added" => {
                events.extend(self.ensure_claude_message_started());
                if let Some(item) = parsed.get("item") {
                    if item.get("type").and_then(|value| value.as_str()) == Some("function_call") {
                        let output_index = parsed
                            .get("output_index")
                            .and_then(|value| value.as_u64())
                            .unwrap_or(self.content_block_index as u64)
                            as u32;
                        let id = item
                            .get("call_id")
                            .or_else(|| item.get("id"))
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        let name = item
                            .get("name")
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        let block_index =
                            self.ensure_claude_tool_block(&mut events, output_index, id, name);
                        if let Some(arguments) = item
                            .get("arguments")
                            .and_then(|value| value.as_str())
                            .filter(|arguments| !arguments.is_empty())
                        {
                            events.push(claude_event(
                                "content_block_delta",
                                json!({
                                    "type": "content_block_delta",
                                    "index": block_index,
                                    "delta": {
                                        "type": "input_json_delta",
                                        "partial_json": arguments
                                    }
                                }),
                            ));
                        }
                    }
                }
            }
            "response.function_call_arguments.delta" => {
                events.extend(self.ensure_claude_message_started());
                let output_index = parsed
                    .get("output_index")
                    .and_then(|value| value.as_u64())
                    .unwrap_or(0) as u32;
                let block_index = self.ensure_claude_tool_block(&mut events, output_index, "", "");
                let delta = parsed
                    .get("delta")
                    .and_then(|value| value.as_str())
                    .unwrap_or("");
                if !delta.is_empty() {
                    events.push(claude_event(
                        "content_block_delta",
                        json!({
                            "type": "content_block_delta",
                            "index": block_index,
                            "delta": {
                                "type": "input_json_delta",
                                "partial_json": delta
                            }
                        }),
                    ));
                }
            }
            "response.output_item.done" => {
                if let Some(item) = parsed.get("item") {
                    if item.get("type").and_then(|value| value.as_str()) == Some("function_call") {
                        events.extend(self.ensure_claude_message_started());
                        let output_index = parsed
                            .get("output_index")
                            .and_then(|value| value.as_u64())
                            .unwrap_or(0) as u32;
                        let id = item
                            .get("call_id")
                            .or_else(|| item.get("id"))
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        let name = item
                            .get("name")
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        self.ensure_claude_tool_block(&mut events, output_index, id, name);
                    }
                }
            }
            "response.completed" | "response.incomplete" | "response.failed" => {
                if let Some(response) = parsed.get("response") {
                    self.observe_responses_id_and_usage(response);
                }
                let stop_reason =
                    claude_stop_reason_from_responses_event(event_type, parsed.get("response"));
                events.extend(self.finish_claude_message_stream(stop_reason));
                self.sent_done = true;
            }
            _ => {}
        }

        events
    }

    fn flush_openai_responses_to_claude_stream(&mut self) -> Vec<SseEvent> {
        self.finish_claude_message_stream("end_turn")
    }

    fn gemini_to_claude_stream(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let data = event.data.trim();
        let Ok(chunk) = serde_json::from_str::<Value>(data) else {
            return vec![];
        };

        let mut events = self.ensure_claude_message_started();

        if let Some(usage) = chunk.get("usageMetadata") {
            self.responses_usage = Some(gemini_usage_to_responses_usage(usage));
        }

        let candidate = chunk
            .get("candidates")
            .and_then(|value| value.as_array())
            .and_then(|items| items.first());

        if let Some(parts) = candidate
            .and_then(|candidate| candidate.get("content"))
            .and_then(|content| content.get("parts"))
            .and_then(|parts| parts.as_array())
        {
            for part in parts {
                if let Some(text) = part.get("text").and_then(|value| value.as_str()) {
                    if !text.is_empty() {
                        events.extend(self.emit_claude_text_delta(text));
                    }
                }
                if let Some(function_call) = part.get("functionCall") {
                    let id = format!("call_{}", uuid::Uuid::new_v4());
                    let name = function_call
                        .get("name")
                        .and_then(|value| value.as_str())
                        .unwrap_or("");
                    let arguments = function_call
                        .get("args")
                        .cloned()
                        .unwrap_or_else(|| json!({}));
                    let arguments =
                        serde_json::to_string(&arguments).unwrap_or_else(|_| "{}".to_owned());
                    let block_index = self.ensure_claude_tool_block(
                        &mut events,
                        self.next_openai_tool_call_index,
                        &id,
                        name,
                    );
                    self.emitted_openai_tool_call = true;
                    self.next_openai_tool_call_index += 1;
                    if !arguments.is_empty() {
                        events.push(claude_event(
                            "content_block_delta",
                            json!({
                                "type": "content_block_delta",
                                "index": block_index,
                                "delta": {
                                    "type": "input_json_delta",
                                    "partial_json": arguments
                                }
                            }),
                        ));
                    }
                }
            }
        }

        if let Some(reason) = candidate
            .and_then(|candidate| candidate.get("finishReason"))
            .and_then(|value| value.as_str())
        {
            let stop_reason = gemini_finish_reason_to_claude_stop(reason);
            if self.emitted_openai_tool_call || !self.open_claude_tool_blocks.is_empty() {
                events.extend(self.finish_claude_message_stream("tool_use"));
            } else {
                events.extend(self.finish_claude_message_stream(stop_reason));
            }
            self.sent_done = true;
        }

        events
    }

    fn flush_gemini_to_claude_stream(&mut self) -> Vec<SseEvent> {
        self.finish_claude_message_stream("end_turn")
    }

    fn flush_claude_to_openai(&mut self) -> Vec<SseEvent> {
        let mut events = Vec::new();
        if !self.sent_start {
            events.push(SseEvent::new(
                serde_json::to_string(&json!({
                    "id": self.message_id,
                    "object": "chat.completion.chunk",
                    "created": unix_timestamp_secs(),
                    "model": self.model,
                    "choices": [{"index": 0, "delta": {"role": "assistant"}, "finish_reason": null}]
                }))
                .unwrap(),
            ));
        }
        events.push(SseEvent::new(
            serde_json::to_string(&json!({
                "id": self.message_id,
                "object": "chat.completion.chunk",
                "created": unix_timestamp_secs(),
                "model": self.model,
                "choices": [{"index": 0, "delta": {}, "finish_reason": "stop"}]
            }))
            .unwrap(),
        ));
        if self.responses_usage.is_some() {
            events.push(self.openai_chat_usage_chunk());
        }
        events.push(SseEvent::new("[DONE]"));
        events
    }

    fn flush_openai_to_gemini(&mut self) -> Vec<SseEvent> {
        let finish_reason = self
            .pending_gemini_finish_reason
            .take()
            .unwrap_or_else(|| "STOP".to_owned());
        let mut events = self.emit_pending_gemini_tool_calls();
        events.push(self.gemini_finish_chunk(finish_reason));
        events
    }

    fn flush_gemini_to_openai(&mut self) -> Vec<SseEvent> {
        let mut events = Vec::new();
        if !self.sent_start {
            events.push(SseEvent::new(
                serde_json::to_string(&json!({
                    "id": self.message_id,
                    "object": "chat.completion.chunk",
                    "created": unix_timestamp_secs(),
                    "model": self.model,
                    "choices": [{"index": 0, "delta": {"role": "assistant"}, "finish_reason": null}]
                }))
                .unwrap(),
            ));
        }
        events.push(SseEvent::new(
            serde_json::to_string(&json!({
                "id": self.message_id,
                "object": "chat.completion.chunk",
                "created": unix_timestamp_secs(),
                "model": self.model,
                "choices": [{"index": 0, "delta": {}, "finish_reason": "stop"}]
            }))
            .unwrap(),
        ));
        if self.responses_usage.is_some() {
            events.push(self.openai_chat_usage_chunk());
        }
        events.push(SseEvent::new("[DONE]"));
        events
    }

    fn ensure_claude_text_block(&mut self, events: &mut Vec<SseEvent>) -> u32 {
        if let Some(active) = self.active_claude_block {
            if active.kind == ActiveClaudeBlockKind::Text {
                return active.index;
            }
            self.stop_active_claude_block(events);
        }
        self.stop_open_claude_tool_blocks(events);

        let index = self.content_block_index;
        self.content_block_index += 1;
        self.active_claude_block = Some(ActiveClaudeBlock {
            index,
            kind: ActiveClaudeBlockKind::Text,
        });
        events.push(
            SseEvent::new(
                serde_json::to_string(&json!({
                    "type": "content_block_start",
                    "index": index,
                    "content_block": {"type": "text", "text": ""}
                }))
                .unwrap(),
            )
            .with_event("content_block_start"),
        );
        index
    }

    fn ensure_claude_message_started(&mut self) -> Vec<SseEvent> {
        if self.sent_start {
            return vec![];
        }
        self.sent_start = true;
        vec![claude_event(
            "message_start",
            json!({
                "type": "message_start",
                "message": {
                    "id": self.claude_message_id(),
                    "type": "message",
                    "role": "assistant",
                    "content": [],
                    "model": self.model,
                    "stop_reason": null,
                    "stop_sequence": null,
                    "usage": self.claude_usage_snapshot(true)
                }
            }),
        )]
    }

    fn emit_claude_text_delta(&mut self, text: &str) -> Vec<SseEvent> {
        let mut events = Vec::new();
        let block_index = self.ensure_claude_text_block(&mut events);
        events.push(claude_event(
            "content_block_delta",
            json!({
                "type": "content_block_delta",
                "index": block_index,
                "delta": {
                    "type": "text_delta",
                    "text": text
                }
            }),
        ));
        events
    }

    fn finish_claude_message_stream(&mut self, stop_reason: &str) -> Vec<SseEvent> {
        let mut events = self.ensure_claude_message_started();
        self.stop_active_claude_block(&mut events);
        self.stop_open_claude_tool_blocks(&mut events);
        events.push(claude_event(
            "message_delta",
            json!({
                "type": "message_delta",
                "delta": {
                    "stop_reason": stop_reason,
                    "stop_sequence": null
                },
                "usage": self.claude_usage_snapshot(false)
            }),
        ));
        events.push(claude_event(
            "message_stop",
            json!({"type": "message_stop"}),
        ));
        events
    }

    fn claude_message_id(&self) -> String {
        if self.message_id.starts_with("msg_") {
            self.message_id.clone()
        } else if self.message_id.starts_with("resp_") {
            format!("msg_{}", self.message_id.trim_start_matches("resp_"))
        } else if self.message_id.starts_with("chatcmpl-") {
            format!("msg_{}", self.message_id.trim_start_matches("chatcmpl-"))
        } else {
            format!("msg_{}", self.message_id)
        }
    }

    fn claude_usage_snapshot(&self, include_input: bool) -> Value {
        let input = self
            .responses_usage
            .as_ref()
            .and_then(|usage| usage.get("input_tokens"))
            .and_then(|value| value.as_u64())
            .unwrap_or(0);
        let output = self
            .responses_usage
            .as_ref()
            .and_then(|usage| usage.get("output_tokens"))
            .and_then(|value| value.as_u64())
            .unwrap_or(0);
        if include_input {
            json!({"input_tokens": input, "output_tokens": 0})
        } else {
            json!({"output_tokens": output})
        }
    }

    fn observe_responses_id_and_usage(&mut self, response: &Value) {
        if let Some(id) = response.get("id").and_then(|value| value.as_str()) {
            self.message_id = id.to_owned();
        }
        if let Some(usage) = response.get("usage") {
            self.merge_responses_usage(usage);
        }
    }

    fn observe_responses_id_model_and_usage(&mut self, response: &Value) {
        self.observe_responses_id_and_usage(response);
        if let Some(model) = response.get("model").and_then(|value| value.as_str()) {
            self.model = model.to_owned();
        }
    }

    fn ensure_claude_tool_block(
        &mut self,
        events: &mut Vec<SseEvent>,
        tool_call_index: u32,
        id: &str,
        name: &str,
    ) -> u32 {
        if let Some(active) = self.active_claude_block {
            if active.kind == ActiveClaudeBlockKind::Tool(tool_call_index) {
                return active.index;
            }
            if active.kind == ActiveClaudeBlockKind::Text {
                self.stop_active_claude_block(events);
            }
        }

        if let Some(index) = self.openai_tool_blocks.get(&tool_call_index).copied() {
            self.active_claude_block = Some(ActiveClaudeBlock {
                index,
                kind: ActiveClaudeBlockKind::Tool(tool_call_index),
            });
            return index;
        }

        let index = self.content_block_index;
        self.content_block_index += 1;
        self.openai_tool_blocks.insert(tool_call_index, index);
        self.open_claude_tool_blocks.push(index);
        self.active_claude_block = Some(ActiveClaudeBlock {
            index,
            kind: ActiveClaudeBlockKind::Tool(tool_call_index),
        });
        events.push(
            SseEvent::new(
                serde_json::to_string(&json!({
                    "type": "content_block_start",
                    "index": index,
                    "content_block": {
                        "type": "tool_use",
                        "id": id,
                        "name": name,
                        "input": {}
                    }
                }))
                .unwrap(),
            )
            .with_event("content_block_start"),
        );
        index
    }

    fn stop_active_claude_block(&mut self, events: &mut Vec<SseEvent>) {
        let Some(active) = self.active_claude_block.take() else {
            return;
        };
        if matches!(active.kind, ActiveClaudeBlockKind::Tool(_)) {
            return;
        }
        events.push(
            SseEvent::new(
                serde_json::to_string(&json!({
                    "type": "content_block_stop",
                    "index": active.index
                }))
                .unwrap(),
            )
            .with_event("content_block_stop"),
        );
    }

    fn stop_open_claude_tool_blocks(&mut self, events: &mut Vec<SseEvent>) {
        self.active_claude_block = None;
        for index in self.open_claude_tool_blocks.drain(..) {
            events.push(
                SseEvent::new(
                    serde_json::to_string(&json!({
                        "type": "content_block_stop",
                        "index": index
                    }))
                    .unwrap(),
                )
                .with_event("content_block_stop"),
            );
        }
    }

    fn openai_tool_call_index_for_claude_block(&mut self, block_index: u32) -> u32 {
        if let Some(index) = self.claude_tool_blocks.get(&block_index).copied() {
            return index;
        }
        let index = self.next_openai_tool_call_index;
        self.next_openai_tool_call_index += 1;
        self.claude_tool_blocks.insert(block_index, index);
        index
    }

    fn openai_to_gemini_stream(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let data = event.data.trim();
        if data == "[DONE]" {
            let events = self.flush_openai_to_gemini();
            self.sent_done = true;
            return events;
        }
        let Ok(chunk) = serde_json::from_str::<Value>(data) else {
            return vec![];
        };
        if let Some(usage) = chunk.get("usage") {
            self.responses_usage = Some(chat_usage_to_responses_usage(usage));
        }
        let choices = chunk.get("choices").and_then(|c| c.as_array());
        let Some(choices) = choices else {
            return vec![];
        };

        let mut events = Vec::new();
        for choice in choices {
            let delta = choice.get("delta");
            let finish_reason = choice.get("finish_reason").and_then(|f| f.as_str());
            if let Some(delta) = delta {
                if let Some(content) = delta.get("content").and_then(|c| c.as_str()) {
                    if !content.is_empty() {
                        events.push(self.gemini_part_chunk(json!({"text": content})));
                    }
                }

                if let Some(tool_calls) = delta.get("tool_calls").and_then(|t| t.as_array()) {
                    for tc in tool_calls {
                        self.accumulate_chat_tool_call_for_gemini(tc);
                    }
                }
            }

            if finish_reason.is_some() && finish_reason != Some("null") {
                events.extend(self.emit_pending_gemini_tool_calls());
                self.pending_gemini_finish_reason = Some(
                    openai_finish_reason_to_gemini_finish_reason(finish_reason.unwrap()).to_owned(),
                );
            }
        }
        events
    }

    fn openai_responses_to_gemini_stream(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let data = event.data.trim();
        if data == "[DONE]" {
            let events = self.flush_openai_responses_to_gemini_stream();
            self.sent_done = true;
            return events;
        }

        let Ok(parsed) = serde_json::from_str::<Value>(data) else {
            return vec![];
        };
        let event_type = parsed
            .get("type")
            .and_then(|value| value.as_str())
            .or(event.event.as_deref())
            .unwrap_or("");
        let mut events = Vec::new();

        match event_type {
            "response.created" | "response.in_progress" => {
                if let Some(response) = parsed.get("response") {
                    self.observe_responses_id_model_and_usage(response);
                }
            }
            "response.output_text.delta" => {
                let text = parsed
                    .get("delta")
                    .and_then(|value| value.as_str())
                    .unwrap_or("");
                if !text.is_empty() {
                    events.push(self.gemini_part_chunk(json!({"text": text})));
                }
            }
            "response.output_item.added" => {
                if let Some(item) = parsed.get("item") {
                    if item.get("type").and_then(|value| value.as_str()) == Some("function_call") {
                        let output_index = parsed
                            .get("output_index")
                            .and_then(|value| value.as_u64())
                            .unwrap_or(self.next_openai_tool_call_index as u64)
                            as u32;
                        let name = item
                            .get("name")
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        let arguments = item
                            .get("arguments")
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        let tool_call = self.gemini_tool_calls.entry(output_index).or_default();
                        if !name.is_empty() {
                            tool_call.name = name.to_owned();
                        }
                        tool_call.arguments.push_str(arguments);
                    }
                }
            }
            "response.function_call_arguments.delta" => {
                let output_index = parsed
                    .get("output_index")
                    .and_then(|value| value.as_u64())
                    .unwrap_or(0) as u32;
                let delta = parsed
                    .get("delta")
                    .and_then(|value| value.as_str())
                    .unwrap_or("");
                if !delta.is_empty() {
                    self.gemini_tool_calls
                        .entry(output_index)
                        .or_default()
                        .arguments
                        .push_str(delta);
                }
            }
            "response.output_item.done" => {
                if let Some(item) = parsed.get("item") {
                    if item.get("type").and_then(|value| value.as_str()) == Some("function_call") {
                        let output_index = parsed
                            .get("output_index")
                            .and_then(|value| value.as_u64())
                            .unwrap_or(0) as u32;
                        let name = item
                            .get("name")
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        let arguments = item
                            .get("arguments")
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        let tool_call = self.gemini_tool_calls.entry(output_index).or_default();
                        if !name.is_empty() {
                            tool_call.name = name.to_owned();
                        }
                        if !arguments.is_empty() {
                            tool_call.arguments = arguments.to_owned();
                        }
                        events.extend(self.emit_gemini_tool_call(output_index));
                    }
                }
            }
            "response.completed" | "response.incomplete" | "response.failed" => {
                if let Some(response) = parsed.get("response") {
                    self.observe_responses_id_model_and_usage(response);
                }
                events.extend(self.emit_pending_gemini_tool_calls());
                let finish_reason =
                    gemini_finish_reason_from_responses_event(event_type, parsed.get("response"));
                events.push(self.gemini_finish_chunk(finish_reason.to_owned()));
                self.sent_done = true;
            }
            _ => {}
        }

        events
    }

    fn flush_openai_responses_to_gemini_stream(&mut self) -> Vec<SseEvent> {
        let mut events = self.emit_pending_gemini_tool_calls();
        let finish_reason = self
            .pending_gemini_finish_reason
            .take()
            .unwrap_or_else(|| "STOP".to_owned());
        events.push(self.gemini_finish_chunk(finish_reason));
        events
    }

    fn claude_to_gemini_stream(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let event_type = event.event.as_deref().unwrap_or("");
        let data = event.data.trim();

        let mut events = Vec::new();
        match event_type {
            "message_start" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                if let Some(message_id) = parsed
                    .get("message")
                    .and_then(|message| message.get("id"))
                    .and_then(|value| value.as_str())
                {
                    self.message_id = message_id.to_owned();
                }
                if let Some(model) = parsed
                    .get("message")
                    .and_then(|message| message.get("model"))
                    .and_then(|value| value.as_str())
                {
                    self.model = model.to_owned();
                }
                self.responses_usage = parsed
                    .get("message")
                    .and_then(|message| message.get("usage"))
                    .cloned();
            }
            "content_block_start" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                let block_index = parsed.get("index").and_then(|v| v.as_u64()).unwrap_or(0) as u32;
                let Some(content_block) = parsed.get("content_block") else {
                    return vec![];
                };
                if content_block.get("type").and_then(|value| value.as_str()) == Some("tool_use") {
                    let name = content_block
                        .get("name")
                        .and_then(|value| value.as_str())
                        .unwrap_or("");
                    let input = content_block
                        .get("input")
                        .filter(|input| !input.as_object().is_some_and(|object| object.is_empty()))
                        .and_then(|input| serde_json::to_string(input).ok())
                        .unwrap_or_default();
                    let tool_call = self.gemini_tool_calls.entry(block_index).or_default();
                    tool_call.name = name.to_owned();
                    tool_call.arguments.push_str(&input);
                }
            }
            "content_block_delta" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                let block_index = parsed.get("index").and_then(|v| v.as_u64()).unwrap_or(0) as u32;
                let Some(delta) = parsed.get("delta") else {
                    return vec![];
                };
                match delta.get("type").and_then(|value| value.as_str()) {
                    Some("text_delta") => {
                        let text = delta
                            .get("text")
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        if !text.is_empty() {
                            events.push(self.gemini_part_chunk(json!({"text": text})));
                        }
                    }
                    Some("input_json_delta") => {
                        let partial_json = delta
                            .get("partial_json")
                            .and_then(|value| value.as_str())
                            .unwrap_or("");
                        if !partial_json.is_empty() {
                            self.gemini_tool_calls
                                .entry(block_index)
                                .or_default()
                                .arguments
                                .push_str(partial_json);
                        }
                    }
                    _ => {}
                }
            }
            "content_block_stop" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                let block_index = parsed.get("index").and_then(|v| v.as_u64()).unwrap_or(0) as u32;
                events.extend(self.emit_gemini_tool_call(block_index));
            }
            "message_delta" => {
                let Ok(parsed) = serde_json::from_str::<Value>(data) else {
                    return vec![];
                };
                if let Some(usage) = parsed.get("usage") {
                    self.merge_responses_usage(usage);
                }
                self.pending_gemini_finish_reason = Some(
                    parsed
                        .get("delta")
                        .and_then(|delta| delta.get("stop_reason"))
                        .and_then(|value| value.as_str())
                        .map(claude_stop_reason_to_gemini_finish_reason)
                        .unwrap_or("STOP")
                        .to_owned(),
                );
            }
            "message_stop" => {
                events.extend(self.emit_pending_gemini_tool_calls());
                let finish_reason = self
                    .pending_gemini_finish_reason
                    .take()
                    .unwrap_or_else(|| "STOP".to_owned());
                events.push(self.gemini_finish_chunk(finish_reason));
                self.sent_done = true;
            }
            "ping" => {}
            _ => {}
        }

        events
    }

    fn flush_claude_to_gemini_stream(&mut self) -> Vec<SseEvent> {
        let mut events = self.emit_pending_gemini_tool_calls();
        let finish_reason = self
            .pending_gemini_finish_reason
            .take()
            .unwrap_or_else(|| "STOP".to_owned());
        events.push(self.gemini_finish_chunk(finish_reason));
        events
    }

    fn gemini_part_chunk(&self, part: Value) -> SseEvent {
        SseEvent::new(
            serde_json::to_string(&json!({
                "candidates": [{
                    "content": {"parts": [part], "role": "model"},
                    "index": 0
                }]
            }))
            .unwrap(),
        )
    }

    fn gemini_finish_chunk(&self, finish_reason: String) -> SseEvent {
        SseEvent::new(
            serde_json::to_string(&json!({
                "candidates": [{
                    "content": {"parts": [], "role": "model"},
                    "finishReason": finish_reason,
                    "index": 0
                }],
                "usageMetadata": responses_usage_to_gemini_usage(self.responses_usage.as_ref())
            }))
            .unwrap(),
        )
    }

    fn accumulate_chat_tool_call_for_gemini(&mut self, tool_call: &Value) {
        let index = tool_call
            .get("index")
            .and_then(|value| value.as_u64())
            .unwrap_or(self.next_openai_tool_call_index as u64) as u32;
        let function = tool_call.get("function").unwrap_or(&Value::Null);
        let name = function
            .get("name")
            .and_then(|value| value.as_str())
            .unwrap_or("");
        let arguments = function
            .get("arguments")
            .and_then(|value| value.as_str())
            .unwrap_or("");
        let block = self.gemini_tool_calls.entry(index).or_default();
        if !name.is_empty() {
            block.name = name.to_owned();
        }
        block.arguments.push_str(arguments);
    }

    fn emit_pending_gemini_tool_calls(&mut self) -> Vec<SseEvent> {
        let mut indexes = self.gemini_tool_calls.keys().copied().collect::<Vec<_>>();
        indexes.sort_unstable();
        indexes
            .into_iter()
            .flat_map(|index| self.emit_gemini_tool_call(index))
            .collect()
    }

    fn emit_gemini_tool_call(&mut self, index: u32) -> Vec<SseEvent> {
        let Some(tool_call) = self.gemini_tool_calls.remove(&index) else {
            return vec![];
        };
        if tool_call.name.is_empty() {
            return vec![];
        }
        let args = parse_json_object_or_empty(&tool_call.arguments);
        vec![self.gemini_part_chunk(json!({
            "functionCall": {
                "name": tool_call.name,
                "args": args
            }
        }))]
    }

    fn gemini_to_openai_stream(&mut self, event: SseEvent) -> Vec<SseEvent> {
        let data = event.data.trim();
        let Ok(chunk) = serde_json::from_str::<Value>(data) else {
            return vec![];
        };
        if let Some(usage) = chunk.get("usageMetadata") {
            self.responses_usage = Some(gemini_usage_to_responses_usage(usage));
        }

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
            let mut tool_call_idx = 0u32;

            for part in parts {
                if let Some(text) = part.get("text").and_then(|t| t.as_str()) {
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

                        events.push(SseEvent::new(
                            serde_json::to_string(&json!({
                                "id": self.message_id,
                                "object": "chat.completion.chunk",
                                "created": unix_timestamp_secs(),
                                "model": self.model,
                                "choices": [{"index": 0, "delta": {"content": text}, "finish_reason": null}]
                            }))
                            .unwrap(),
                        ));
                    }
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
                        "choices": [{"index": 0, "delta": {"tool_calls": [{"index": tool_call_idx, "id": format!("call_{}", uuid::Uuid::new_v4()), "type": "function", "function": {"name": name, "arguments": arguments}}]}, "finish_reason": null}]
                    })).unwrap()));
                    self.emitted_openai_tool_call = true;
                    tool_call_idx += 1;
                }
            }
        }

        if let Some(reason) = finish_reason {
            let openai_finish = match reason {
                _ if self.emitted_openai_tool_call => "tool_calls",
                "STOP" => "stop",
                "MAX_TOKENS" => "length",
                "SAFETY"
                | "RECITATION"
                | "BLOCKLIST"
                | "PROHIBITED_CONTENT"
                | "SPII"
                | "MALFORMED_FUNCTION_CALL"
                | "UNEXPECTED_TOOL_CALL"
                | "TOO_MANY_TOOL_CALLS"
                | "MISSING_THOUGHT_SIGNATURE"
                | "MALFORMED_RESPONSE" => "content_filter",
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
            events.push(SseEvent::new(
                serde_json::to_string(&json!({
                    "id": self.message_id,
                    "object": "chat.completion.chunk",
                    "created": unix_timestamp_secs(),
                    "model": self.model,
                    "choices": [{"index": 0, "delta": {}, "finish_reason": openai_finish}]
                }))
                .unwrap(),
            ));
            if self.responses_usage.is_some() {
                events.push(self.openai_chat_usage_chunk());
            }
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

fn default_surface_for_protocol(protocol: Protocol) -> ApiSurface {
    match protocol {
        Protocol::Openai => ApiSurface::OpenAiChatCompletions,
        Protocol::Anthropic => ApiSurface::AnthropicMessages,
        Protocol::Google => ApiSurface::GeminiGenerateContent,
    }
}

fn gemini_usage_to_responses_usage(usage: &Value) -> Value {
    let input = usage
        .get("promptTokenCount")
        .and_then(|value| value.as_u64())
        .unwrap_or(0);
    let output = usage
        .get("candidatesTokenCount")
        .and_then(|value| value.as_u64())
        .unwrap_or(0);
    let total = usage
        .get("totalTokenCount")
        .and_then(|value| value.as_u64())
        .unwrap_or(input + output);
    json!({
        "input_tokens": input,
        "output_tokens": output,
        "total_tokens": total
    })
}

fn chat_usage_to_responses_usage(usage: &Value) -> Value {
    let input = usage
        .get("prompt_tokens")
        .and_then(|value| value.as_u64())
        .unwrap_or(0);
    let output = usage
        .get("completion_tokens")
        .and_then(|value| value.as_u64())
        .unwrap_or(0);
    let total = usage
        .get("total_tokens")
        .and_then(|value| value.as_u64())
        .unwrap_or(input + output);
    json!({
        "input_tokens": input,
        "output_tokens": output,
        "total_tokens": total
    })
}

fn responses_usage_to_chat_usage(usage: Option<&Value>) -> Value {
    let prompt = usage
        .and_then(|usage| usage.get("input_tokens"))
        .and_then(|value| value.as_u64())
        .unwrap_or(0);
    let completion = usage
        .and_then(|usage| usage.get("output_tokens"))
        .and_then(|value| value.as_u64())
        .unwrap_or(0);
    let total = usage
        .and_then(|usage| usage.get("total_tokens"))
        .and_then(|value| value.as_u64())
        .unwrap_or(prompt + completion);
    json!({
        "prompt_tokens": prompt,
        "completion_tokens": completion,
        "total_tokens": total
    })
}

fn responses_usage_to_gemini_usage(usage: Option<&Value>) -> Value {
    let prompt = usage
        .and_then(|usage| usage.get("input_tokens"))
        .and_then(|value| value.as_u64())
        .unwrap_or(0);
    let candidates = usage
        .and_then(|usage| usage.get("output_tokens"))
        .and_then(|value| value.as_u64())
        .unwrap_or(0);
    let total = usage
        .and_then(|usage| usage.get("total_tokens"))
        .and_then(|value| value.as_u64())
        .unwrap_or(prompt + candidates);
    json!({
        "promptTokenCount": prompt,
        "candidatesTokenCount": candidates,
        "totalTokenCount": total
    })
}

fn chat_finish_reason_to_responses_stop(reason: &str) -> &'static str {
    match reason {
        "length" => "max_tokens",
        "content_filter" => "refusal",
        _ => "end_turn",
    }
}

fn gemini_finish_reason_to_responses_stop(reason: &str) -> String {
    match reason {
        "MAX_TOKENS" => "max_tokens",
        "SAFETY"
        | "RECITATION"
        | "BLOCKLIST"
        | "PROHIBITED_CONTENT"
        | "SPII"
        | "MALFORMED_FUNCTION_CALL"
        | "UNEXPECTED_TOOL_CALL"
        | "TOO_MANY_TOOL_CALLS"
        | "MISSING_THOUGHT_SIGNATURE"
        | "MALFORMED_RESPONSE" => "refusal",
        _ => "end_turn",
    }
    .to_owned()
}

fn openai_finish_reason_to_gemini_finish_reason(reason: &str) -> &'static str {
    match reason {
        "length" => "MAX_TOKENS",
        "content_filter" | "refusal" => "SAFETY",
        _ => "STOP",
    }
}

fn claude_stop_reason_to_gemini_finish_reason(reason: &str) -> &'static str {
    match reason {
        "max_tokens" | "model_context_window_exceeded" => "MAX_TOKENS",
        "refusal" => "SAFETY",
        _ => "STOP",
    }
}

fn gemini_finish_reason_from_responses_event(
    event_type: &str,
    response: Option<&Value>,
) -> &'static str {
    if event_type == "response.failed" {
        return "SAFETY";
    }
    let status = response
        .and_then(|value| value.get("status"))
        .and_then(|value| value.as_str());
    if status == Some("failed") {
        return "SAFETY";
    }
    let incomplete_reason = response
        .and_then(|value| value.get("incomplete_details"))
        .and_then(|value| value.get("reason"))
        .and_then(|value| value.as_str());
    match incomplete_reason {
        Some("max_output_tokens") => "MAX_TOKENS",
        Some("content_filter") => "SAFETY",
        _ => "STOP",
    }
}

fn parse_json_object_or_empty(raw: &str) -> Value {
    if raw.trim().is_empty() {
        return json!({});
    }
    match serde_json::from_str::<Value>(raw) {
        Ok(value) if value.is_object() => value,
        _ => json!({}),
    }
}

fn chat_finish_reason_from_responses_event(
    event_type: &str,
    response: Option<&Value>,
) -> &'static str {
    if event_type == "response.failed" {
        return "content_filter";
    }
    let output_has_function_call = response
        .and_then(|value| value.get("output"))
        .and_then(|value| value.as_array())
        .map(|items| {
            items.iter().any(|item| {
                item.get("type").and_then(|value| value.as_str()) == Some("function_call")
            })
        })
        .unwrap_or(false);
    if output_has_function_call {
        return "tool_calls";
    }
    let status = response
        .and_then(|value| value.get("status"))
        .and_then(|value| value.as_str());
    if status == Some("failed") {
        return "content_filter";
    }
    let incomplete_reason = response
        .and_then(|value| value.get("incomplete_details"))
        .and_then(|value| value.get("reason"))
        .and_then(|value| value.as_str());
    match incomplete_reason {
        Some("max_output_tokens") => "length",
        Some("content_filter") => "content_filter",
        _ => "stop",
    }
}

fn gemini_finish_reason_to_claude_stop(reason: &str) -> &'static str {
    match reason {
        "MAX_TOKENS" => "max_tokens",
        "SAFETY"
        | "RECITATION"
        | "BLOCKLIST"
        | "PROHIBITED_CONTENT"
        | "SPII"
        | "MALFORMED_FUNCTION_CALL"
        | "UNEXPECTED_TOOL_CALL"
        | "TOO_MANY_TOOL_CALLS"
        | "MISSING_THOUGHT_SIGNATURE"
        | "MALFORMED_RESPONSE" => "refusal",
        _ => "end_turn",
    }
}

fn claude_stop_reason_from_responses_event(
    event_type: &str,
    response: Option<&Value>,
) -> &'static str {
    if event_type == "response.failed" {
        return "refusal";
    }
    let status = response
        .and_then(|value| value.get("status"))
        .and_then(|value| value.as_str());
    if status == Some("failed") {
        return "refusal";
    }
    let incomplete_reason = response
        .and_then(|value| value.get("incomplete_details"))
        .and_then(|value| value.get("reason"))
        .and_then(|value| value.as_str());
    match incomplete_reason {
        Some("max_output_tokens") => "max_tokens",
        Some("content_filter") => "refusal",
        _ => "end_turn",
    }
}

fn claude_event(event_type: &str, payload: Value) -> SseEvent {
    SseEvent::new(serde_json::to_string(&payload).unwrap()).with_event(event_type)
}

pub fn map_upstream_path(
    client_path: &str,
    client_base_path: &str,
    upstream_protocol: Protocol,
    model: Option<&str>,
    is_streaming: bool,
) -> String {
    let stripped = client_path
        .strip_prefix(client_base_path)
        .unwrap_or(client_path);

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
        let path = map_upstream_path(
            "/v1/chat/completions",
            "/v1",
            Protocol::Anthropic,
            None,
            false,
        );
        assert_eq!(path, "/v1/messages");
    }

    #[test]
    fn test_map_upstream_path_openai_to_google() {
        let path = map_upstream_path(
            "/v1/chat/completions",
            "/v1",
            Protocol::Google,
            Some("gemini-pro"),
            false,
        );
        assert_eq!(path, "/v1/models/gemini-pro:generateContent");
    }

    #[test]
    fn test_map_upstream_path_openai_to_google_streaming() {
        let path = map_upstream_path(
            "/v1/chat/completions",
            "/v1",
            Protocol::Google,
            Some("gemini-pro"),
            true,
        );
        assert_eq!(path, "/v1/models/gemini-pro:streamGenerateContent?alt=sse");
    }

    #[test]
    fn test_map_upstream_path_same_protocol() {
        let path = map_upstream_path("/v1/chat/completions", "/v1", Protocol::Openai, None, false);
        assert_eq!(path, "/chat/completions");
    }

    #[test]
    fn claude_tool_use_stream_emits_openai_tool_call_metadata_and_arguments() {
        let mut state = StreamTransformState::new(
            Protocol::Anthropic,
            Protocol::Openai,
            "claude-sonnet-4-20250514",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_start",
                        "message": {
                            "id": "msg_abc",
                            "type": "message",
                            "role": "assistant",
                            "model": "claude-sonnet-4-20250514",
                            "content": [],
                            "stop_reason": null,
                            "usage": {"input_tokens": 10, "output_tokens": 0}
                        }
                    })
                    .to_string(),
                )
                .with_event("message_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_start",
                        "index": 0,
                        "content_block": {
                            "type": "tool_use",
                            "id": "toolu_123",
                            "name": "get_weather",
                            "input": {}
                        }
                    })
                    .to_string(),
                )
                .with_event("content_block_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_delta",
                        "index": 0,
                        "delta": {
                            "type": "input_json_delta",
                            "partial_json": "{\"city\":\"NYC\"}"
                        }
                    })
                    .to_string(),
                )
                .with_event("content_block_delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_delta",
                        "delta": {"stop_reason": "tool_use", "stop_sequence": null},
                        "usage": {"output_tokens": 4}
                    })
                    .to_string(),
                )
                .with_event("message_delta"),
            ),
        );
        outputs.extend(state.transform(
            SseEvent::new(json!({"type": "message_stop"}).to_string()).with_event("message_stop"),
        ));

        let parsed = parse_json_events(&outputs);
        assert_eq!(parsed[0]["choices"][0]["delta"]["role"], "assistant");

        let tool_start = parsed
            .iter()
            .find(|event| {
                event["choices"][0]["delta"]
                    .get("tool_calls")
                    .and_then(|value| value.as_array())
                    .and_then(|calls| calls.first())
                    .and_then(|call| call.get("id"))
                    .is_some()
            })
            .expect("tool call start delta");
        let tool_call = &tool_start["choices"][0]["delta"]["tool_calls"][0];
        assert_eq!(tool_call["index"], 0);
        assert_eq!(tool_call["id"], "toolu_123");
        assert_eq!(tool_call["type"], "function");
        assert_eq!(tool_call["function"]["name"], "get_weather");
        assert_eq!(tool_call["function"]["arguments"], "");

        let tool_args = parsed
            .iter()
            .find(|event| {
                event["choices"][0]["delta"]
                    .get("tool_calls")
                    .and_then(|value| value.as_array())
                    .and_then(|calls| calls.first())
                    .and_then(|call| call.get("function"))
                    .and_then(|function| function.get("arguments"))
                    .and_then(|arguments| arguments.as_str())
                    == Some("{\"city\":\"NYC\"}")
            })
            .expect("tool call argument delta");
        assert_eq!(
            tool_args["choices"][0]["delta"]["tool_calls"][0]["index"],
            0
        );

        assert!(parsed
            .iter()
            .any(|event| { event["choices"][0]["finish_reason"].as_str() == Some("tool_calls") }));
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
    }

    #[test]
    fn claude_stream_to_openai_chat_emits_final_usage_chunk_before_done() {
        let mut state = StreamTransformState::new(
            Protocol::Anthropic,
            Protocol::Openai,
            "claude-sonnet-4-20250514",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_start",
                        "message": {
                            "id": "msg_usage",
                            "type": "message",
                            "role": "assistant",
                            "model": "claude-sonnet-4-20250514",
                            "content": [],
                            "stop_reason": null,
                            "usage": {"input_tokens": 8, "output_tokens": 0}
                        }
                    })
                    .to_string(),
                )
                .with_event("message_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_delta",
                        "index": 0,
                        "delta": {"type": "text_delta", "text": "ok"}
                    })
                    .to_string(),
                )
                .with_event("content_block_delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_delta",
                        "delta": {"stop_reason": "end_turn", "stop_sequence": null},
                        "usage": {"output_tokens": 3}
                    })
                    .to_string(),
                )
                .with_event("message_delta"),
            ),
        );
        outputs.extend(state.transform(
            SseEvent::new(json!({"type": "message_stop"}).to_string()).with_event("message_stop"),
        ));

        let parsed = parse_json_events(&outputs);
        let usage_chunk_index = parsed
            .iter()
            .position(|event| {
                event["choices"]
                    .as_array()
                    .is_some_and(|choices| choices.is_empty())
            })
            .expect("final usage chunk");
        assert_eq!(parsed[usage_chunk_index]["usage"]["prompt_tokens"], 8);
        assert_eq!(parsed[usage_chunk_index]["usage"]["completion_tokens"], 3);
        assert_eq!(parsed[usage_chunk_index]["usage"]["total_tokens"], 11);
        assert!(
            usage_chunk_index + 1 < outputs.len(),
            "usage chunk must be emitted before DONE"
        );
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
    }

    #[test]
    fn claude_stream_to_openai_chat_preserves_interleaved_text_tool_text_and_usage() {
        let mut state = StreamTransformState::new(
            Protocol::Anthropic,
            Protocol::Openai,
            "claude-sonnet-4-20250514",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_start",
                        "message": {
                            "id": "msg_chat_interleaved",
                            "type": "message",
                            "role": "assistant",
                            "model": "claude-sonnet-4-20250514",
                            "content": [],
                            "stop_reason": null,
                            "usage": {"input_tokens": 14, "output_tokens": 0}
                        }
                    })
                    .to_string(),
                )
                .with_event("message_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_delta",
                        "index": 0,
                        "delta": {"type": "text_delta", "text": "Before "}
                    })
                    .to_string(),
                )
                .with_event("content_block_delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_start",
                        "index": 1,
                        "content_block": {
                            "type": "tool_use",
                            "id": "toolu_abc",
                            "name": "local_shell",
                            "input": {}
                        }
                    })
                    .to_string(),
                )
                .with_event("content_block_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_delta",
                        "index": 1,
                        "delta": {"type": "input_json_delta", "partial_json": "{\"command\":[\"pwd\"]}"}
                    })
                    .to_string(),
                )
                .with_event("content_block_delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_delta",
                        "index": 2,
                        "delta": {"type": "text_delta", "text": "after"}
                    })
                    .to_string(),
                )
                .with_event("content_block_delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_delta",
                        "delta": {"stop_reason": "tool_use", "stop_sequence": null},
                        "usage": {"output_tokens": 6}
                    })
                    .to_string(),
                )
                .with_event("message_delta"),
            ),
        );
        outputs.extend(state.transform(
            SseEvent::new(json!({"type": "message_stop"}).to_string()).with_event("message_stop"),
        ));

        let parsed = parse_json_events(&outputs);
        let text_before = parsed
            .iter()
            .position(|event| event["choices"][0]["delta"]["content"].as_str() == Some("Before "))
            .expect("text before");
        let tool_start = parsed
            .iter()
            .position(|event| {
                event["choices"][0]["delta"]
                    .get("tool_calls")
                    .and_then(|value| value.as_array())
                    .and_then(|calls| calls.first())
                    .and_then(|call| call.get("id"))
                    .is_some()
            })
            .expect("tool start");
        let text_after = parsed
            .iter()
            .position(|event| event["choices"][0]["delta"]["content"].as_str() == Some("after"))
            .expect("text after");
        assert!(text_before < tool_start);
        assert!(tool_start < text_after);
        let tool_call = &parsed[tool_start]["choices"][0]["delta"]["tool_calls"][0];
        assert_eq!(tool_call["id"], "toolu_abc");
        assert_eq!(tool_call["index"], 0);
        assert_eq!(tool_call["type"], "function");
        assert_eq!(tool_call["function"]["name"], "local_shell");
        assert_eq!(tool_call["function"]["arguments"], "");
        assert!(parsed
            .iter()
            .any(|event| event["choices"][0]["finish_reason"].as_str() == Some("tool_calls")));
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
    }

    #[test]
    fn claude_refusal_stream_maps_to_openai_content_filter_finish() {
        let mut state = StreamTransformState::new(
            Protocol::Anthropic,
            Protocol::Openai,
            "claude-sonnet-4-20250514",
        );

        let outputs = state.transform(
            SseEvent::new(
                json!({
                    "type": "message_delta",
                    "delta": {"stop_reason": "refusal", "stop_sequence": null},
                    "usage": {"output_tokens": 0}
                })
                .to_string(),
            )
            .with_event("message_delta"),
        );

        let parsed = parse_json_events(&outputs);
        assert!(parsed.iter().any(|event| {
            event["choices"][0]["finish_reason"].as_str() == Some("content_filter")
        }));
    }

    #[test]
    fn claude_context_window_stop_stream_maps_to_openai_length_finish() {
        let mut state = StreamTransformState::new(
            Protocol::Anthropic,
            Protocol::Openai,
            "claude-sonnet-4-20250514",
        );

        let outputs = state.transform(
            SseEvent::new(
                json!({
                    "type": "message_delta",
                    "delta": {
                        "stop_reason": "model_context_window_exceeded",
                        "stop_sequence": null
                    },
                    "usage": {"output_tokens": 12}
                })
                .to_string(),
            )
            .with_event("message_delta"),
        );

        let parsed = parse_json_events(&outputs);
        assert!(parsed
            .iter()
            .any(|event| { event["choices"][0]["finish_reason"].as_str() == Some("length") }));
    }

    #[test]
    fn claude_stream_to_openai_responses_emits_responses_sse_events_for_codex() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Anthropic,
            Protocol::Openai,
            ApiSurface::AnthropicMessages,
            ApiSurface::OpenAiResponses,
            "claude-sonnet-4-20250514",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_start",
                        "message": {
                            "id": "msg_abc",
                            "type": "message",
                            "role": "assistant",
                            "model": "claude-sonnet-4-20250514",
                            "content": [],
                            "stop_reason": null,
                            "usage": {"input_tokens": 10, "output_tokens": 0}
                        }
                    })
                    .to_string(),
                )
                .with_event("message_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_start",
                        "index": 0,
                        "content_block": {"type": "text", "text": ""}
                    })
                    .to_string(),
                )
                .with_event("content_block_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_delta",
                        "index": 0,
                        "delta": {"type": "text_delta", "text": "hello"}
                    })
                    .to_string(),
                )
                .with_event("content_block_delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_delta",
                        "delta": {"stop_reason": "end_turn", "stop_sequence": null},
                        "usage": {"output_tokens": 4}
                    })
                    .to_string(),
                )
                .with_event("message_delta"),
            ),
        );
        outputs.extend(state.transform(
            SseEvent::new(json!({"type": "message_stop"}).to_string()).with_event("message_stop"),
        ));

        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("response.created")));
        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("response.in_progress")));
        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("response.output_text.delta")));
        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("response.completed")));
        assert!(
            outputs.iter().all(|event| {
                event.data == "[DONE]"
                    || serde_json::from_str::<Value>(&event.data)
                        .ok()
                        .and_then(|parsed| {
                            parsed
                                .get("object")
                                .and_then(|value| value.as_str())
                                .map(str::to_owned)
                        })
                        .map(|object| !object.starts_with("chat.completion"))
                        .unwrap_or(true)
            }),
            "Responses streaming conversion must not emit Chat Completions chunks"
        );

        let parsed = parse_json_events(&outputs);
        assert_responses_sequence_numbers_are_monotonic(&parsed);
        let text_delta = parsed
            .iter()
            .find(|event| event["type"] == "response.output_text.delta")
            .expect("output text delta");
        assert_eq!(text_delta["delta"], "hello");

        let completed = parsed
            .iter()
            .find(|event| event["type"] == "response.completed")
            .expect("response completed");
        assert_eq!(completed["response"]["object"], "response");
        assert_eq!(completed["response"]["status"], "completed");
        assert_eq!(completed["response"]["output_text"], "hello");
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
    }

    #[test]
    fn claude_context_window_stop_stream_maps_to_responses_incomplete() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Anthropic,
            Protocol::Openai,
            ApiSurface::AnthropicMessages,
            ApiSurface::OpenAiResponses,
            "claude-sonnet-4-20250514",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_start",
                        "message": {
                            "id": "msg_context",
                            "type": "message",
                            "role": "assistant",
                            "model": "claude-sonnet-4-20250514",
                            "content": [],
                            "stop_reason": null,
                            "usage": {"input_tokens": 10, "output_tokens": 0}
                        }
                    })
                    .to_string(),
                )
                .with_event("message_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_delta",
                        "delta": {
                            "stop_reason": "model_context_window_exceeded",
                            "stop_sequence": null
                        },
                        "usage": {"output_tokens": 8}
                    })
                    .to_string(),
                )
                .with_event("message_delta"),
            ),
        );
        outputs.extend(state.transform(
            SseEvent::new(json!({"type": "message_stop"}).to_string()).with_event("message_stop"),
        ));

        let parsed = parse_json_events(&outputs);
        let incomplete = parsed
            .iter()
            .find(|event| event["type"] == "response.incomplete")
            .expect("response incomplete");
        assert_eq!(incomplete["response"]["status"], "incomplete");
        assert_eq!(
            incomplete["response"]["incomplete_details"]["reason"],
            "max_output_tokens"
        );
    }

    #[test]
    fn claude_tool_use_stream_to_openai_responses_emits_function_call_events() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Anthropic,
            Protocol::Openai,
            ApiSurface::AnthropicMessages,
            ApiSurface::OpenAiResponses,
            "claude-sonnet-4-20250514",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_start",
                        "message": {
                            "id": "msg_abc",
                            "type": "message",
                            "role": "assistant",
                            "model": "claude-sonnet-4-20250514",
                            "content": [],
                            "stop_reason": null,
                            "usage": {"input_tokens": 10, "output_tokens": 0}
                        }
                    })
                    .to_string(),
                )
                .with_event("message_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_start",
                        "index": 0,
                        "content_block": {
                            "type": "tool_use",
                            "id": "toolu_123",
                            "name": "get_weather",
                            "input": {}
                        }
                    })
                    .to_string(),
                )
                .with_event("content_block_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_delta",
                        "index": 0,
                        "delta": {
                            "type": "input_json_delta",
                            "partial_json": "{\"city\":\"NYC\"}"
                        }
                    })
                    .to_string(),
                )
                .with_event("content_block_delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_stop",
                        "index": 0
                    })
                    .to_string(),
                )
                .with_event("content_block_stop"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_delta",
                        "delta": {"stop_reason": "tool_use", "stop_sequence": null},
                        "usage": {"output_tokens": 4}
                    })
                    .to_string(),
                )
                .with_event("message_delta"),
            ),
        );
        outputs.extend(state.transform(
            SseEvent::new(json!({"type": "message_stop"}).to_string()).with_event("message_stop"),
        ));

        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("response.function_call_arguments.delta")));
        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("response.function_call_arguments.done")));

        let parsed = parse_json_events(&outputs);
        let item_added = parsed
            .iter()
            .find(|event| {
                event["type"] == "response.output_item.added"
                    && event["item"]["type"] == "function_call"
            })
            .expect("function call output item added");
        assert_eq!(item_added["item"]["call_id"], "toolu_123");
        assert_eq!(item_added["item"]["name"], "get_weather");

        let args_delta = parsed
            .iter()
            .find(|event| event["type"] == "response.function_call_arguments.delta")
            .expect("function arguments delta");
        assert!(args_delta["sequence_number"].as_u64().is_some());
        assert_eq!(args_delta["delta"], "{\"city\":\"NYC\"}");

        let args_done = parsed
            .iter()
            .find(|event| event["type"] == "response.function_call_arguments.done")
            .expect("function arguments done");
        assert_eq!(args_done["name"], "get_weather");

        let item_done = parsed
            .iter()
            .find(|event| {
                event["type"] == "response.output_item.done"
                    && event["item"]["type"] == "function_call"
            })
            .expect("function call output item done");
        assert_eq!(item_done["item"]["arguments"], "{\"city\":\"NYC\"}");

        let completed = parsed
            .iter()
            .find(|event| event["type"] == "response.completed")
            .expect("response completed");
        assert_eq!(completed["response"]["output"][0]["type"], "function_call");
        assert_responses_sequence_numbers_are_monotonic(&parsed);
    }

    #[test]
    fn claude_responses_stream_preserves_interleaved_text_and_tool_output_items() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Anthropic,
            Protocol::Openai,
            ApiSurface::AnthropicMessages,
            ApiSurface::OpenAiResponses,
            "claude-sonnet-4-20250514",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_start",
                        "message": {
                            "id": "msg_interleaved",
                            "type": "message",
                            "role": "assistant",
                            "model": "claude-sonnet-4-20250514",
                            "content": [],
                            "stop_reason": null,
                            "usage": {"input_tokens": 12, "output_tokens": 0}
                        }
                    })
                    .to_string(),
                )
                .with_event("message_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_start",
                        "index": 0,
                        "content_block": {"type": "text", "text": ""}
                    })
                    .to_string(),
                )
                .with_event("content_block_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_delta",
                        "index": 0,
                        "delta": {"type": "text_delta", "text": "Before "}
                    })
                    .to_string(),
                )
                .with_event("content_block_delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(json!({"type": "content_block_stop", "index": 0}).to_string())
                    .with_event("content_block_stop"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_start",
                        "index": 1,
                        "content_block": {
                            "type": "tool_use",
                            "id": "toolu_interleaved",
                            "name": "local_shell",
                            "input": {}
                        }
                    })
                    .to_string(),
                )
                .with_event("content_block_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_delta",
                        "index": 1,
                        "delta": {"type": "input_json_delta", "partial_json": "{\"command\":[\"pwd\"]}"}
                    })
                    .to_string(),
                )
                .with_event("content_block_delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(json!({"type": "content_block_stop", "index": 1}).to_string())
                    .with_event("content_block_stop"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_start",
                        "index": 2,
                        "content_block": {"type": "text", "text": ""}
                    })
                    .to_string(),
                )
                .with_event("content_block_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_delta",
                        "index": 2,
                        "delta": {"type": "text_delta", "text": "after"}
                    })
                    .to_string(),
                )
                .with_event("content_block_delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(json!({"type": "content_block_stop", "index": 2}).to_string())
                    .with_event("content_block_stop"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_delta",
                        "delta": {"stop_reason": "end_turn", "stop_sequence": null},
                        "usage": {"output_tokens": 6}
                    })
                    .to_string(),
                )
                .with_event("message_delta"),
            ),
        );
        outputs.extend(state.transform(
            SseEvent::new(json!({"type": "message_stop"}).to_string()).with_event("message_stop"),
        ));

        let parsed = parse_json_events(&outputs);
        let completed = parsed
            .iter()
            .find(|event| event["type"] == "response.completed")
            .expect("response completed");
        let output = completed["response"]["output"].as_array().expect("output");
        assert_eq!(output.len(), 3);
        assert_eq!(output[0]["type"], "message");
        assert_eq!(output[0]["content"][0]["text"], "Before ");
        assert_eq!(output[1]["type"], "function_call");
        assert_eq!(output[1]["name"], "local_shell");
        assert_eq!(output[2]["type"], "message");
        assert_eq!(output[2]["content"][0]["text"], "after");
        assert_eq!(completed["response"]["output_text"], "Before after");
        assert_eq!(completed["response"]["usage"]["input_tokens"], 12);
        assert_eq!(completed["response"]["usage"]["output_tokens"], 6);
        assert_responses_sequence_numbers_are_monotonic(&parsed);
    }

    #[test]
    fn claude_responses_stream_merges_incremental_usage_without_losing_input_tokens() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Anthropic,
            Protocol::Openai,
            ApiSurface::AnthropicMessages,
            ApiSurface::OpenAiResponses,
            "claude-sonnet-4-20250514",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_start",
                        "message": {
                            "id": "msg_usage",
                            "type": "message",
                            "role": "assistant",
                            "model": "claude-sonnet-4-20250514",
                            "content": [],
                            "stop_reason": null,
                            "usage": {"input_tokens": 21, "output_tokens": 1}
                        }
                    })
                    .to_string(),
                )
                .with_event("message_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_delta",
                        "delta": {"stop_reason": "end_turn", "stop_sequence": null},
                        "usage": {"output_tokens": 5}
                    })
                    .to_string(),
                )
                .with_event("message_delta"),
            ),
        );
        outputs.extend(state.transform(
            SseEvent::new(json!({"type": "message_stop"}).to_string()).with_event("message_stop"),
        ));

        let parsed = parse_json_events(&outputs);
        let completed = parsed
            .iter()
            .find(|event| event["type"] == "response.completed")
            .expect("response completed");
        assert_eq!(completed["response"]["usage"]["input_tokens"], 21);
        assert_eq!(completed["response"]["usage"]["output_tokens"], 5);
        assert_eq!(completed["response"]["usage"]["total_tokens"], 26);
    }

    #[test]
    fn gemini_stream_to_openai_responses_emits_responses_sse_events_for_codex() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Google,
            Protocol::Openai,
            ApiSurface::GeminiGenerateContent,
            ApiSurface::OpenAiResponses,
            "gemini-2.5-pro",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "candidates": [{
                        "index": 0,
                        "content": {
                            "role": "model",
                            "parts": [{"text": "hello"}]
                        }
                    }],
                    "usageMetadata": {"promptTokenCount": 8, "candidatesTokenCount": 2}
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "candidates": [{
                        "index": 0,
                        "content": {"role": "model", "parts": []},
                        "finishReason": "STOP"
                    }],
                    "usageMetadata": {
                        "promptTokenCount": 8,
                        "candidatesTokenCount": 3,
                        "totalTokenCount": 11
                    }
                })
                .to_string(),
            )),
        );

        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("response.created")));
        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("response.output_text.delta")));
        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("response.completed")));

        let parsed = parse_json_events(&outputs);
        assert_responses_sequence_numbers_are_monotonic(&parsed);
        let text_delta = parsed
            .iter()
            .find(|event| event["type"] == "response.output_text.delta")
            .expect("output text delta");
        assert_eq!(text_delta["delta"], "hello");

        let completed = parsed
            .iter()
            .find(|event| event["type"] == "response.completed")
            .expect("response completed");
        assert_eq!(completed["response"]["output_text"], "hello");
        assert_eq!(completed["response"]["usage"]["input_tokens"], 8);
        assert_eq!(completed["response"]["usage"]["output_tokens"], 3);
        assert_eq!(completed["response"]["usage"]["total_tokens"], 11);
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
    }

    #[test]
    fn gemini_function_call_stream_to_openai_responses_emits_function_call_events() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Google,
            Protocol::Openai,
            ApiSurface::GeminiGenerateContent,
            ApiSurface::OpenAiResponses,
            "gemini-2.5-pro",
        );

        let outputs = state.transform(SseEvent::new(
            json!({
                "candidates": [{
                    "index": 0,
                    "content": {
                        "role": "model",
                        "parts": [{
                            "functionCall": {
                                "name": "get_weather",
                                "args": {"city": "NYC"}
                            }
                        }]
                    },
                    "finishReason": "STOP"
                }]
            })
            .to_string(),
        ));

        let parsed = parse_json_events(&outputs);
        assert!(parsed
            .iter()
            .any(|event| event["type"] == "response.function_call_arguments.done"));
        let item_done = parsed
            .iter()
            .find(|event| {
                event["type"] == "response.output_item.done"
                    && event["item"]["type"] == "function_call"
            })
            .expect("function call output item done");
        assert_eq!(item_done["item"]["name"], "get_weather");
        assert_eq!(item_done["item"]["arguments"], "{\"city\":\"NYC\"}");
        assert!(parsed
            .iter()
            .any(|event| event["type"] == "response.completed"));
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
    }

    #[test]
    fn gemini_responses_stream_preserves_text_then_function_call_order_for_codex() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Google,
            Protocol::Openai,
            ApiSurface::GeminiGenerateContent,
            ApiSurface::OpenAiResponses,
            "gemini-2.5-pro",
        );

        let outputs = state.transform(SseEvent::new(
            json!({
                "candidates": [{
                    "index": 0,
                    "content": {
                        "role": "model",
                        "parts": [
                            {"text": "I will inspect it. "},
                            {
                                "functionCall": {
                                    "name": "local_shell",
                                    "args": {
                                        "command": ["pwd"],
                                        "working_directory": "/repo"
                                    }
                                }
                            }
                        ]
                    },
                    "finishReason": "STOP"
                }],
                "usageMetadata": {
                    "promptTokenCount": 7,
                    "candidatesTokenCount": 5,
                    "totalTokenCount": 12
                }
            })
            .to_string(),
        ));

        let parsed = parse_json_events(&outputs);
        let completed = parsed
            .iter()
            .find(|event| event["type"] == "response.completed")
            .expect("response completed");
        let output = completed["response"]["output"].as_array().expect("output");
        assert_eq!(output.len(), 2);
        assert_eq!(output[0]["type"], "message");
        assert_eq!(output[0]["content"][0]["text"], "I will inspect it. ");
        assert_eq!(output[1]["type"], "function_call");
        assert_eq!(output[1]["name"], "local_shell");
        assert_eq!(
            output[1]["arguments"],
            "{\"command\":[\"pwd\"],\"working_directory\":\"/repo\"}"
        );
        assert_eq!(completed["response"]["output_text"], "I will inspect it. ");
        assert_eq!(completed["response"]["usage"]["input_tokens"], 7);
        assert_eq!(completed["response"]["usage"]["output_tokens"], 5);
        assert_responses_sequence_numbers_are_monotonic(&parsed);
    }

    #[test]
    fn openai_chat_stream_to_responses_emits_text_tool_usage_and_done() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Openai,
            Protocol::Openai,
            ApiSurface::OpenAiChatCompletions,
            ApiSurface::OpenAiResponses,
            "gpt-4o",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_123",
                    "object": "chat.completion.chunk",
                    "model": "gpt-4o",
                    "choices": [{
                        "index": 0,
                        "delta": {"role": "assistant"},
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_123",
                    "object": "chat.completion.chunk",
                    "model": "gpt-4o",
                    "choices": [{
                        "index": 0,
                        "delta": {"content": "Checking. "},
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_123",
                    "object": "chat.completion.chunk",
                    "model": "gpt-4o",
                    "choices": [{
                        "index": 0,
                        "delta": {
                            "tool_calls": [{
                                "index": 0,
                                "id": "call_123",
                                "type": "function",
                                "function": {"name": "get_weather", "arguments": ""}
                            }]
                        },
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_123",
                    "object": "chat.completion.chunk",
                    "model": "gpt-4o",
                    "choices": [{
                        "index": 0,
                        "delta": {
                            "tool_calls": [{
                                "index": 0,
                                "function": {"arguments": "{\"city\":\"NYC\"}"}
                            }]
                        },
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_123",
                    "object": "chat.completion.chunk",
                    "model": "gpt-4o",
                    "choices": [{
                        "index": 0,
                        "delta": {},
                        "finish_reason": "tool_calls"
                    }],
                    "usage": {"prompt_tokens": 8, "completion_tokens": 3, "total_tokens": 11}
                })
                .to_string(),
            )),
        );
        outputs.extend(state.transform(SseEvent::new("[DONE]")));

        let parsed = parse_json_events(&outputs);
        assert!(parsed
            .iter()
            .any(|event| event["type"] == "response.output_text.delta"
                && event["delta"] == "Checking. "));
        assert!(parsed.iter().any(|event| event["type"]
            == "response.function_call_arguments.delta"
            && event["delta"] == "{\"city\":\"NYC\"}"));

        let item_added = parsed
            .iter()
            .find(|event| {
                event["type"] == "response.output_item.added"
                    && event["item"]["type"] == "function_call"
            })
            .expect("function call item added");
        assert_eq!(item_added["item"]["call_id"], "call_123");
        assert_eq!(item_added["item"]["name"], "get_weather");

        let completed = parsed
            .iter()
            .find(|event| event["type"] == "response.completed")
            .expect("response completed");
        assert_eq!(completed["response"]["output_text"], "Checking. ");
        assert_eq!(completed["response"]["output"][0]["type"], "message");
        assert_eq!(completed["response"]["output"][1]["type"], "function_call");
        assert_eq!(completed["response"]["usage"]["input_tokens"], 8);
        assert_eq!(completed["response"]["usage"]["output_tokens"], 3);
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
        assert_responses_sequence_numbers_are_monotonic(&parsed);
    }

    #[test]
    fn openai_chat_stream_to_responses_waits_for_final_usage_chunk_before_done() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Openai,
            Protocol::Openai,
            ApiSurface::OpenAiChatCompletions,
            ApiSurface::OpenAiResponses,
            "gpt-4o",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_usage",
                    "object": "chat.completion.chunk",
                    "model": "gpt-4o",
                    "choices": [{
                        "index": 0,
                        "delta": {"content": "ok"},
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_usage",
                    "object": "chat.completion.chunk",
                    "model": "gpt-4o",
                    "choices": [{
                        "index": 0,
                        "delta": {},
                        "finish_reason": "stop"
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_usage",
                    "object": "chat.completion.chunk",
                    "model": "gpt-4o",
                    "choices": [],
                    "usage": {"prompt_tokens": 13, "completion_tokens": 5, "total_tokens": 18}
                })
                .to_string(),
            )),
        );
        outputs.extend(state.transform(SseEvent::new("[DONE]")));

        let parsed = parse_json_events(&outputs);
        let completed = parsed
            .iter()
            .find(|event| event["type"] == "response.completed")
            .expect("response completed");
        assert_eq!(completed["response"]["usage"]["input_tokens"], 13);
        assert_eq!(completed["response"]["usage"]["output_tokens"], 5);
        assert_eq!(completed["response"]["usage"]["total_tokens"], 18);
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
    }

    #[test]
    fn openai_chat_stream_to_gemini_emits_generate_content_chunks_with_usage() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Openai,
            Protocol::Google,
            ApiSurface::OpenAiChatCompletions,
            ApiSurface::GeminiGenerateContent,
            "gemini-2.5-pro",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_gemini",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {"content": "hello"},
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_gemini",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {},
                        "finish_reason": "stop"
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_gemini",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [],
                    "usage": {
                        "prompt_tokens": 11,
                        "completion_tokens": 4,
                        "total_tokens": 15
                    }
                })
                .to_string(),
            )),
        );
        outputs.extend(state.transform(SseEvent::new("[DONE]")));

        let parsed = parse_json_events(&outputs);
        assert!(parsed.iter().any(|event| {
            event["candidates"][0]["content"]["parts"][0]["text"].as_str() == Some("hello")
        }));
        let final_chunk = parsed
            .iter()
            .find(|event| event["candidates"][0].get("finishReason").is_some())
            .expect("Gemini finish chunk");
        assert_eq!(final_chunk["candidates"][0]["finishReason"], "STOP");
        assert_eq!(final_chunk["usageMetadata"]["promptTokenCount"], 11);
        assert_eq!(final_chunk["usageMetadata"]["candidatesTokenCount"], 4);
        assert_eq!(final_chunk["usageMetadata"]["totalTokenCount"], 15);
        assert!(parsed.iter().all(|event| event.get("object").is_none()));
        assert!(outputs.iter().all(|event| event.data != "[DONE]"));
    }

    #[test]
    fn openai_responses_stream_to_gemini_emits_generate_content_chunks() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Openai,
            Protocol::Google,
            ApiSurface::OpenAiResponses,
            ApiSurface::GeminiGenerateContent,
            "gemini-2.5-pro",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.created",
                        "response": {
                            "id": "resp_gemini",
                            "object": "response",
                            "status": "in_progress",
                            "model": "gpt-5.5",
                            "output": [],
                            "usage": {"input_tokens": 7, "output_tokens": 0, "total_tokens": 7}
                        }
                    })
                    .to_string(),
                )
                .with_event("response.created"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.output_text.delta",
                        "item_id": "msg_1",
                        "output_index": 0,
                        "content_index": 0,
                        "delta": "ok"
                    })
                    .to_string(),
                )
                .with_event("response.output_text.delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.completed",
                        "response": {
                            "id": "resp_gemini",
                            "object": "response",
                            "status": "completed",
                            "model": "gpt-5.5",
                            "output": [],
                            "usage": {"input_tokens": 7, "output_tokens": 3, "total_tokens": 10}
                        }
                    })
                    .to_string(),
                )
                .with_event("response.completed"),
            ),
        );

        let parsed = parse_json_events(&outputs);
        assert!(parsed.iter().any(|event| {
            event["candidates"][0]["content"]["parts"][0]["text"].as_str() == Some("ok")
        }));
        let final_chunk = parsed
            .iter()
            .find(|event| event["candidates"][0].get("finishReason").is_some())
            .expect("Gemini finish chunk");
        assert_eq!(final_chunk["candidates"][0]["finishReason"], "STOP");
        assert_eq!(final_chunk["usageMetadata"]["promptTokenCount"], 7);
        assert_eq!(final_chunk["usageMetadata"]["candidatesTokenCount"], 3);
        assert_eq!(final_chunk["usageMetadata"]["totalTokenCount"], 10);
        assert!(parsed
            .iter()
            .all(|event| event.get("type").and_then(|value| value.as_str()).is_none()));
        assert!(outputs.iter().all(|event| event.data != "[DONE]"));
    }

    #[test]
    fn claude_messages_stream_to_gemini_emits_generate_content_chunks() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Anthropic,
            Protocol::Google,
            ApiSurface::AnthropicMessages,
            ApiSurface::GeminiGenerateContent,
            "gemini-2.5-pro",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_start",
                        "message": {
                            "id": "msg_gemini",
                            "type": "message",
                            "role": "assistant",
                            "model": "claude-sonnet-4-20250514",
                            "content": [],
                            "stop_reason": null,
                            "usage": {"input_tokens": 9, "output_tokens": 0}
                        }
                    })
                    .to_string(),
                )
                .with_event("message_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_delta",
                        "index": 0,
                        "delta": {"type": "text_delta", "text": "hi"}
                    })
                    .to_string(),
                )
                .with_event("content_block_delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_delta",
                        "delta": {"stop_reason": "end_turn", "stop_sequence": null},
                        "usage": {"output_tokens": 2}
                    })
                    .to_string(),
                )
                .with_event("message_delta"),
            ),
        );
        outputs.extend(state.transform(
            SseEvent::new(json!({"type": "message_stop"}).to_string()).with_event("message_stop"),
        ));

        let parsed = parse_json_events(&outputs);
        assert!(parsed.iter().any(|event| {
            event["candidates"][0]["content"]["parts"][0]["text"].as_str() == Some("hi")
        }));
        let final_chunk = parsed
            .iter()
            .find(|event| event["candidates"][0].get("finishReason").is_some())
            .expect("Gemini finish chunk");
        assert_eq!(final_chunk["candidates"][0]["finishReason"], "STOP");
        assert_eq!(final_chunk["usageMetadata"]["promptTokenCount"], 9);
        assert_eq!(final_chunk["usageMetadata"]["candidatesTokenCount"], 2);
        assert_eq!(final_chunk["usageMetadata"]["totalTokenCount"], 11);
        assert!(outputs
            .iter()
            .all(|event| event.event.as_deref().unwrap_or("").is_empty()));
        assert!(outputs.iter().all(|event| event.data != "[DONE]"));
    }

    #[test]
    fn openai_chat_tool_call_stream_to_gemini_emits_complete_function_call() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Openai,
            Protocol::Google,
            ApiSurface::OpenAiChatCompletions,
            ApiSurface::GeminiGenerateContent,
            "gemini-2.5-pro",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_tool",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {
                            "tool_calls": [{
                                "index": 0,
                                "id": "call_weather",
                                "type": "function",
                                "function": {"name": "get_weather", "arguments": ""}
                            }]
                        },
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_tool",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {
                            "tool_calls": [{
                                "index": 0,
                                "function": {"arguments": "{\"city\":\"NYC\"}"}
                            }]
                        },
                        "finish_reason": "tool_calls"
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_tool",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [],
                    "usage": {"prompt_tokens": 8, "completion_tokens": 3, "total_tokens": 11}
                })
                .to_string(),
            )),
        );
        outputs.extend(state.transform(SseEvent::new("[DONE]")));

        let parsed = parse_json_events(&outputs);
        let function_call = parsed
            .iter()
            .find_map(|event| {
                event["candidates"][0]["content"]["parts"][0]
                    .get("functionCall")
                    .cloned()
            })
            .expect("Gemini functionCall");
        assert_eq!(function_call["name"], "get_weather");
        assert_eq!(function_call["args"]["city"], "NYC");
        let final_chunk = parsed
            .iter()
            .find(|event| event["candidates"][0].get("finishReason").is_some())
            .expect("Gemini finish chunk");
        assert_eq!(final_chunk["candidates"][0]["finishReason"], "STOP");
        assert_eq!(final_chunk["usageMetadata"]["promptTokenCount"], 8);
        assert_eq!(final_chunk["usageMetadata"]["candidatesTokenCount"], 3);
        assert_eq!(final_chunk["usageMetadata"]["totalTokenCount"], 11);
        assert!(outputs.iter().all(|event| event.data != "[DONE]"));
    }

    #[test]
    fn openai_chat_tool_call_stream_to_gemini_flushes_pending_call_on_done() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Openai,
            Protocol::Google,
            ApiSurface::OpenAiChatCompletions,
            ApiSurface::GeminiGenerateContent,
            "gemini-2.5-pro",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_tool_done",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {
                            "tool_calls": [{
                                "index": 0,
                                "id": "call_weather",
                                "type": "function",
                                "function": {
                                    "name": "get_weather",
                                    "arguments": "{\"city\":\"NYC\"}"
                                }
                            }]
                        },
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(state.transform(SseEvent::new("[DONE]")));

        let parsed = parse_json_events(&outputs);
        let function_call = parsed
            .iter()
            .find_map(|event| {
                event["candidates"][0]["content"]["parts"][0]
                    .get("functionCall")
                    .cloned()
            })
            .expect("Gemini functionCall");
        assert_eq!(function_call["name"], "get_weather");
        assert_eq!(function_call["args"]["city"], "NYC");
        assert!(parsed
            .iter()
            .any(|event| event["candidates"][0]["finishReason"] == "STOP"));
        assert!(outputs.iter().all(|event| event.data != "[DONE]"));
    }

    #[test]
    fn openai_responses_tool_call_stream_to_gemini_emits_function_call() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Openai,
            Protocol::Google,
            ApiSurface::OpenAiResponses,
            ApiSurface::GeminiGenerateContent,
            "gemini-2.5-pro",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.output_item.added",
                        "output_index": 0,
                        "item": {
                            "type": "function_call",
                            "id": "fc_weather",
                            "call_id": "call_weather",
                            "name": "get_weather",
                            "arguments": "",
                            "status": "in_progress"
                        }
                    })
                    .to_string(),
                )
                .with_event("response.output_item.added"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.function_call_arguments.delta",
                        "output_index": 0,
                        "item_id": "fc_weather",
                        "delta": "{\"city\":\"NYC\"}"
                    })
                    .to_string(),
                )
                .with_event("response.function_call_arguments.delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.output_item.done",
                        "output_index": 0,
                        "item": {
                            "type": "function_call",
                            "id": "fc_weather",
                            "call_id": "call_weather",
                            "name": "get_weather",
                            "arguments": "{\"city\":\"NYC\"}",
                            "status": "completed"
                        }
                    })
                    .to_string(),
                )
                .with_event("response.output_item.done"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.completed",
                        "response": {
                            "id": "resp_tool",
                            "object": "response",
                            "status": "completed",
                            "model": "gpt-5.5",
                            "output": [],
                            "usage": {"input_tokens": 12, "output_tokens": 4, "total_tokens": 16}
                        }
                    })
                    .to_string(),
                )
                .with_event("response.completed"),
            ),
        );

        let parsed = parse_json_events(&outputs);
        let function_call = parsed
            .iter()
            .find_map(|event| {
                event["candidates"][0]["content"]["parts"][0]
                    .get("functionCall")
                    .cloned()
            })
            .expect("Gemini functionCall");
        assert_eq!(function_call["name"], "get_weather");
        assert_eq!(function_call["args"]["city"], "NYC");
        let final_chunk = parsed
            .iter()
            .find(|event| event["candidates"][0].get("finishReason").is_some())
            .expect("Gemini finish chunk");
        assert_eq!(final_chunk["usageMetadata"]["promptTokenCount"], 12);
        assert_eq!(final_chunk["usageMetadata"]["candidatesTokenCount"], 4);
        assert_eq!(final_chunk["usageMetadata"]["totalTokenCount"], 16);
        assert!(outputs.iter().all(|event| event.data != "[DONE]"));
    }

    #[test]
    fn claude_tool_use_stream_to_gemini_emits_function_call() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Anthropic,
            Protocol::Google,
            ApiSurface::AnthropicMessages,
            ApiSurface::GeminiGenerateContent,
            "gemini-2.5-pro",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_start",
                        "message": {
                            "id": "msg_tool",
                            "type": "message",
                            "role": "assistant",
                            "model": "claude-sonnet-4-20250514",
                            "content": [],
                            "stop_reason": null,
                            "usage": {"input_tokens": 10, "output_tokens": 0}
                        }
                    })
                    .to_string(),
                )
                .with_event("message_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_start",
                        "index": 1,
                        "content_block": {
                            "type": "tool_use",
                            "id": "toolu_weather",
                            "name": "get_weather",
                            "input": {}
                        }
                    })
                    .to_string(),
                )
                .with_event("content_block_start"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "content_block_delta",
                        "index": 1,
                        "delta": {"type": "input_json_delta", "partial_json": "{\"city\":\"NYC\"}"}
                    })
                    .to_string(),
                )
                .with_event("content_block_delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(json!({"type": "content_block_stop", "index": 1}).to_string())
                    .with_event("content_block_stop"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "message_delta",
                        "delta": {"stop_reason": "tool_use", "stop_sequence": null},
                        "usage": {"output_tokens": 3}
                    })
                    .to_string(),
                )
                .with_event("message_delta"),
            ),
        );
        outputs.extend(state.transform(
            SseEvent::new(json!({"type": "message_stop"}).to_string()).with_event("message_stop"),
        ));

        let parsed = parse_json_events(&outputs);
        let function_call = parsed
            .iter()
            .find_map(|event| {
                event["candidates"][0]["content"]["parts"][0]
                    .get("functionCall")
                    .cloned()
            })
            .expect("Gemini functionCall");
        assert_eq!(function_call["name"], "get_weather");
        assert_eq!(function_call["args"]["city"], "NYC");
        let final_chunk = parsed
            .iter()
            .find(|event| event["candidates"][0].get("finishReason").is_some())
            .expect("Gemini finish chunk");
        assert_eq!(final_chunk["candidates"][0]["finishReason"], "STOP");
        assert_eq!(final_chunk["usageMetadata"]["promptTokenCount"], 10);
        assert_eq!(final_chunk["usageMetadata"]["candidatesTokenCount"], 3);
        assert_eq!(final_chunk["usageMetadata"]["totalTokenCount"], 13);
        assert!(outputs.iter().all(|event| event.data != "[DONE]"));
    }

    #[test]
    fn openai_responses_stream_to_chat_emits_chat_chunks_for_openai_compatible_clients() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Openai,
            Protocol::Openai,
            ApiSurface::OpenAiResponses,
            ApiSurface::OpenAiChatCompletions,
            "gpt-5.5",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.created",
                        "response": {
                            "id": "resp_abc",
                            "object": "response",
                            "status": "in_progress",
                            "model": "gpt-5.5",
                            "output": [],
                            "usage": {"input_tokens": 9, "output_tokens": 0, "total_tokens": 9}
                        }
                    })
                    .to_string(),
                )
                .with_event("response.created"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.output_text.delta",
                        "item_id": "msg_1",
                        "output_index": 0,
                        "content_index": 0,
                        "delta": "ok"
                    })
                    .to_string(),
                )
                .with_event("response.output_text.delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.completed",
                        "response": {
                            "id": "resp_abc",
                            "object": "response",
                            "status": "completed",
                            "model": "gpt-5.5",
                            "output": [{
                                "type": "message",
                                "id": "msg_1",
                                "role": "assistant",
                                "content": [{"type": "output_text", "text": "ok"}]
                            }],
                            "output_text": "ok",
                            "usage": {"input_tokens": 9, "output_tokens": 2, "total_tokens": 11}
                        }
                    })
                    .to_string(),
                )
                .with_event("response.completed"),
            ),
        );

        let parsed = parse_json_events(&outputs);
        assert_eq!(parsed[0]["object"], "chat.completion.chunk");
        assert_eq!(parsed[0]["choices"][0]["delta"]["role"], "assistant");
        assert!(parsed
            .iter()
            .any(|event| { event["choices"][0]["delta"]["content"].as_str() == Some("ok") }));
        assert!(parsed
            .iter()
            .any(|event| { event["choices"][0]["finish_reason"].as_str() == Some("stop") }));
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
        assert!(parsed.iter().all(|event| event["type"]
            .as_str()
            .is_none_or(|kind| !kind.starts_with("response."))));
    }

    #[test]
    fn openai_responses_stream_to_chat_emits_final_usage_chunk_before_done() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Openai,
            Protocol::Openai,
            ApiSurface::OpenAiResponses,
            ApiSurface::OpenAiChatCompletions,
            "gpt-5.5",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.created",
                        "response": {
                            "id": "resp_usage",
                            "object": "response",
                            "status": "in_progress",
                            "model": "gpt-5.5",
                            "output": []
                        }
                    })
                    .to_string(),
                )
                .with_event("response.created"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.completed",
                        "response": {
                            "id": "resp_usage",
                            "object": "response",
                            "status": "completed",
                            "model": "gpt-5.5",
                            "output": [],
                            "usage": {
                                "input_tokens": 12,
                                "output_tokens": 4,
                                "total_tokens": 16
                            }
                        }
                    })
                    .to_string(),
                )
                .with_event("response.completed"),
            ),
        );

        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
        let parsed = parse_json_events(&outputs);
        let usage_chunk = parsed
            .iter()
            .find(|event| {
                event["choices"]
                    .as_array()
                    .is_some_and(|choices| choices.is_empty())
                    && event.get("usage").is_some()
            })
            .expect("final chat usage chunk");
        assert_eq!(usage_chunk["usage"]["prompt_tokens"], 12);
        assert_eq!(usage_chunk["usage"]["completion_tokens"], 4);
        assert_eq!(usage_chunk["usage"]["total_tokens"], 16);
    }

    #[test]
    fn openai_responses_stream_to_chat_flush_preserves_observed_usage_before_done() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Openai,
            Protocol::Openai,
            ApiSurface::OpenAiResponses,
            ApiSurface::OpenAiChatCompletions,
            "gpt-5.5",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.in_progress",
                        "response": {
                            "id": "resp_usage_flush",
                            "object": "response",
                            "status": "in_progress",
                            "model": "gpt-5.5",
                            "output": [],
                            "usage": {
                                "input_tokens": 15,
                                "output_tokens": 6,
                                "total_tokens": 21
                            }
                        }
                    })
                    .to_string(),
                )
                .with_event("response.in_progress"),
            ),
        );
        outputs.extend(state.transform(SseEvent::new("[DONE]")));

        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
        let parsed = parse_json_events(&outputs);
        let usage_chunk = parsed
            .iter()
            .find(|event| {
                event["choices"]
                    .as_array()
                    .is_some_and(|choices| choices.is_empty())
                    && event.get("usage").is_some()
            })
            .expect("final chat usage chunk");
        assert_eq!(usage_chunk["usage"]["prompt_tokens"], 15);
        assert_eq!(usage_chunk["usage"]["completion_tokens"], 6);
        assert_eq!(usage_chunk["usage"]["total_tokens"], 21);
    }

    #[test]
    fn openai_responses_stream_to_chat_emits_function_call_from_done_only_item() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Openai,
            Protocol::Openai,
            ApiSurface::OpenAiResponses,
            ApiSurface::OpenAiChatCompletions,
            "gpt-5.5",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.created",
                        "response": {
                            "id": "resp_tool",
                            "object": "response",
                            "status": "in_progress",
                            "model": "gpt-5.5",
                            "output": []
                        }
                    })
                    .to_string(),
                )
                .with_event("response.created"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.output_item.done",
                        "output_index": 0,
                        "item": {
                            "type": "function_call",
                            "id": "fc_123",
                            "call_id": "call_123",
                            "name": "get_weather",
                            "arguments": "{\"city\":\"NYC\"}",
                            "status": "completed"
                        }
                    })
                    .to_string(),
                )
                .with_event("response.output_item.done"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.completed",
                        "response": {
                            "id": "resp_tool",
                            "object": "response",
                            "status": "completed",
                            "model": "gpt-5.5",
                            "output": [{
                                "type": "function_call",
                                "id": "fc_123",
                                "call_id": "call_123",
                                "name": "get_weather",
                                "arguments": "{\"city\":\"NYC\"}",
                                "status": "completed"
                            }]
                        }
                    })
                    .to_string(),
                )
                .with_event("response.completed"),
            ),
        );

        let parsed = parse_json_events(&outputs);
        let tool_chunk = parsed
            .iter()
            .find(|event| {
                event["choices"][0]["delta"]
                    .get("tool_calls")
                    .and_then(|value| value.as_array())
                    .is_some()
            })
            .expect("tool call chunk");
        let tool_call = &tool_chunk["choices"][0]["delta"]["tool_calls"][0];
        assert_eq!(tool_call["id"], "call_123");
        assert_eq!(tool_call["function"]["name"], "get_weather");
        assert_eq!(tool_call["function"]["arguments"], "{\"city\":\"NYC\"}");
        assert!(parsed
            .iter()
            .any(|event| event["choices"][0]["finish_reason"].as_str() == Some("tool_calls")));
    }

    #[test]
    fn openai_tool_call_stream_emits_claude_tool_use_block_and_json_delta() {
        let mut state = StreamTransformState::new(
            Protocol::Openai,
            Protocol::Anthropic,
            "claude-sonnet-4-20250514",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_1",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {"role": "assistant"},
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_1",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {
                            "tool_calls": [{
                                "index": 0,
                                "id": "call_123",
                                "type": "function",
                                "function": {"name": "get_weather", "arguments": ""}
                            }]
                        },
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_1",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {
                            "tool_calls": [{
                                "index": 0,
                                "function": {"arguments": "{\"city\":\"NYC\"}"}
                            }]
                        },
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_1",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {},
                        "finish_reason": "tool_calls"
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(state.transform(SseEvent::new("[DONE]")));

        let parsed = parse_json_events(&outputs);
        assert_eq!(outputs[0].event.as_deref(), Some("message_start"));

        let block_start = parsed
            .iter()
            .find(|event| event["type"] == "content_block_start")
            .expect("content block start");
        assert_eq!(block_start["index"], 0);
        assert_eq!(block_start["content_block"]["type"], "tool_use");
        assert_eq!(block_start["content_block"]["id"], "call_123");
        assert_eq!(block_start["content_block"]["name"], "get_weather");
        assert_eq!(
            block_start["content_block"]["input"],
            serde_json::Value::Object(Default::default())
        );

        let argument_delta = parsed
            .iter()
            .find(|event| event["delta"]["type"] == "input_json_delta")
            .expect("input json delta");
        assert_eq!(argument_delta["index"], 0);
        assert_eq!(
            argument_delta["delta"]["partial_json"],
            "{\"city\":\"NYC\"}"
        );

        assert!(parsed.iter().any(|event| {
            event["type"] == "message_delta"
                && event["delta"]["stop_reason"].as_str() == Some("tool_use")
        }));
        assert!(parsed.iter().any(|event| event["type"] == "message_stop"));
    }

    #[test]
    fn openai_content_filter_stream_maps_to_claude_refusal_stop_reason() {
        let mut state = StreamTransformState::new(
            Protocol::Openai,
            Protocol::Anthropic,
            "claude-sonnet-4-20250514",
        );

        let mut outputs = state.transform(SseEvent::new(
            json!({
                "id": "chatcmpl_content_filter",
                "object": "chat.completion.chunk",
                "model": "gpt-5",
                "choices": [{
                    "index": 0,
                    "delta": {},
                    "finish_reason": "content_filter"
                }]
            })
            .to_string(),
        ));
        outputs.extend(state.transform(SseEvent::new("[DONE]")));

        let parsed = parse_json_events(&outputs);
        assert!(parsed.iter().any(|event| {
            event["type"] == "message_delta"
                && event["delta"]["stop_reason"].as_str() == Some("refusal")
        }));
        assert!(parsed.iter().any(|event| event["type"] == "message_stop"));
    }

    #[test]
    fn openai_chat_stream_to_claude_waits_for_final_usage_chunk() {
        let mut state = StreamTransformState::new(
            Protocol::Openai,
            Protocol::Anthropic,
            "claude-sonnet-4-20250514",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_usage",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {"content": "ok"},
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_usage",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {},
                        "finish_reason": "stop"
                    }]
                })
                .to_string(),
            )),
        );
        assert!(
            !parse_json_events(&outputs)
                .iter()
                .any(|event| event["type"] == "message_stop"),
            "message_stop must wait for the final usage chunk or DONE"
        );

        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_usage",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [],
                    "usage": {
                        "prompt_tokens": 13,
                        "completion_tokens": 5,
                        "total_tokens": 18
                    }
                })
                .to_string(),
            )),
        );
        outputs.extend(state.transform(SseEvent::new("[DONE]")));

        let parsed = parse_json_events(&outputs);
        let message_delta = parsed
            .iter()
            .find(|event| event["type"] == "message_delta")
            .expect("message_delta");
        assert_eq!(message_delta["delta"]["stop_reason"], "end_turn");
        assert_eq!(message_delta["usage"]["output_tokens"], 5);
        assert!(parsed.iter().any(|event| event["type"] == "message_stop"));
    }

    #[test]
    fn openai_parallel_tool_call_stream_keeps_claude_blocks_open_until_finish() {
        let mut state = StreamTransformState::new(
            Protocol::Openai,
            Protocol::Anthropic,
            "claude-sonnet-4-20250514",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_parallel",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {
                            "tool_calls": [
                                {
                                    "index": 0,
                                    "id": "call_weather",
                                    "type": "function",
                                    "function": {"name": "get_weather", "arguments": ""}
                                },
                                {
                                    "index": 1,
                                    "id": "call_time",
                                    "type": "function",
                                    "function": {"name": "get_time", "arguments": ""}
                                }
                            ]
                        },
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_parallel",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {
                            "tool_calls": [
                                {"index": 0, "function": {"arguments": "{\"city\""}},
                                {"index": 1, "function": {"arguments": "{\"zone\""}}
                            ]
                        },
                        "finish_reason": null
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "id": "chatcmpl_parallel",
                    "object": "chat.completion.chunk",
                    "model": "gpt-5",
                    "choices": [{
                        "index": 0,
                        "delta": {
                            "tool_calls": [
                                {"index": 0, "function": {"arguments": ":\"NYC\"}"}},
                                {"index": 1, "function": {"arguments": ":\"UTC\"}"}}
                            ]
                        },
                        "finish_reason": "tool_calls"
                    }]
                })
                .to_string(),
            )),
        );

        let parsed = parse_json_events(&outputs);
        let mut stopped_indexes = std::collections::HashSet::new();
        let mut deltas_after_stop = Vec::new();
        for event in &parsed {
            if event["type"] == "content_block_stop" {
                if let Some(index) = event["index"].as_u64() {
                    stopped_indexes.insert(index);
                }
            }
            if event["type"] == "content_block_delta" {
                if let Some(index) = event["index"].as_u64() {
                    if stopped_indexes.contains(&index) {
                        deltas_after_stop.push(index);
                    }
                }
            }
        }

        assert!(
            deltas_after_stop.is_empty(),
            "must not emit deltas for stopped Claude blocks: {deltas_after_stop:?}"
        );
        let starts = parsed
            .iter()
            .filter(|event| event["type"] == "content_block_start")
            .collect::<Vec<_>>();
        assert_eq!(starts.len(), 2);
        assert_eq!(starts[0]["content_block"]["id"], "call_weather");
        assert_eq!(starts[1]["content_block"]["id"], "call_time");
        let stops = parsed
            .iter()
            .filter(|event| event["type"] == "content_block_stop")
            .count();
        assert_eq!(stops, 2);
    }

    #[test]
    fn gemini_function_call_stream_finishes_openai_with_tool_calls() {
        let mut state =
            StreamTransformState::new(Protocol::Google, Protocol::Openai, "gemini-2.5-pro");

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "candidates": [{
                        "index": 0,
                        "content": {
                            "role": "model",
                            "parts": [{
                                "functionCall": {
                                    "name": "get_weather",
                                    "args": {"city": "NYC"}
                                }
                            }]
                        }
                    }]
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "candidates": [{
                        "index": 0,
                        "content": {"role": "model", "parts": []},
                        "finishReason": "STOP"
                    }]
                })
                .to_string(),
            )),
        );

        let parsed = parse_json_events(&outputs);
        assert!(parsed.iter().any(|event| {
            event["choices"][0]["delta"]
                .get("tool_calls")
                .and_then(|value| value.as_array())
                .and_then(|calls| calls.first())
                .and_then(|call| call.get("function"))
                .and_then(|function| function.get("name"))
                .and_then(|name| name.as_str())
                == Some("get_weather")
        }));
        assert!(parsed
            .iter()
            .any(|event| { event["choices"][0]["finish_reason"].as_str() == Some("tool_calls") }));
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
    }

    #[test]
    fn gemini_stream_to_openai_chat_preserves_text_then_function_call_order_and_id() {
        let mut state =
            StreamTransformState::new(Protocol::Google, Protocol::Openai, "gemini-2.5-pro");

        let outputs = state.transform(SseEvent::new(
            json!({
                "candidates": [{
                    "index": 0,
                    "content": {
                        "role": "model",
                        "parts": [
                            {"text": "I will inspect it. "},
                            {
                                "functionCall": {
                                    "name": "local_shell",
                                    "args": {
                                        "command": ["pwd"],
                                        "working_directory": "/repo"
                                    }
                                }
                            }
                        ]
                    },
                    "finishReason": "STOP"
                }],
                "usageMetadata": {
                    "promptTokenCount": 7,
                    "candidatesTokenCount": 5,
                    "totalTokenCount": 12
                }
            })
            .to_string(),
        ));

        let parsed = parse_json_events(&outputs);
        let content_delta_index = parsed
            .iter()
            .position(|event| {
                event["choices"][0]["delta"]["content"].as_str() == Some("I will inspect it. ")
            })
            .expect("content delta");
        let tool_delta_index = parsed
            .iter()
            .position(|event| {
                event["choices"][0]["delta"]
                    .get("tool_calls")
                    .and_then(|value| value.as_array())
                    .and_then(|calls| calls.first())
                    .is_some()
            })
            .expect("tool call delta");
        assert!(
            content_delta_index < tool_delta_index,
            "text delta must be emitted before following Gemini functionCall"
        );

        let tool_call = &parsed[tool_delta_index]["choices"][0]["delta"]["tool_calls"][0];
        assert_eq!(tool_call["index"], 0);
        assert!(tool_call["id"]
            .as_str()
            .is_some_and(|id| id.starts_with("call_")));
        assert_eq!(tool_call["type"], "function");
        assert_eq!(tool_call["function"]["name"], "local_shell");
        assert_eq!(
            tool_call["function"]["arguments"],
            "{\"command\":[\"pwd\"],\"working_directory\":\"/repo\"}"
        );
        assert!(parsed
            .iter()
            .any(|event| event["choices"][0]["finish_reason"].as_str() == Some("tool_calls")));
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
    }

    #[test]
    fn gemini_stream_to_openai_chat_emits_final_usage_chunk_before_done() {
        let mut state =
            StreamTransformState::new(Protocol::Google, Protocol::Openai, "gemini-2.5-pro");

        let outputs = state.transform(SseEvent::new(
            json!({
                "candidates": [{
                    "index": 0,
                    "content": {
                        "role": "model",
                        "parts": [{"text": "ok"}]
                    },
                    "finishReason": "STOP"
                }],
                "usageMetadata": {
                    "promptTokenCount": 8,
                    "candidatesTokenCount": 3,
                    "totalTokenCount": 11
                }
            })
            .to_string(),
        ));

        let parsed = parse_json_events(&outputs);
        let usage_chunk_index = parsed
            .iter()
            .position(|event| {
                event["choices"]
                    .as_array()
                    .is_some_and(|choices| choices.is_empty())
            })
            .expect("final usage chunk");
        assert_eq!(parsed[usage_chunk_index]["usage"]["prompt_tokens"], 8);
        assert_eq!(parsed[usage_chunk_index]["usage"]["completion_tokens"], 3);
        assert_eq!(parsed[usage_chunk_index]["usage"]["total_tokens"], 11);
        assert!(
            usage_chunk_index + 1 < outputs.len(),
            "usage chunk must be emitted before DONE"
        );
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
    }

    #[test]
    fn gemini_stream_to_openai_chat_flush_preserves_usage_when_finish_missing() {
        let mut state =
            StreamTransformState::new(Protocol::Google, Protocol::Openai, "gemini-2.5-pro");

        let mut outputs = state.transform(SseEvent::new(
            json!({
                "candidates": [{
                    "index": 0,
                    "content": {
                        "role": "model",
                        "parts": [{"text": "ok"}]
                    }
                }],
                "usageMetadata": {
                    "promptTokenCount": 8,
                    "candidatesTokenCount": 3,
                    "totalTokenCount": 11
                }
            })
            .to_string(),
        ));
        outputs.extend(state.flush());

        let parsed = parse_json_events(&outputs);
        let usage_chunk_index = parsed
            .iter()
            .position(|event| {
                event["choices"]
                    .as_array()
                    .is_some_and(|choices| choices.is_empty())
            })
            .expect("final usage chunk");
        assert_eq!(parsed[usage_chunk_index]["usage"]["prompt_tokens"], 8);
        assert_eq!(parsed[usage_chunk_index]["usage"]["completion_tokens"], 3);
        assert_eq!(parsed[usage_chunk_index]["usage"]["total_tokens"], 11);
        assert_eq!(outputs.last().expect("done event").data, "[DONE]");
    }

    #[test]
    fn gemini_stream_to_claude_messages_emits_anthropic_sse_for_claude_code() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Google,
            Protocol::Anthropic,
            ApiSurface::GeminiGenerateContent,
            ApiSurface::AnthropicMessages,
            "gemini-2.5-pro",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "candidates": [{
                        "index": 0,
                        "content": {
                            "role": "model",
                            "parts": [
                                {"text": "I will inspect it. "},
                                {
                                    "functionCall": {
                                        "name": "local_shell",
                                        "args": {
                                            "command": ["pwd"],
                                            "working_directory": "/repo"
                                        }
                                    }
                                }
                            ]
                        }
                    }],
                    "usageMetadata": {"promptTokenCount": 7, "candidatesTokenCount": 2}
                })
                .to_string(),
            )),
        );
        outputs.extend(
            state.transform(SseEvent::new(
                json!({
                    "candidates": [{
                        "index": 0,
                        "content": {"role": "model", "parts": []},
                        "finishReason": "STOP"
                    }],
                    "usageMetadata": {
                        "promptTokenCount": 7,
                        "candidatesTokenCount": 5,
                        "totalTokenCount": 12
                    }
                })
                .to_string(),
            )),
        );

        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("message_start")));
        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("content_block_delta")));
        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("message_delta")));
        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("message_stop")));
        assert!(
            outputs.iter().all(|event| {
                event.data != "[DONE]"
                    && serde_json::from_str::<Value>(&event.data)
                        .ok()
                        .and_then(|parsed| {
                            parsed
                                .get("object")
                                .and_then(|value| value.as_str())
                                .map(str::to_owned)
                        })
                        .map(|object| !object.starts_with("chat.completion"))
                        .unwrap_or(true)
            }),
            "Claude Code stream must not receive OpenAI Chat chunks or [DONE]"
        );

        let parsed = parse_json_events(&outputs);
        let text_delta = parsed
            .iter()
            .find(|event| event["delta"]["type"] == "text_delta")
            .expect("text delta");
        assert_eq!(text_delta["delta"]["text"], "I will inspect it. ");
        let tool_start = parsed
            .iter()
            .find(|event| event["content_block"]["type"] == "tool_use")
            .expect("tool_use content block");
        assert_eq!(tool_start["content_block"]["name"], "local_shell");
        let json_delta = parsed
            .iter()
            .find(|event| event["delta"]["type"] == "input_json_delta")
            .expect("tool input delta");
        assert_eq!(
            json_delta["delta"]["partial_json"],
            "{\"command\":[\"pwd\"],\"working_directory\":\"/repo\"}"
        );
        let message_delta = parsed
            .iter()
            .find(|event| event["type"] == "message_delta")
            .expect("message_delta");
        assert_eq!(
            message_delta["delta"]["stop_reason"].as_str(),
            Some("tool_use")
        );
        assert_eq!(message_delta["usage"]["output_tokens"], 5);
    }

    #[test]
    fn openai_responses_stream_to_claude_messages_emits_anthropic_sse_for_claude_code() {
        let mut state = StreamTransformState::new_for_surfaces(
            Protocol::Openai,
            Protocol::Anthropic,
            ApiSurface::OpenAiResponses,
            ApiSurface::AnthropicMessages,
            "gpt-5.5",
        );

        let mut outputs = Vec::new();
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.created",
                        "response": {
                            "id": "resp_abc",
                            "object": "response",
                            "status": "in_progress",
                            "model": "gpt-5.5",
                            "output": [],
                            "usage": {"input_tokens": 11, "output_tokens": 0, "total_tokens": 11}
                        }
                    })
                    .to_string(),
                )
                .with_event("response.created"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.output_text.delta",
                        "item_id": "msg_1",
                        "output_index": 0,
                        "content_index": 0,
                        "delta": "hello"
                    })
                    .to_string(),
                )
                .with_event("response.output_text.delta"),
            ),
        );
        outputs.extend(
            state.transform(
                SseEvent::new(
                    json!({
                        "type": "response.completed",
                        "response": {
                            "id": "resp_abc",
                            "object": "response",
                            "status": "completed",
                            "model": "gpt-5.5",
                            "output": [{
                                "type": "message",
                                "id": "msg_1",
                                "role": "assistant",
                                "content": [{"type": "output_text", "text": "hello"}]
                            }],
                            "output_text": "hello",
                            "usage": {"input_tokens": 11, "output_tokens": 4, "total_tokens": 15}
                        }
                    })
                    .to_string(),
                )
                .with_event("response.completed"),
            ),
        );
        outputs.extend(state.transform(SseEvent::new("[DONE]")));

        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("message_start")));
        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("content_block_delta")));
        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("message_delta")));
        assert!(outputs
            .iter()
            .any(|event| event.event.as_deref() == Some("message_stop")));
        assert!(outputs.iter().all(|event| event.data != "[DONE]"));

        let parsed = parse_json_events(&outputs);
        let text_delta = parsed
            .iter()
            .find(|event| event["delta"]["type"] == "text_delta")
            .expect("text delta");
        assert_eq!(text_delta["delta"]["text"], "hello");
        let message_delta = parsed
            .iter()
            .find(|event| event["type"] == "message_delta")
            .expect("message_delta");
        assert_eq!(
            message_delta["delta"]["stop_reason"].as_str(),
            Some("end_turn")
        );
        assert_eq!(message_delta["usage"]["output_tokens"], 4);
    }

    #[test]
    fn gemini_safety_stream_maps_to_openai_content_filter_finish() {
        let mut state =
            StreamTransformState::new(Protocol::Google, Protocol::Openai, "gemini-2.5-pro");

        let outputs = state.transform(SseEvent::new(
            json!({
                "candidates": [{
                    "index": 0,
                    "content": {"role": "model", "parts": []},
                    "finishReason": "SAFETY"
                }]
            })
            .to_string(),
        ));

        let parsed = parse_json_events(&outputs);
        assert!(parsed.iter().any(|event| {
            event["choices"][0]["finish_reason"].as_str() == Some("content_filter")
        }));
    }

    #[test]
    fn gemini_unexpected_tool_call_stream_maps_to_openai_content_filter_finish() {
        let mut state =
            StreamTransformState::new(Protocol::Google, Protocol::Openai, "gemini-2.5-pro");

        let outputs = state.transform(SseEvent::new(
            json!({
                "candidates": [{
                    "index": 0,
                    "content": {"role": "model", "parts": []},
                    "finishReason": "UNEXPECTED_TOOL_CALL"
                }]
            })
            .to_string(),
        ));

        let parsed = parse_json_events(&outputs);
        assert!(parsed.iter().any(|event| {
            event["choices"][0]["finish_reason"].as_str() == Some("content_filter")
        }));
    }

    fn parse_json_events(events: &[SseEvent]) -> Vec<Value> {
        events
            .iter()
            .filter(|event| event.data != "[DONE]")
            .map(|event| serde_json::from_str::<Value>(&event.data).expect("valid JSON event"))
            .collect()
    }

    fn assert_responses_sequence_numbers_are_monotonic(events: &[Value]) {
        let mut expected = 0u64;
        for event in events {
            if event
                .get("type")
                .and_then(|value| value.as_str())
                .is_some_and(|event_type| event_type.starts_with("response."))
            {
                assert_eq!(event["sequence_number"], expected);
                expected += 1;
            }
        }
        assert!(expected > 0);
    }
}
