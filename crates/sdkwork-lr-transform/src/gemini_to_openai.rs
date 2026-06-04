use serde_json::{json, Value};

pub fn transform_response(gemini_body: &Value, model: &str) -> Result<Value, String> {
    let candidates = gemini_body.get("candidates").and_then(|v| v.as_array());
    let choices = candidates
        .map(|items| {
            items
                .iter()
                .enumerate()
                .map(|(fallback_index, candidate)| {
                    candidate_to_openai_choice(candidate, fallback_index)
                })
                .collect::<Vec<_>>()
        })
        .filter(|choices| !choices.is_empty())
        .unwrap_or_else(|| vec![empty_openai_choice()]);

    let usage = gemini_body
        .get("usageMetadata")
        .map(|u| {
            let prompt = u
                .get("promptTokenCount")
                .and_then(|v| v.as_u64())
                .unwrap_or(0);
            let completion = u
                .get("candidatesTokenCount")
                .and_then(|v| v.as_u64())
                .unwrap_or(0);
            let total = u
                .get("totalTokenCount")
                .and_then(|v| v.as_u64())
                .unwrap_or(prompt + completion);
            json!({
                "prompt_tokens": prompt,
                "completion_tokens": completion,
                "total_tokens": total,
            })
        })
        .unwrap_or_else(|| json!({"prompt_tokens": 0, "completion_tokens": 0, "total_tokens": 0}));

    Ok(json!({
        "id": format!("chatcmpl-gemini-{}", uuid::Uuid::new_v4()),
        "object": "chat.completion",
        "created": unix_timestamp_secs(),
        "model": model,
        "choices": choices,
        "usage": usage,
    }))
}

fn candidate_to_openai_choice(candidate: &Value, fallback_index: usize) -> Value {
    let mut text_parts = Vec::new();
    let mut tool_calls = Vec::new();

    if let Some(parts) = candidate
        .get("content")
        .and_then(|c| c.get("parts"))
        .and_then(|p| p.as_array())
    {
        for (idx, part) in parts.iter().enumerate() {
            if let Some(text) = part.get("text").and_then(|t| t.as_str()) {
                text_parts.push(text.to_owned());
            }

            if let Some(fc) = part.get("functionCall") {
                let name = fc
                    .get("name")
                    .and_then(|n| n.as_str())
                    .unwrap_or("")
                    .to_owned();
                let args = fc.get("args").cloned().unwrap_or(json!({}));
                let arguments = serde_json::to_string(&args).unwrap_or_default();

                tool_calls.push(json!({
                    "id": format!("call_{}_{}", fallback_index, idx),
                    "type": "function",
                    "function": {
                        "name": name,
                        "arguments": arguments
                    },
                    "index": idx
                }));
            }
        }
    }

    let text = text_parts.join("");
    let mut finish_reason = candidate
        .get("finishReason")
        .and_then(|v| v.as_str())
        .map(gemini_finish_reason_to_openai)
        .unwrap_or("stop");

    if !tool_calls.is_empty() {
        finish_reason = "tool_calls";
    }

    let mut message = json!({
        "role": "assistant",
        "content": if text.is_empty() && !tool_calls.is_empty() { Value::Null } else { Value::String(text) },
    });

    if !tool_calls.is_empty() {
        message["tool_calls"] = json!(tool_calls);
    }

    json!({
        "index": candidate
            .get("index")
            .and_then(|v| v.as_u64())
            .unwrap_or(fallback_index as u64),
        "message": message,
        "finish_reason": finish_reason,
    })
}

fn empty_openai_choice() -> Value {
    json!({
        "index": 0,
        "message": {"role": "assistant", "content": ""},
        "finish_reason": "stop",
    })
}

fn gemini_finish_reason_to_openai(reason: &str) -> &'static str {
    match reason {
        "STOP" => "stop",
        "MAX_TOKENS" => "length",
        "SAFETY"
        | "RECITATION"
        | "BLOCKLIST"
        | "PROHIBITED_CONTENT"
        | "SPII"
        | "MALFORMED_FUNCTION_CALL" => "content_filter",
        _ => "stop",
    }
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
            "candidates": [{
                "content": {"parts": [{"text": "Hello from Gemini!"}], "role": "model"},
                "finishReason": "STOP",
                "index": 0
            }],
            "usageMetadata": {
                "promptTokenCount": 10,
                "candidatesTokenCount": 5,
                "totalTokenCount": 15
            }
        });
        let result = transform_response(&input, "gemini-pro").unwrap();
        assert_eq!(result["object"], "chat.completion");
        assert_eq!(result["model"], "gemini-pro");
        assert_eq!(
            result["choices"][0]["message"]["content"],
            "Hello from Gemini!"
        );
        assert_eq!(result["choices"][0]["finish_reason"], "stop");
        assert_eq!(result["usage"]["prompt_tokens"], 10);
        assert_eq!(result["usage"]["completion_tokens"], 5);
        assert_eq!(result["usage"]["total_tokens"], 15);
    }

    #[test]
    fn usage_derives_total_when_gemini_omits_total_token_count() {
        let input = json!({
            "candidates": [{
                "content": {"parts": [{"text": "Hello from Gemini!"}], "role": "model"},
                "finishReason": "STOP",
                "index": 0
            }],
            "usageMetadata": {
                "promptTokenCount": 10,
                "candidatesTokenCount": 5
            }
        });

        let result = transform_response(&input, "gemini-pro").unwrap();

        assert_eq!(result["usage"]["prompt_tokens"], 10);
        assert_eq!(result["usage"]["completion_tokens"], 5);
        assert_eq!(result["usage"]["total_tokens"], 15);
    }

    #[test]
    fn function_call_response_conversion() {
        let input = json!({
            "candidates": [{
                "content": {
                    "parts": [{"functionCall": {"name": "get_weather", "args": {"city": "NYC"}}}],
                    "role": "model"
                },
                "finishReason": "STOP",
                "index": 0
            }]
        });
        let result = transform_response(&input, "gemini-pro").unwrap();
        assert_eq!(result["choices"][0]["finish_reason"], "tool_calls");
        let tool_calls = result["choices"][0]["message"]["tool_calls"]
            .as_array()
            .unwrap();
        assert_eq!(tool_calls[0]["function"]["name"], "get_weather");
        let args: Value =
            serde_json::from_str(tool_calls[0]["function"]["arguments"].as_str().unwrap()).unwrap();
        assert_eq!(args["city"], "NYC");
    }

    #[test]
    fn multiple_candidates_map_to_multiple_openai_choices() {
        let input = json!({
            "candidates": [
                {
                    "content": {"parts": [{"text": "First"}], "role": "model"},
                    "finishReason": "STOP",
                    "index": 0
                },
                {
                    "content": {"parts": [{"text": "Second"}], "role": "model"},
                    "finishReason": "MAX_TOKENS",
                    "index": 1
                }
            ]
        });

        let result = transform_response(&input, "gemini-pro").unwrap();

        let choices = result["choices"].as_array().expect("choices");
        assert_eq!(choices.len(), 2);
        assert_eq!(choices[0]["index"], 0);
        assert_eq!(choices[0]["message"]["content"], "First");
        assert_eq!(choices[0]["finish_reason"], "stop");
        assert_eq!(choices[1]["index"], 1);
        assert_eq!(choices[1]["message"]["content"], "Second");
        assert_eq!(choices[1]["finish_reason"], "length");
    }

    #[test]
    fn max_tokens_finish_reason() {
        let input = json!({
            "candidates": [{
                "content": {"parts": [{"text": "truncated..."}], "role": "model"},
                "finishReason": "MAX_TOKENS",
                "index": 0
            }]
        });
        let result = transform_response(&input, "gemini-pro").unwrap();
        assert_eq!(result["choices"][0]["finish_reason"], "length");
    }

    #[test]
    fn empty_candidates() {
        let input = json!({
            "candidates": []
        });
        let result = transform_response(&input, "gemini-pro").unwrap();
        assert_eq!(result["choices"][0]["message"]["content"], "");
        assert_eq!(result["choices"][0]["finish_reason"], "stop");
    }
}
