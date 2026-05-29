﻿﻿use serde_json::{json, Value};

pub fn transform_request(openai_body: &Value) -> Result<Value, String> {
    let messages = openai_body.get("messages").ok_or("missing messages field")?;
    let messages_arr = messages.as_array().ok_or("messages must be an array")?;

    let mut system_parts = Vec::new();
    let mut claude_messages = Vec::new();

    for msg in messages_arr {
        let role = msg.get("role").and_then(|v| v.as_str()).unwrap_or("");
        let content = msg.get("content").cloned().unwrap_or(Value::Null);

        match role {
            "system" => {
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
                    "content": content
                });

                if role == "assistant" {
                    if let Some(tool_calls) = msg.get("tool_calls").and_then(|v| v.as_array()) {
                        let mut claude_content = Vec::new();

                        if let Some(text) = content.as_str() {
                            if !text.is_empty() {
                                claude_content.push(json!({
                                    "type": "text",
                                    "text": text
                                }));
                            }
                        }

                        for tc in tool_calls {
                            let id = tc.get("id").and_then(|v| v.as_str()).unwrap_or("");
                            let name = tc.get("function")
                                .and_then(|f| f.get("name"))
                                .and_then(|n| n.as_str())
                                .unwrap_or("");
                            let arguments_str = tc.get("function")
                                .and_then(|f| f.get("arguments"))
                                .and_then(|a| a.as_str())
                                .unwrap_or("{}");
                            let input: Value = serde_json::from_str(arguments_str).unwrap_or(json!({}));

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
                let tool_call_id = msg.get("tool_call_id").and_then(|v| v.as_str()).unwrap_or("");
                let tool_content = content.as_str().unwrap_or("");

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

    if let Some(max_tokens) = openai_body.get("max_tokens") {
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
                "none" => { result["tools"] = json!([]); },
                "auto" => {},
                _ => {},
            }
        } else if let Some(obj) = tool_choice.as_object() {
            if obj.get("type").and_then(|v| v.as_str()) == Some("function") {
                if let Some(name) = obj.get("function").and_then(|f| f.get("name")).and_then(|n| n.as_str()) {
                    result["tool_choice"] = json!({"type": "tool", "name": name});
                }
            }
        }
    }

    Ok(result)
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
        assert_eq!(result["messages"][0]["content"], "Hello");
        assert_eq!(result["messages"][1]["role"], "assistant");
        assert_eq!(result["messages"][1]["content"], "Hi there!");
        assert_eq!(result["max_tokens"], 4096);
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
}
