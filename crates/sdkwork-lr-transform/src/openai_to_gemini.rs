use crate::normalize_stop;
use serde_json::{json, Value};
use std::collections::HashMap;

pub fn transform_request(openai_body: &Value) -> Result<Value, String> {
    let messages = openai_body
        .get("messages")
        .ok_or("missing messages field")?;
    let messages_arr = messages.as_array().ok_or("messages must be an array")?;

    let mut tool_call_map: HashMap<String, String> = HashMap::new();
    for msg in messages_arr {
        if msg.get("role").and_then(|v| v.as_str()) == Some("assistant") {
            if let Some(tool_calls) = msg.get("tool_calls").and_then(|v| v.as_array()) {
                for tc in tool_calls {
                    if let (Some(id), Some(name)) = (
                        tc.get("id").and_then(|v| v.as_str()),
                        tc.get("function")
                            .and_then(|f| f.get("name"))
                            .and_then(|n| n.as_str()),
                    ) {
                        tool_call_map.insert(id.to_owned(), name.to_owned());
                    }
                }
            }
        }
    }

    let mut system_parts = Vec::new();
    let mut contents = Vec::new();

    for msg in messages_arr {
        let role = msg.get("role").and_then(|v| v.as_str()).unwrap_or("");
        let content = msg.get("content").cloned().unwrap_or(Value::Null);

        match role {
            "system" | "developer" => {
                let text = if content.is_string() {
                    content.as_str().unwrap_or("").to_owned()
                } else if content.is_array() {
                    content
                        .as_array()
                        .unwrap()
                        .iter()
                        .filter_map(|part| {
                            if part.get("type").and_then(|t| t.as_str()) == Some("text") {
                                part.get("text").and_then(|t| t.as_str()).map(String::from)
                            } else {
                                None
                            }
                        })
                        .collect::<Vec<_>>()
                        .join("\n")
                } else if !content.is_null() {
                    serde_json::to_string(&content).unwrap_or_default()
                } else {
                    String::new()
                };
                if !text.is_empty() {
                    system_parts.push(text);
                }
            }
            "user" => {
                contents.push(json!({
                    "role": "user",
                    "parts": extract_parts(&content)
                }));
            }
            "assistant" => {
                let mut parts = Vec::new();

                if let Some(text) = content.as_str() {
                    if !text.is_empty() {
                        parts.push(json!({"text": text}));
                    }
                }

                if let Some(tool_calls) = msg.get("tool_calls").and_then(|v| v.as_array()) {
                    for tc in tool_calls {
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
                        let args: Value = serde_json::from_str(arguments_str).unwrap_or(json!({}));

                        parts.push(json!({
                            "functionCall": {
                                "name": name,
                                "args": args
                            }
                        }));
                    }
                }

                if parts.is_empty() {
                    parts.push(json!({"text": ""}));
                }

                contents.push(json!({
                    "role": "model",
                    "parts": parts
                }));
            }
            "tool" => {
                let tool_call_id = msg
                    .get("tool_call_id")
                    .and_then(|v| v.as_str())
                    .unwrap_or("");
                let tool_content = content.as_str().unwrap_or("");
                let function_name = tool_call_map
                    .get(tool_call_id)
                    .cloned()
                    .unwrap_or_else(|| tool_call_id.to_owned());

                let mut function_response_parts = Vec::new();
                if let Ok(parsed) = serde_json::from_str::<Value>(tool_content) {
                    function_response_parts.push(json!({
                        "functionResponse": {
                            "name": function_name,
                            "response": parsed
                        }
                    }));
                } else {
                    function_response_parts.push(json!({
                        "functionResponse": {
                            "name": function_name,
                            "response": {"result": tool_content}
                        }
                    }));
                }

                contents.push(json!({
                    "role": "user",
                    "parts": function_response_parts
                }));
            }
            _ => {}
        }
    }

    let contents = merge_consecutive_user_roles(contents);

    let mut result = json!({ "contents": contents });

    if !system_parts.is_empty() {
        result["systemInstruction"] = json!({
            "parts": [{"text": system_parts.join("\n")}]
        });
    }

    let mut gen_config = json!({});
    if let Some(max_tokens) = openai_body
        .get("max_tokens")
        .or_else(|| openai_body.get("max_completion_tokens"))
    {
        gen_config["maxOutputTokens"] = max_tokens.clone();
    }
    if let Some(temperature) = openai_body.get("temperature") {
        gen_config["temperature"] = temperature.clone();
    }
    if let Some(top_p) = openai_body.get("top_p") {
        gen_config["topP"] = top_p.clone();
    }
    if let Some(candidate_count) = openai_body.get("n") {
        gen_config["candidateCount"] = candidate_count.clone();
    }
    if let Some(presence_penalty) = openai_body.get("presence_penalty") {
        gen_config["presencePenalty"] = presence_penalty.clone();
    }
    if let Some(frequency_penalty) = openai_body.get("frequency_penalty") {
        gen_config["frequencyPenalty"] = frequency_penalty.clone();
    }
    if let Some(seed) = openai_body.get("seed") {
        gen_config["seed"] = seed.clone();
    }
    if let Some(stop) = openai_body.get("stop") {
        gen_config["stopSequences"] = normalize_stop(stop);
    }
    if let Some(response_format) = openai_body.get("response_format") {
        apply_response_format_to_generation_config(&mut gen_config, response_format);
    }
    if gen_config.as_object().map_or(false, |o| !o.is_empty()) {
        result["generationConfig"] = gen_config;
    }

    if let Some(tools) = openai_body.get("tools").and_then(|v| v.as_array()) {
        let gemini_declarations: Vec<Value> = tools.iter().filter_map(|tool| {
            let tool_type = tool.get("type").and_then(|v| v.as_str()).unwrap_or("");
            if tool_type != "function" {
                return None;
            }
            let function = tool.get("function")?;
            Some(json!({
                "name": function.get("name").and_then(|v| v.as_str()).unwrap_or(""),
                "description": function.get("description").and_then(|v| v.as_str()).unwrap_or(""),
                "parameters": function.get("parameters").cloned().unwrap_or(json!({"type": "object", "properties": {}}))
            }))
        }).collect();

        if !gemini_declarations.is_empty() {
            result["tools"] = json!([{"functionDeclarations": gemini_declarations}]);
        }
    }

    if let Some(tool_choice) = openai_body.get("tool_choice") {
        if let Some(s) = tool_choice.as_str() {
            match s {
                "none" => {
                    result["toolConfig"] = json!({"functionCallingConfig": {"mode": "NONE"}});
                }
                "auto" => {
                    result["toolConfig"] = json!({"functionCallingConfig": {"mode": "AUTO"}});
                }
                "required" => {
                    result["toolConfig"] = json!({"functionCallingConfig": {"mode": "ANY"}});
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
                    result["toolConfig"] = json!({
                        "functionCallingConfig": {
                            "mode": "ANY",
                            "allowedFunctionNames": [name]
                        }
                    });
                }
            }
        }
    }

    Ok(result)
}

fn merge_consecutive_user_roles(contents: Vec<Value>) -> Vec<Value> {
    let mut merged: Vec<Value> = Vec::new();
    for content in contents {
        let role = content.get("role").and_then(|v| v.as_str()).unwrap_or("");
        if role == "user" {
            if let Some(last) = merged.last_mut() {
                if last.get("role").and_then(|v| v.as_str()) == Some("user") {
                    if let (Some(new_parts), Some(last_parts)) = (
                        content.get("parts").and_then(|p| p.as_array()),
                        last.get("parts").and_then(|p| p.as_array()).cloned(),
                    ) {
                        let mut combined = last_parts.to_vec();
                        combined.extend(new_parts.iter().cloned());
                        *last = json!({"role": "user", "parts": combined});
                        continue;
                    }
                }
            }
        }
        merged.push(content);
    }
    merged
}

fn extract_parts(content: &Value) -> Value {
    if let Some(text) = content.as_str() {
        json!([{"text": text}])
    } else if content.is_array() {
        Value::Array(
            content
                .as_array()
                .unwrap()
                .iter()
                .map(openai_content_part_to_gemini_part)
                .collect(),
        )
    } else {
        json!([{"text": content.to_string()}])
    }
}

fn openai_content_part_to_gemini_part(part: &Value) -> Value {
    if let Some(text) = part.as_str() {
        return json!({"text": text});
    }

    if part.get("inlineData").is_some()
        || part.get("fileData").is_some()
        || part.get("functionCall").is_some()
        || part.get("functionResponse").is_some()
    {
        return part.clone();
    }

    let part_type = part.get("type").and_then(|v| v.as_str()).unwrap_or("");
    if matches!(part_type, "text" | "input_text") {
        return json!({"text": part.get("text").and_then(|v| v.as_str()).unwrap_or("")});
    }

    if matches!(part_type, "image_url" | "input_image") || part.get("image_url").is_some() {
        if let Some(url) = openai_image_url(part) {
            if let Some((mime_type, data)) = parse_data_url(url) {
                return json!({"inlineData": {"mimeType": mime_type, "data": data}});
            }
            return json!({
                "fileData": {
                    "mimeType": image_mime_type_for_url(url),
                    "fileUri": url
                }
            });
        }
    }

    if let Some(text) = part.get("text").and_then(|v| v.as_str()) {
        return json!({"text": text});
    }

    json!({"text": part.to_string()})
}

fn apply_response_format_to_generation_config(gen_config: &mut Value, response_format: &Value) {
    match response_format.get("type").and_then(|v| v.as_str()) {
        Some("json_object") => {
            gen_config["responseMimeType"] = json!("application/json");
        }
        Some("json_schema") => {
            gen_config["responseMimeType"] = json!("application/json");
            if let Some(schema) = response_format
                .get("json_schema")
                .and_then(|json_schema| json_schema.get("schema"))
            {
                gen_config["responseSchema"] = schema.clone();
            }
        }
        Some("text") => {
            gen_config["responseMimeType"] = json!("text/plain");
        }
        _ => {}
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

fn parse_data_url(url: &str) -> Option<(&str, &str)> {
    let rest = url.strip_prefix("data:")?;
    let (metadata, data) = rest.split_once(',')?;
    let mime_type = metadata
        .split(';')
        .next()
        .filter(|value| !value.is_empty())?;
    Some((mime_type, data))
}

fn image_mime_type_for_url(url: &str) -> &'static str {
    let lower = url
        .split('?')
        .next()
        .unwrap_or(url)
        .split('#')
        .next()
        .unwrap_or(url)
        .to_ascii_lowercase();
    if lower.ends_with(".png") {
        "image/png"
    } else if lower.ends_with(".webp") {
        "image/webp"
    } else if lower.ends_with(".gif") {
        "image/gif"
    } else {
        "image/jpeg"
    }
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
        assert_eq!(
            result["systemInstruction"]["parts"][0]["text"],
            "You are helpful."
        );
        let contents = result["contents"].as_array().unwrap();
        assert_eq!(contents[0]["role"], "user");
        assert_eq!(contents[0]["parts"][0]["text"], "Hello");
        assert_eq!(contents[1]["role"], "model");
        assert_eq!(contents[1]["parts"][0]["text"], "Hi there!");
    }

    #[test]
    fn system_message_array() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": [{"type": "text", "text": "Rule 1"}, {"type": "text", "text": "Rule 2"}]},
                {"role": "user", "content": "Hello"}
            ]
        });
        let result = transform_request(&input).unwrap();
        let sys_text = result["systemInstruction"]["parts"][0]["text"]
            .as_str()
            .unwrap();
        assert!(sys_text.contains("Rule 1"));
        assert!(sys_text.contains("Rule 2"));
    }

    #[test]
    fn developer_messages_are_preserved_in_gemini_system_instruction_in_order() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [
                {"role": "system", "content": "System rule."},
                {"role": "developer", "content": "Developer rule."},
                {"role": "user", "content": "Hello"}
            ]
        });

        let result = transform_request(&input).unwrap();

        assert_eq!(
            result["systemInstruction"]["parts"][0]["text"],
            "System rule.\nDeveloper rule."
        );
        let contents = result["contents"].as_array().unwrap();
        assert_eq!(contents.len(), 1);
        assert_eq!(contents[0]["role"], "user");
    }

    #[test]
    fn user_content_parts_are_converted_to_gemini_parts() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [{
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe this."},
                    {"type": "image_url", "image_url": {"url": "data:image/png;base64,aGVsbG8="}}
                ]
            }]
        });

        let result = transform_request(&input).unwrap();

        let parts = result["contents"][0]["parts"].as_array().unwrap();
        assert_eq!(parts[0], json!({"text": "Describe this."}));
        assert_eq!(
            parts[1],
            json!({"inlineData": {"mimeType": "image/png", "data": "aGVsbG8="}})
        );
    }

    #[test]
    fn response_format_json_schema_maps_to_gemini_generation_config() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [{"role": "user", "content": "Return JSON"}],
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "name": "answer",
                    "schema": {
                        "type": "object",
                        "properties": {"ok": {"type": "boolean"}},
                        "required": ["ok"]
                    },
                    "strict": true
                }
            }
        });

        let result = transform_request(&input).unwrap();

        assert_eq!(
            result["generationConfig"]["responseMimeType"],
            "application/json"
        );
        assert_eq!(
            result["generationConfig"]["responseSchema"],
            json!({
                "type": "object",
                "properties": {"ok": {"type": "boolean"}},
                "required": ["ok"]
            })
        );
    }

    #[test]
    fn max_completion_tokens_maps_to_gemini_max_output_tokens() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [{"role": "user", "content": "test"}],
            "max_completion_tokens": 321
        });

        let result = transform_request(&input).unwrap();

        assert_eq!(result["generationConfig"]["maxOutputTokens"], 321);
    }

    #[test]
    fn sampling_fields_map_to_gemini_generation_config() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [{"role": "user", "content": "test"}],
            "n": 2,
            "presence_penalty": 0.3,
            "frequency_penalty": 0.4,
            "seed": 12345
        });

        let result = transform_request(&input).unwrap();

        assert_eq!(result["generationConfig"]["candidateCount"], 2);
        assert_eq!(result["generationConfig"]["presencePenalty"], 0.3);
        assert_eq!(result["generationConfig"]["frequencyPenalty"], 0.4);
        assert_eq!(result["generationConfig"]["seed"], 12345);
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
                {"role": "tool", "tool_call_id": "call_123", "content": "{\"temp\": 72}"}
            ]
        });
        let result = transform_request(&input).unwrap();
        let contents = result["contents"].as_array().unwrap();
        assert_eq!(contents[1]["role"], "model");
        let fc = &contents[1]["parts"][0]["functionCall"];
        assert_eq!(fc["name"], "get_weather");
        assert_eq!(fc["args"]["city"], "NYC");

        assert_eq!(contents[2]["role"], "user");
        let fr = &contents[2]["parts"][0]["functionResponse"];
        assert_eq!(fr["name"], "get_weather");
        assert_eq!(fr["response"]["temp"], 72);
    }

    #[test]
    fn generation_config_conversion() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [{"role": "user", "content": "test"}],
            "max_tokens": 100,
            "temperature": 0.7,
            "stop": ["END"]
        });
        let result = transform_request(&input).unwrap();
        assert_eq!(result["generationConfig"]["maxOutputTokens"], 100);
        assert_eq!(result["generationConfig"]["temperature"], 0.7);
        assert_eq!(result["generationConfig"]["stopSequences"], json!(["END"]));
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
        let decls = tools[0]["functionDeclarations"].as_array().unwrap();
        assert_eq!(decls[0]["name"], "get_weather");
        assert_eq!(decls[0]["description"], "Get weather");
    }

    #[test]
    fn tool_choice_required_maps_to_gemini_any_mode() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [{"role": "user", "content": "test"}],
            "tools": [{
                "type": "function",
                "function": {
                    "name": "get_weather",
                    "parameters": {"type": "object", "properties": {}}
                }
            }],
            "tool_choice": "required"
        });

        let result = transform_request(&input).unwrap();

        assert_eq!(
            result["toolConfig"]["functionCallingConfig"],
            json!({"mode": "ANY"})
        );
    }

    #[test]
    fn no_generation_config_when_empty() {
        let input = json!({
            "model": "gpt-4o",
            "messages": [{"role": "user", "content": "test"}]
        });
        let result = transform_request(&input).unwrap();
        assert!(result.get("generationConfig").is_none());
    }
}
