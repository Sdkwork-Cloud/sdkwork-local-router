﻿use serde_json::{json, Value};

pub fn transform_response(claude_body: &Value, model: &str) -> Result<Value, String> {
    let content = claude_body.get("content").and_then(|v| v.as_array());
    let stop_reason = claude_body.get("stop_reason").and_then(|v| v.as_str());

    let mut text_parts = Vec::new();
    let mut tool_calls = Vec::new();

    if let Some(blocks) = content {
        for (idx, block) in blocks.iter().enumerate() {
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
                    let arguments = block.get("input").cloned().unwrap_or(json!({}));
                    let arguments_str = serde_json::to_string(&arguments).unwrap_or_default();

                    tool_calls.push(json!({
                        "id": id,
                        "type": "function",
                        "function": {
                            "name": name,
                            "arguments": arguments_str
                        },
                        "index": idx
                    }));
                }
                "thinking" => {
                    if let Some(thinking) = block.get("thinking").and_then(|v| v.as_str()) {
                        text_parts.push(format!("<thinking>\n{}\n</thinking>", thinking));
                    }
                }
                _ => {}
            }
        }
    }

    let text = text_parts.join("");
    let finish_reason = match stop_reason {
        Some("end_turn") | Some("stop") => "stop",
        Some("max_tokens") => "length",
        Some("tool_use") => "tool_calls",
        _ => "stop",
    };

    let usage = claude_body.get("usage").map(|u| {
        json!({
            "prompt_tokens": u.get("input_tokens").and_then(|v| v.as_u64()).unwrap_or(0),
            "completion_tokens": u.get("output_tokens").and_then(|v| v.as_u64()).unwrap_or(0),
            "total_tokens": u.get("input_tokens").and_then(|v| v.as_u64()).unwrap_or(0)
                + u.get("output_tokens").and_then(|v| v.as_u64()).unwrap_or(0),
        })
    }).unwrap_or_else(|| json!({"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}));

    let mut message = json!({
        "role": "assistant",
        "content": if text.is_empty() && !tool_calls.is_empty() { Value::Null } else { Value::String(text) },
    });

    if !tool_calls.is_empty() {
        message["tool_calls"] = json!(tool_calls);
    }

    Ok(json!({
        "id": claude_body.get("id").cloned().unwrap_or_else(|| Value::String("chatcmpl-unknown".to_owned())),
        "object": "chat.completion",
        "created": unix_timestamp_secs(),
        "model": model,
        "choices": [{
            "index": 0,
            "message": message,
            "finish_reason": finish_reason,
        }],
        "usage": usage,
    }))
}

fn unix_timestamp_secs() -> u64 {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs()
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn text_response_conversion() {
        let input = json!({
            "id": "msg_123",
            "content": [{"type": "text", "text": "Hello!"}],
            "stop_reason": "end_turn",
            "usage": {"input_tokens": 10, "output_tokens": 5}
        });
        let result = transform_response(&input, "claude-3-sonnet").unwrap();
        assert_eq!(result["object"], "chat.completion");
        assert_eq!(result["model"], "claude-3-sonnet");
        assert_eq!(result["choices"][0]["message"]["content"], "Hello!");
        assert_eq!(result["choices"][0]["finish_reason"], "stop");
        assert_eq!(result["usage"]["prompt_tokens"], 10);
        assert_eq!(result["usage"]["completion_tokens"], 5);
    }

    #[test]
    fn tool_use_response_conversion() {
        let input = json!({
            "id": "msg_456",
            "content": [{"type": "tool_use", "id": "toolu_123", "name": "get_weather", "input": {"city": "NYC"}}],
            "stop_reason": "tool_use"
        });
        let result = transform_response(&input, "claude-3-sonnet").unwrap();
        assert_eq!(result["choices"][0]["finish_reason"], "tool_calls");
        let tool_calls = result["choices"][0]["message"]["tool_calls"].as_array().unwrap();
        assert_eq!(tool_calls[0]["function"]["name"], "get_weather");
        assert_eq!(result["choices"][0]["message"]["content"], serde_json::Value::Null);
    }
}
