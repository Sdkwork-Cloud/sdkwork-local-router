use crate::normalize_stop;
use serde_json::{json, Value};

pub fn transform_request(openai_body: &Value) -> Result<Value, String> {
    let messages = openai_body
        .get("messages")
        .ok_or("missing messages field")?;
    let messages_arr = messages.as_array().ok_or("messages must be an array")?;

    let mut system_parts = Vec::new();
    let mut claude_messages = Vec::new();

    for msg in messages_arr {
        let role = msg.get("role").and_then(|v| v.as_str()).unwrap_or("");
        let content = msg.get("content").cloned().unwrap_or(Value::Null);

        match role {
            "system" | "developer" => {
                if let Some(text) = content.as_str() {
                    system_parts.push(text.to_owned());
                } else if let Some(arr) = content.as_array() {
                    for part in arr {
                        if let Some(text) = part.get("text").and_then(|t| t.as_str()) {
                            system_parts.push(text.to_owned());
                        } else if let Some(text) = part.as_str() {
                            system_parts.push(text.to_owned());
                        }
                    }
                }
            }
            "user" | "assistant" => {
                let mut claude_msg = json!({
                    "role": role,
                    "content": openai_content_to_claude_content(&content)
                });

                if role == "assistant" {
                    if let Some(tool_calls) = msg.get("tool_calls").and_then(|v| v.as_array()) {
                        let mut claude_content = openai_content_to_claude_blocks(&content)
                            .into_iter()
                            .filter(|block| {
                                block.get("type").and_then(|v| v.as_str()) == Some("text")
                            })
                            .collect::<Vec<_>>();

                        for tc in tool_calls {
                            let id = tc.get("id").and_then(|v| v.as_str()).unwrap_or("");
                            let name = tc
                                .get("function")
                                .and_then(|f| f.get("name"))
                                .and_then(|n| n.as_str())
                                .unwrap_or("");
                            let arguments_str = tc
                                .get("function")
                                .and_then(|f| f.get("arguments"))
                                .and_then(|a| a.as_str())
                                .unwrap_or("{}");
                            let input: Value =
                                serde_json::from_str(arguments_str).unwrap_or(json!({}));

                            claude_content.push(json!({
                                "type": "tool_use",
                                "id": id,
                                "name": name,
                                "input": input
                            }));
                        }

                        claude_msg["content"] = json!(claude_content);
                    }
                }

                claude_messages.push(claude_msg);
            }
            "tool" => {
                let tool_call_id = msg
                    .get("tool_call_id")
                    .and_then(|v| v.as_str())
                    .unwrap_or("");
                let tool_content = chat_tool_content_to_string(&content);

                claude_messages.push(json!({
                    "role": "user",
                    "content": [{
                        "type": "tool_result",
                        "tool_use_id": tool_call_id,
                        "content": tool_content
                    }]
                }));
            }
            _ => {}
        }
    }

    let mut result = json!({
        "messages": claude_messages,
    });

    if !system_parts.is_empty() {
        result["system"] = Value::String(system_parts.join("\n"));
    }

    if let Some(max_tokens) = openai_body
        .get("max_tokens")
        .or_else(|| openai_body.get("max_completion_tokens"))
    {
        result["max_tokens"] = max_tokens.clone();
    } else {
        result["max_tokens"] = json!(4096);
    }
    if let Some(temperature) = openai_body.get("temperature") {
        result["temperature"] = temperature.clone();
    }
    if let Some(top_p) = openai_body.get("top_p") {
        result["top_p"] = top_p.clone();
    }
    if let Some(stop) = openai_body.get("stop") {
        result["stop_sequences"] = normalize_stop(stop);
    }
    if let Some(stream) = openai_body.get("stream") {
        result["stream"] = stream.clone();
    }
    if let Some(metadata) = openai_body.get("metadata") {
        result["metadata"] = metadata.clone();
    }
    if let Some(service_tier) = openai_body.get("service_tier") {
        result["service_tier"] = service_tier.clone();
    }

    if let Some(tools) = openai_body.get("tools").and_then(|v| v.as_array()) {
        let claude_tools: Vec<Value> = tools.iter().filter_map(|tool| {
            let tool_type = tool.get("type").and_then(|v| v.as_str()).unwrap_or("");
            if tool_type != "function" {
                return None;
            }
            let function = tool.get("function")?;
            Some(json!({
                "name": function.get("name").and_then(|v| v.as_str()).unwrap_or(""),
                "description": function.get("description").and_then(|v| v.as_str()).unwrap_or(""),
                "input_schema": function.get("parameters").cloned().unwrap_or(json!({"type": "object", "properties": {}}))
            }))
        }).collect();

        if !claude_tools.is_empty() {
            result["tools"] = json!(claude_tools);
        }
    }

    if let Some(tool_choice) = openai_body.get("tool_choice") {
        if let Some(s) = tool_choice.as_str() {
            match s {
                "none" => {
                    result["tool_choice"] = json!({"type": "none"});
                }
                "auto" => {
                    result["tool_choice"] = json!({"type": "auto"});
                }
                "required" => {
                    result["tool_choice"] = json!({"type": "any"});
                }
                _ => {}
            }
        } else if let Some(obj) = tool_choice.as_object() {
            if obj.get("type").and_then(|v| v.as_str()) == Some("function") {
                if let Some(name) = obj
                    .get("function")
                    .and_then(|f| f.get("name"))
                    .and_then(|n| n.as_str())
                {
                    result["tool_choice"] = json!({"type": "tool", "name": name});
                }
            }
        }
    }

    Ok(result)
}

fn chat_tool_content_to_string(content: &Value) -> String {
    content
        .as_str()
        .map(str::to_owned)
        .unwrap_or_else(|| content.to_string())
}

fn openai_content_to_claude_content(content: &Value) -> Value {
    let blocks = openai_content_to_claude_blocks(content);
    if !blocks.is_empty() {
        return Value::Array(blocks);
    }

    match content {
        Value::String(text) => Value::String(text.clone()),
        Value::Null => Value::String(String::new()),
        _ => Value::String(content.to_string()),
    }
}

fn openai_content_to_claude_blocks(content: &Value) -> Vec<Value> {
    match content {
        Value::String(text) => {
            if text.is_empty() {
                Vec::new()
            } else {
                vec![json!({"type": "text", "text": text})]
            }
        }
        Value::Array(parts) => parts
            .iter()
            .filter_map(openai_content_part_to_claude_block)
            .collect(),
        Value::Null => Vec::new(),
        _ => vec![json!({"type": "text", "text": content.to_string()})],
    }
}

fn openai_content_part_to_claude_block(part: &Value) -> Option<Value> {
    if let Some(text) = part.as_str() {
        return Some(json!({"type": "text", "text": text}));
    }

    match part.get("type").and_then(|v| v.as_str()) {
        Some("text" | "input_text") => Some(json!({
            "type": "text",
            "text": part.get("text").and_then(|v| v.as_str()).unwrap_or("")
        })),
        Some("image_url" | "input_image") => openai_image_url(part).map(claude_image_block),
        Some("image") if part.get("source").is_some() => Some(part.clone()),
        _ => part
            .get("text")
            .and_then(|v| v.as_str())
            .map(|text| json!({"type": "text", "text": text})),
    }
}

fn openai_image_url(part: &Value) -> Option<&str> {
    let image_url = part
        .get("image_url")
        .or_else(|| part.get("input_image"))
        .or_else(|| part.get("image"))?;
    image_url
        .as_str()
        .or_else(|| image_url.get("url").and_then(|v| v.as_str()))
        .or_else(|| image_url.get("image_url").and_then(|v| v.as_str()))
}

fn claude_image_block(url: &str) -> Value {
    if let Some((media_type, data)) = parse_data_url(url) {
        return json!({
            "type": "image",
            "source": {
                "type": "base64",
                "media_type": media_type,
                "data": data
            }
        });
    }

    json!({
        "type": "image",
        "source": {
            "type": "url",
            "url": url
        }
    })
}

fn parse_data_url(url: &str) -> Option<(&str, &str)> {
    let rest = url.strip_prefix("data:")?;
    let (metadata, data) = rest.split_once(',')?;
    let media_type = metadata
        .split(';')
        .next()
        .filter(|value| !value.is_empty())?;
    Some((media_type, data))
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn basic_chat_conversion() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": "You are helpful."},
                {"role": "user", "content": "Hello"},
                {"role": "assistant", "content": "Hi there!"}
            ]
        });
        let result = transform_request(&input).unwrap();
        assert_eq!(result["system"], "You are helpful.");
        assert_eq!(result["messages"][0]["role"], "user");
        assert_eq!(
            result["messages"][0]["content"],
            json!([{"type": "text", "text": "Hello"}])
        );
        assert_eq!(result["messages"][1]["role"], "assistant");
        assert_eq!(
            result["messages"][1]["content"],
            json!([{"type": "text", "text": "Hi there!"}])
        );
        assert_eq!(result["max_tokens"], 4096);
    }

    #[test]
    fn developer_messages_are_preserved_as_claude_system_in_order() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": "System rule."},
                {"role": "developer", "content": "Developer rule."},
                {"role": "user", "content": "Hello"}
            ]
        });

        let result = transform_request(&input).unwrap();

        assert_eq!(result["system"], "System rule.\nDeveloper rule.");
        let messages = result["messages"].as_array().unwrap();
        assert_eq!(messages.len(), 1);
        assert_eq!(messages[0]["role"], "user");
    }

    #[test]
    fn user_content_parts_are_converted_to_claude_blocks() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [{
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe this."},
                    {"type": "image_url", "image_url": {"url": "data:image/png;base64,aGVsbG8="}},
                    {"type": "image_url", "image_url": {"url": "https://example.com/image.webp"}}
                ]
            }]
        });

        let result = transform_request(&input).unwrap();

        let content = result["messages"][0]["content"].as_array().unwrap();
        assert_eq!(
            content[0],
            json!({"type": "text", "text": "Describe this."})
        );
        assert_eq!(
            content[1],
            json!({
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/png",
                    "data": "aGVsbG8="
                }
            })
        );
        assert_eq!(
            content[2],
            json!({
                "type": "image",
                "source": {
                    "type": "url",
                    "url": "https://example.com/image.webp"
                }
            })
        );
    }

    #[test]
    fn max_completion_tokens_maps_to_claude_max_tokens() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [{"role": "user", "content": "test"}],
            "max_completion_tokens": 321
        });

        let result = transform_request(&input).unwrap();

        assert_eq!(result["max_tokens"], 321);
    }

    #[test]
    fn common_request_options_map_to_claude_when_supported() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [{"role": "user", "content": "test"}],
            "metadata": {"user_id": "user-123"},
            "service_tier": "auto"
        });

        let result = transform_request(&input).unwrap();

        assert_eq!(result["metadata"], json!({"user_id": "user-123"}));
        assert_eq!(result["service_tier"], "auto");
    }

    #[test]
    fn tool_calls_conversion() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [
                {"role": "user", "content": "What's the weather?"},
                {"role": "assistant", "content": null, "tool_calls": [{
                    "id": "call_123",
                    "type": "function",
                    "function": {"name": "get_weather", "arguments": "{\"city\": \"NYC\"}"}
                }]},
                {"role": "tool", "tool_call_id": "call_123", "content": "Sunny, 72F"}
            ]
        });
        let result = transform_request(&input).unwrap();
        let assistant_msg = &result["messages"][1];
        assert_eq!(assistant_msg["role"], "assistant");
        let content = assistant_msg["content"].as_array().unwrap();
        assert_eq!(content[0]["type"], "tool_use");
        assert_eq!(content[0]["name"], "get_weather");
        assert_eq!(content[0]["input"]["city"], "NYC");

        let tool_msg = &result["messages"][2];
        assert_eq!(tool_msg["role"], "user");
        let tool_content = tool_msg["content"].as_array().unwrap();
        assert_eq!(tool_content[0]["type"], "tool_result");
        assert_eq!(tool_content[0]["tool_use_id"], "call_123");
    }

    #[test]
    fn tools_definition_conversion() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [{"role": "user", "content": "test"}],
            "tools": [{
                "type": "function",
                "function": {
                    "name": "get_weather",
                    "description": "Get weather",
                    "parameters": {"type": "object", "properties": {"city": {"type": "string"}}}
                }
            }]
        });
        let result = transform_request(&input).unwrap();
        let tools = result["tools"].as_array().unwrap();
        assert_eq!(tools[0]["name"], "get_weather");
        assert_eq!(tools[0]["input_schema"]["type"], "object");
    }

    #[test]
    fn tool_choice_conversion_preserves_required_none_and_named_tools() {
        let base = json!({
            "model": "gpt-4o",
            "messages": [{"role": "user", "content": "test"}],
            "tools": [{
                "type": "function",
                "function": {
                    "name": "get_weather",
                    "description": "Get weather",
                    "parameters": {"type": "object", "properties": {}}
                }
            }]
        });

        let mut required = base.clone();
        required["tool_choice"] = json!("required");
        let required_result = transform_request(&required).unwrap();
        assert_eq!(required_result["tool_choice"], json!({"type": "any"}));

        let mut none = base.clone();
        none["tool_choice"] = json!("none");
        let none_result = transform_request(&none).unwrap();
        assert_eq!(none_result["tool_choice"], json!({"type": "none"}));

        let mut named = base;
        named["tool_choice"] = json!({"type": "function", "function": {"name": "get_weather"}});
        let named_result = transform_request(&named).unwrap();
        assert_eq!(
            named_result["tool_choice"],
            json!({"type": "tool", "name": "get_weather"})
        );
    }
}
