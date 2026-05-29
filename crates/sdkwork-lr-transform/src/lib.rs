use serde_json::Value;
use sdkwork_lr_core::Protocol;

pub mod openai_to_claude;
pub mod openai_to_gemini;
pub mod claude_to_openai;
pub mod gemini_to_openai;
pub mod streaming;

pub fn normalize_stop(stop: &Value) -> Value {
    if let Some(arr) = stop.as_array() {
        Value::Array(arr.clone())
    } else if let Some(s) = stop.as_str() {
        Value::Array(vec![Value::String(s.to_owned())])
    } else {
        Value::Array(vec![])
    }
}

pub fn openai_request_to_claude(body: &Value) -> Result<Value, String> {
    openai_to_claude::transform_request(body)
}

pub fn claude_response_to_openai(body: &Value, model: &str) -> Result<Value, String> {
    claude_to_openai::transform_response(body, model)
}

pub fn openai_request_to_gemini(body: &Value) -> Result<Value, String> {
    openai_to_gemini::transform_request(body)
}

pub fn gemini_response_to_openai(body: &Value, model: &str) -> Result<Value, String> {
    gemini_to_openai::transform_response(body, model)
}

pub fn transform_request_body(
    body: &Value,
    source: Protocol,
    target: Protocol,
) -> Result<Value, String> {
    match (source, target) {
        (Protocol::Openai, Protocol::Anthropic) => openai_request_to_claude(body),
        (Protocol::Openai, Protocol::Google) => openai_request_to_gemini(body),
        (Protocol::Anthropic, Protocol::Openai) => claude_request_to_openai(body),
        (Protocol::Google, Protocol::Openai) => gemini_request_to_openai(body),
        (Protocol::Anthropic, Protocol::Google) => {
            let openai_body = claude_request_to_openai(body)?;
            openai_request_to_gemini(&openai_body)
        }
        (Protocol::Google, Protocol::Anthropic) => {
            let openai_body = gemini_request_to_openai(body)?;
            openai_request_to_claude(&openai_body)
        }
        _ => Err(format!("unsupported transformation: {:?} -> {:?}", source, target)),
    }
}

pub fn transform_response_body(
    body: &Value,
    source: Protocol,
    target: Protocol,
    model: &str,
) -> Result<Value, String> {
    match (source, target) {
        (Protocol::Anthropic, Protocol::Openai) => claude_response_to_openai(body, model),
        (Protocol::Google, Protocol::Openai) => gemini_response_to_openai(body, model),
        (Protocol::Openai, Protocol::Anthropic) => openai_response_to_claude(body, model),
        (Protocol::Openai, Protocol::Google) => openai_response_to_gemini(body, model),
        (Protocol::Anthropic, Protocol::Google) => {
            let openai_body = claude_response_to_openai(body, model)?;
            openai_response_to_gemini(&openai_body, model)
        }
        (Protocol::Google, Protocol::Anthropic) => {
            let openai_body = gemini_response_to_openai(body, model)?;
            openai_response_to_claude(&openai_body, model)
        }
        _ => Err(format!("unsupported transformation: {:?} -> {:?}", source, target)),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use sdkwork_lr_core::Protocol;

    #[test]
    fn test_openai_to_claude_request_transform() {
        let openai_body = serde_json::json!({
            "model": "gpt-4",
            "messages": [
                {"role": "system", "content": "You are helpful."},
                {"role": "user", "content": "Hello"}
            ],
            "max_tokens": 1024,
            "temperature": 0.7,
            "stream": false
        });

        let result = transform_request_body(&openai_body, Protocol::Openai, Protocol::Anthropic);
        assert!(result.is_ok());
        let claude_body = result.unwrap();
        assert!(claude_body.get("messages").is_some());
        assert_eq!(claude_body.get("max_tokens").and_then(|v| v.as_u64()), Some(1024));
    }

    #[test]
    fn test_openai_to_gemini_request_transform() {
        let openai_body = serde_json::json!({
            "model": "gpt-4",
            "messages": [
                {"role": "system", "content": "You are helpful."},
                {"role": "user", "content": "Hello"}
            ],
            "max_tokens": 512
        });

        let result = transform_request_body(&openai_body, Protocol::Openai, Protocol::Google);
        assert!(result.is_ok());
        let gemini_body = result.unwrap();
        assert!(gemini_body.get("contents").is_some());
    }

    #[test]
    fn test_claude_to_openai_request_transform() {
        let claude_body = serde_json::json!({
            "model": "claude-3",
            "system": "You are helpful.",
            "messages": [
                {"role": "user", "content": "Hello"}
            ],
            "max_tokens": 1024
        });

        let result = transform_request_body(&claude_body, Protocol::Anthropic, Protocol::Openai);
        assert!(result.is_ok());
        let openai_body = result.unwrap();
        assert!(openai_body.get("messages").is_some());
        let messages = openai_body.get("messages").unwrap().as_array().unwrap();
        assert!(messages.iter().any(|m| m.get("role").and_then(|v| v.as_str()) == Some("system")));
    }

    #[test]
    fn test_gemini_to_openai_request_transform() {
        let gemini_body = serde_json::json!({
            "contents": [
                {"role": "user", "parts": [{"text": "Hello"}]}
            ],
            "systemInstruction": {"parts": [{"text": "You are helpful."}]},
            "generationConfig": {
                "maxOutputTokens": 512,
                "temperature": 0.5
            }
        });

        let result = transform_request_body(&gemini_body, Protocol::Google, Protocol::Openai);
        assert!(result.is_ok());
        let openai_body = result.unwrap();
        assert!(openai_body.get("messages").is_some());
        assert_eq!(openai_body.get("max_tokens").and_then(|v| v.as_u64()), Some(512));
    }

    #[test]
    fn test_claude_to_openai_response_transform() {
        let claude_response = serde_json::json!({
            "id": "msg_123",
            "type": "message",
            "role": "assistant",
            "content": [{"type": "text", "text": "Hello there!"}],
            "model": "claude-3",
            "stop_reason": "end_turn",
            "usage": {"input_tokens": 10, "output_tokens": 5}
        });

        let result = transform_response_body(&claude_response, Protocol::Anthropic, Protocol::Openai, "claude-3");
        assert!(result.is_ok());
        let openai_response = result.unwrap();
        assert!(openai_response.get("choices").is_some());
        assert!(openai_response.get("usage").is_some());
    }

    #[test]
    fn test_gemini_to_openai_response_transform() {
        let gemini_response = serde_json::json!({
            "candidates": [{
                "content": {"parts": [{"text": "Hello!"}], "role": "model"},
                "finishReason": "STOP",
                "index": 0
            }],
            "usageMetadata": {
                "promptTokenCount": 10,
                "candidatesTokenCount": 5,
                "totalTokenCount": 15
            }
        });

        let result = transform_response_body(&gemini_response, Protocol::Google, Protocol::Openai, "gemini-pro");
        assert!(result.is_ok());
        let openai_response = result.unwrap();
        assert!(openai_response.get("choices").is_some());
    }

    #[test]
    fn test_openai_to_claude_response_transform() {
        let openai_response = serde_json::json!({
            "id": "chatcmpl-123",
            "choices": [{
                "message": {"role": "assistant", "content": "Hi!"},
                "finish_reason": "stop"
            }],
            "usage": {"prompt_tokens": 10, "completion_tokens": 5}
        });

        let result = transform_response_body(&openai_response, Protocol::Openai, Protocol::Anthropic, "gpt-4");
        assert!(result.is_ok());
        let claude_response = result.unwrap();
        assert_eq!(claude_response.get("type").and_then(|v| v.as_str()), Some("message"));
        assert!(claude_response.get("content").is_some());
    }

    #[test]
    fn test_openai_to_gemini_response_transform() {
        let openai_response = serde_json::json!({
            "id": "chatcmpl-123",
            "choices": [{
                "message": {"role": "assistant", "content": "Hi!"},
                "finish_reason": "stop"
            }],
            "usage": {"prompt_tokens": 10, "completion_tokens": 5}
        });

        let result = transform_response_body(&openai_response, Protocol::Openai, Protocol::Google, "gpt-4");
        assert!(result.is_ok());
        let gemini_response = result.unwrap();
        assert!(gemini_response.get("candidates").is_some());
    }

    #[test]
    fn test_claude_to_gemini_request_roundtrip() {
        let claude_body = serde_json::json!({
            "model": "claude-3",
            "system": "You are helpful.",
            "messages": [
                {"role": "user", "content": "Hello"}
            ],
            "max_tokens": 1024
        });

        let result = transform_request_body(&claude_body, Protocol::Anthropic, Protocol::Google);
        assert!(result.is_ok());
        let gemini_body = result.unwrap();
        assert!(gemini_body.get("contents").is_some());
    }

    #[test]
    fn test_gemini_to_claude_request_roundtrip() {
        let gemini_body = serde_json::json!({
            "contents": [
                {"role": "user", "parts": [{"text": "Hello"}]}
            ],
            "systemInstruction": {"parts": [{"text": "You are helpful."}]},
            "generationConfig": {
                "maxOutputTokens": 512
            }
        });

        let result = transform_request_body(&gemini_body, Protocol::Google, Protocol::Anthropic);
        assert!(result.is_ok());
        let claude_body = result.unwrap();
        assert!(claude_body.get("messages").is_some());
    }

    #[test]
    fn test_unsupported_transformation_returns_error() {
        let body = serde_json::json!({});
        let result = transform_request_body(&body, Protocol::Openai, Protocol::Openai);
        assert!(result.is_err());
    }

    #[test]
    fn test_claude_request_with_tool_use_to_openai() {
        let claude_body = serde_json::json!({
            "model": "claude-3",
            "messages": [
                {"role": "user", "content": "What is the weather?"},
                {
                    "role": "assistant",
                    "content": [
                        {"type": "text", "text": "Let me check."},
                        {"type": "tool_use", "id": "tool_1", "name": "get_weather", "input": {"city": "NYC"}}
                    ]
                },
                {
                    "role": "user",
                    "content": [
                        {"type": "tool_result", "tool_use_id": "tool_1", "content": "Sunny, 72F"}
                    ]
                }
            ],
            "tools": [
                {
                    "name": "get_weather",
                    "description": "Get weather",
                    "input_schema": {"type": "object", "properties": {"city": {"type": "string"}}}
                }
            ],
            "max_tokens": 1024
        });

        let result = transform_request_body(&claude_body, Protocol::Anthropic, Protocol::Openai);
        assert!(result.is_ok());
        let openai_body = result.unwrap();
        let messages = openai_body.get("messages").unwrap().as_array().unwrap();
        assert!(messages.iter().any(|m| m.get("role").and_then(|v| v.as_str()) == Some("tool")));
        assert!(openai_body.get("tools").is_some());
    }
}

fn claude_request_to_openai(body: &Value) -> Result<Value, String> {
    let system = body.get("system");
    let messages = body.get("messages").ok_or("missing messages field")?;
    let messages_arr = messages.as_array().ok_or("messages must be an array")?;

    let mut openai_messages = Vec::new();

    if let Some(sys) = system {
        let system_text = if let Some(text) = sys.as_str() {
            text.to_owned()
        } else if let Some(arr) = sys.as_array() {
            arr.iter()
                .filter_map(|block| {
                    if block.get("type").and_then(|v| v.as_str()) == Some("text") {
                        block.get("text").and_then(|t| t.as_str()).map(String::from)
                    } else {
                        block.as_str().map(String::from)
                    }
                })
                .collect::<Vec<_>>()
                .join("\n")
        } else {
            String::new()
        };
        if !system_text.is_empty() {
            openai_messages.push(serde_json::json!({
                "role": "system",
                "content": system_text
            }));
        }
    }

    for msg in messages_arr {
        let role = msg.get("role").and_then(|v| v.as_str()).unwrap_or("");
        let content = msg.get("content").cloned().unwrap_or(Value::Null);

        if role == "user" {
            if let Some(content_arr) = content.as_array() {
                let has_tool_result = content_arr.iter().any(|block| {
                    block.get("type").and_then(|v| v.as_str()) == Some("tool_result")
                });

                if has_tool_result {
                    for block in content_arr {
                        if block.get("type").and_then(|v| v.as_str()) == Some("tool_result") {
                            let tool_use_id = block.get("tool_use_id").and_then(|v| v.as_str()).unwrap_or("");
                            let tool_content = block.get("content").and_then(|v| v.as_str()).unwrap_or("");
                            openai_messages.push(serde_json::json!({
                                "role": "tool",
                                "tool_call_id": tool_use_id,
                                "content": tool_content
                            }));
                        }
                    }
                    continue;
                }
            }
        }

        if role == "assistant" {
            let mut openai_msg = serde_json::json!({
                "role": "assistant",
                "content": Value::Null,
            });

            if let Some(content_arr) = content.as_array() {
                let mut text_parts = Vec::new();
                let mut tool_calls = Vec::new();

                for (idx, block) in content_arr.iter().enumerate() {
                    let block_type = block.get("type").and_then(|v| v.as_str()).unwrap_or("");
                    match block_type {
                        "text" => {
                            if let Some(text) = block.get("text").and_then(|v| v.as_str()) {
                                text_parts.push(text.to_owned());
                            }
                        }
                        "tool_use" => {
                            let id = block.get("id").and_then(|v| v.as_str()).unwrap_or("").to_owned();
                            let name = block.get("name").and_then(|v| v.as_str()).unwrap_or("").to_owned();
                            let input = block.get("input").cloned().unwrap_or(serde_json::json!({}));
                            let arguments = serde_json::to_string(&input).unwrap_or_default();

                            tool_calls.push(serde_json::json!({
                                "id": id,
                                "type": "function",
                                "function": {
                                    "name": name,
                                    "arguments": arguments
                                },
                                "index": idx
                            }));
                        }
                        _ => {}
                    }
                }

                let text = text_parts.join("");
                if !text.is_empty() {
                    openai_msg["content"] = Value::String(text);
                }
                if !tool_calls.is_empty() {
                    openai_msg["tool_calls"] = serde_json::json!(tool_calls);
                }
            } else if let Some(text) = content.as_str() {
                openai_msg["content"] = Value::String(text.to_owned());
            }

            openai_messages.push(openai_msg);
            continue;
        }

        openai_messages.push(serde_json::json!({
            "role": role,
            "content": content
        }));
    }

    let mut result = serde_json::json!({"messages": openai_messages});

    if let Some(max_tokens) = body.get("max_tokens") {
        result["max_tokens"] = max_tokens.clone();
    }
    if let Some(temperature) = body.get("temperature") {
        result["temperature"] = temperature.clone();
    }
    if let Some(stop) = body.get("stop_sequences") {
        result["stop"] = stop.clone();
    }
    if let Some(stream) = body.get("stream") {
        result["stream"] = stream.clone();
    }
    if let Some(model) = body.get("model") {
        result["model"] = model.clone();
    }

    if let Some(tools) = body.get("tools").and_then(|v| v.as_array()) {
        let openai_tools: Vec<Value> = tools.iter().map(|tool| {
            let name = tool.get("name").and_then(|v| v.as_str()).unwrap_or("");
            let description = tool.get("description").and_then(|v| v.as_str()).unwrap_or("");
            let parameters = tool.get("input_schema").cloned().unwrap_or(serde_json::json!({"type": "object", "properties": {}}));
            serde_json::json!({
                "type": "function",
                "function": {
                    "name": name,
                    "description": description,
                    "parameters": parameters
                }
            })
        }).collect();

        if !openai_tools.is_empty() {
            result["tools"] = serde_json::json!(openai_tools);
        }
    }

    Ok(result)
}

fn gemini_request_to_openai(body: &Value) -> Result<Value, String> {
    let contents = body.get("contents").ok_or("missing contents field")?;
    let contents_arr = contents.as_array().ok_or("contents must be an array")?;

    let mut openai_messages = Vec::new();

    if let Some(sys) = body.get("systemInstruction") {
        let text = sys.get("parts")
            .and_then(|p| p.as_array())
            .and_then(|p| p.first())
            .and_then(|p| p.get("text"))
            .and_then(|t| t.as_str())
            .unwrap_or("");
        if !text.is_empty() {
            openai_messages.push(serde_json::json!({"role": "system", "content": text}));
        }
    }

    for content in contents_arr {
        let role = content.get("role").and_then(|v| v.as_str()).unwrap_or("user");
        let openai_role = match role {
            "model" => "assistant",
            _ => role,
        };
        let parts = content.get("parts").and_then(|p| p.as_array());
        let text = parts.map(|p| {
            p.iter()
                .filter_map(|part| part.get("text").and_then(|t| t.as_str()))
                .collect::<Vec<_>>()
                .join("")
        }).unwrap_or_default();

        openai_messages.push(serde_json::json!({"role": openai_role, "content": text}));
    }

    let mut result = serde_json::json!({"messages": openai_messages});

    if let Some(gen_config) = body.get("generationConfig") {
        if let Some(max) = gen_config.get("maxOutputTokens") {
            result["max_tokens"] = max.clone();
        }
        if let Some(temp) = gen_config.get("temperature") {
            result["temperature"] = temp.clone();
        }
        if let Some(stop) = gen_config.get("stopSequences") {
            result["stop"] = stop.clone();
        }
    }

    Ok(result)
}

fn openai_response_to_claude(body: &Value, model: &str) -> Result<Value, String> {
    let message = body.get("choices")
        .and_then(|c| c.as_array())
        .and_then(|c| c.first())
        .and_then(|c| c.get("message"));

    let mut content_blocks = Vec::new();

    if let Some(msg) = message {
        let content = msg.get("content");
        if let Some(text) = content.and_then(|c| c.as_str()) {
            if !text.is_empty() {
                content_blocks.push(serde_json::json!({
                    "type": "text",
                    "text": text
                }));
            }
        } else if let Some(content_arr) = content.and_then(|c| c.as_array()) {
            for part in content_arr {
                if part.get("type").and_then(|v| v.as_str()) == Some("text") {
                    if let Some(text) = part.get("text").and_then(|v| v.as_str()) {
                        if !text.is_empty() {
                            content_blocks.push(serde_json::json!({
                                "type": "text",
                                "text": text
                            }));
                        }
                    }
                }
            }
        }

        if let Some(tool_calls) = msg.get("tool_calls").and_then(|t| t.as_array()) {
            for tc in tool_calls {
                let id = tc.get("id").and_then(|v| v.as_str()).unwrap_or("").to_owned();
                let name = tc.get("function")
                    .and_then(|f| f.get("name"))
                    .and_then(|n| n.as_str())
                    .unwrap_or("")
                    .to_owned();
                let arguments_str = tc.get("function")
                    .and_then(|f| f.get("arguments"))
                    .and_then(|a| a.as_str())
                    .unwrap_or("{}");
                let input: Value = serde_json::from_str(arguments_str).unwrap_or(serde_json::json!({}));

                content_blocks.push(serde_json::json!({
                    "type": "tool_use",
                    "id": id,
                    "name": name,
                    "input": input
                }));
            }
        }
    }

    if content_blocks.is_empty() {
        content_blocks.push(serde_json::json!({"type": "text", "text": ""}));
    }

    let finish_reason = body.get("choices")
        .and_then(|c| c.as_array())
        .and_then(|c| c.first())
        .and_then(|c| c.get("finish_reason"))
        .and_then(|f| f.as_str());

    let stop_reason = match finish_reason {
        Some("stop") => "end_turn",
        Some("length") => "max_tokens",
        Some("tool_calls") => "tool_use",
        _ => "end_turn",
    };

    let usage = body.get("usage");
    let input_tokens = usage.and_then(|u| u.get("prompt_tokens")).and_then(|v| v.as_u64()).unwrap_or(0);
    let output_tokens = usage.and_then(|u| u.get("completion_tokens")).and_then(|v| v.as_u64()).unwrap_or(0);

    Ok(serde_json::json!({
        "id": format!("msg_{}", uuid::Uuid::new_v4()),
        "type": "message",
        "role": "assistant",
        "content": content_blocks,
        "model": model,
        "stop_reason": stop_reason,
        "stop_sequence": null,
        "usage": {"input_tokens": input_tokens, "output_tokens": output_tokens}
    }))
}

fn openai_response_to_gemini(body: &Value, _model: &str) -> Result<Value, String> {
    let message = body.get("choices")
        .and_then(|c| c.as_array())
        .and_then(|c| c.first())
        .and_then(|c| c.get("message"));

    let mut parts = Vec::new();

    if let Some(msg) = message {
        let content = msg.get("content");
        if let Some(text) = content.and_then(|c| c.as_str()) {
            if !text.is_empty() {
                parts.push(serde_json::json!({"text": text}));
            }
        } else if let Some(content_arr) = content.and_then(|c| c.as_array()) {
            for part in content_arr {
                if part.get("type").and_then(|v| v.as_str()) == Some("text") {
                    if let Some(text) = part.get("text").and_then(|v| v.as_str()) {
                        if !text.is_empty() {
                            parts.push(serde_json::json!({"text": text}));
                        }
                    }
                }
            }
        }

        if let Some(tool_calls) = msg.get("tool_calls").and_then(|t| t.as_array()) {
            for tc in tool_calls {
                let name = tc.get("function")
                    .and_then(|f| f.get("name"))
                    .and_then(|n| n.as_str())
                    .unwrap_or("");
                let arguments_str = tc.get("function")
                    .and_then(|f| f.get("arguments"))
                    .and_then(|a| a.as_str())
                    .unwrap_or("{}");

                parts.push(serde_json::json!({
                    "functionCall": {
                        "name": name,
                        "args": serde_json::from_str::<Value>(arguments_str).unwrap_or(serde_json::json!({}))
                    }
                }));
            }
        }
    }

    if parts.is_empty() {
        parts.push(serde_json::json!({"text": ""}));
    }

    let finish_reason = body.get("choices")
        .and_then(|c| c.as_array())
        .and_then(|c| c.first())
        .and_then(|c| c.get("finish_reason"))
        .and_then(|f| f.as_str());

    let gemini_finish = match finish_reason {
        Some("stop") => "STOP",
        Some("length") => "MAX_TOKENS",
        Some("tool_calls") => "STOP",
        _ => "STOP",
    };

    let usage = body.get("usage");
    let prompt_tokens = usage.and_then(|u| u.get("prompt_tokens")).and_then(|v| v.as_u64()).unwrap_or(0);
    let completion_tokens = usage.and_then(|u| u.get("completion_tokens")).and_then(|v| v.as_u64()).unwrap_or(0);

    Ok(serde_json::json!({
        "candidates": [{
            "content": {"parts": parts, "role": "model"},
            "finishReason": gemini_finish,
            "index": 0
        }],
        "usageMetadata": {
            "promptTokenCount": prompt_tokens,
            "candidatesTokenCount": completion_tokens,
            "totalTokenCount": prompt_tokens + completion_tokens
        }
    }))
}
