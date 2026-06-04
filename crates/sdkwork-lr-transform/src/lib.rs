use sdkwork_lr_core::Protocol;
use serde_json::Value;

pub mod claude_to_openai;
pub mod gemini_to_openai;
pub mod openai_to_claude;
pub mod openai_to_gemini;
pub mod plugins;
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

#[cfg(test)]
mod plugin_tests {
    use super::*;
    use sdkwork_lr_plugin::{ApiSurface, TransformContext};
    use serde_json::json;

    fn context(source: ApiSurface, target: ApiSurface) -> TransformContext {
        TransformContext {
            source,
            target,
            source_protocol: sdkwork_lr_core::Protocol::Openai,
            target_protocol: sdkwork_lr_core::Protocol::Openai,
            client_path: "/v1/responses".to_owned(),
            client_base_path: "/v1".to_owned(),
            model: Some("gpt-5.5".to_owned()),
            is_streaming: false,
        }
    }

    #[test]
    fn built_in_registry_resolves_user_aliases_to_canonical_plugins() {
        let registry = plugins::built_in_plugin_registry();

        let response_to_claude = registry
            .get("OPENAI_COMPATIBLE_RESPONSE_TO_CLADUE_MESSAGE_API")
            .expect("response to Claude plugin");
        assert_eq!(
            response_to_claude.manifest().id,
            "OPENAI_RESPONSES_TO_ANTHROPIC_MESSAGES_API"
        );

        let claude_to_chat = registry
            .get("CLAUDE_MESSAGE_TO_OPENAI_CHAT_API")
            .expect("Claude to OpenAI Chat plugin");
        assert_eq!(
            claude_to_chat.manifest().id,
            "ANTHROPIC_MESSAGES_TO_OPENAI_CHAT_COMPLETIONS_API"
        );

        let gemini_to_response = registry
            .get("GEMINI_MESSAGE_TO_OPENAI_RESPONSE_API")
            .expect("Gemini to OpenAI Responses plugin");
        assert_eq!(
            gemini_to_response.manifest().id,
            "GEMINI_GENERATE_CONTENT_TO_OPENAI_RESPONSES_API"
        );
    }

    #[test]
    fn built_in_plugin_stream_capabilities_match_event_level_implementations() {
        let registry = plugins::built_in_plugin_registry();

        assert!(
            registry
                .resolve(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::AnthropicMessages
                )
                .expect("OpenAI Chat to Anthropic plugin")
                .manifest()
                .capabilities
                .stream
        );
        assert!(
            registry
                .resolve(
                    ApiSurface::AnthropicMessages,
                    ApiSurface::OpenAiChatCompletions
                )
                .expect("Anthropic to OpenAI Chat plugin")
                .manifest()
                .capabilities
                .stream
        );
        assert!(
            registry
                .resolve(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::GeminiGenerateContent
                )
                .expect("OpenAI Chat to Gemini plugin")
                .manifest()
                .capabilities
                .stream
        );
        assert!(
            registry
                .resolve(
                    ApiSurface::GeminiGenerateContent,
                    ApiSurface::OpenAiChatCompletions
                )
                .expect("Gemini to OpenAI Chat plugin")
                .manifest()
                .capabilities
                .stream
        );

        for (source, target) in [
            (
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses,
            ),
            (
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            ),
            (ApiSurface::OpenAiResponses, ApiSurface::AnthropicMessages),
            (
                ApiSurface::OpenAiResponses,
                ApiSurface::GeminiGenerateContent,
            ),
            (ApiSurface::AnthropicMessages, ApiSurface::OpenAiResponses),
            (
                ApiSurface::GeminiGenerateContent,
                ApiSurface::OpenAiResponses,
            ),
            (
                ApiSurface::AnthropicMessages,
                ApiSurface::GeminiGenerateContent,
            ),
            (
                ApiSurface::GeminiGenerateContent,
                ApiSurface::AnthropicMessages,
            ),
        ] {
            let plugin = registry.resolve(source, target).expect("standard plugin");
            assert!(
                !plugin.manifest().capabilities.stream,
                "{} must not advertise stream support without event-level transform",
                plugin.manifest().id
            );
        }
    }

    #[test]
    fn responses_to_chat_plugin_converts_request_input_to_messages() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            )
            .expect("Responses to Chat plugin");
        let input = json!({
            "model": "gpt-5.5",
            "input": [
                {
                    "role": "user",
                    "content": [
                        {"type": "input_text", "text": "Hello"}
                    ]
                }
            ],
            "max_output_tokens": 128,
            "temperature": 0.2,
            "stream": false
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiResponses,
                    ApiSurface::OpenAiChatCompletions,
                ),
            )
            .unwrap();

        assert_eq!(output["model"], "gpt-5.5");
        assert_eq!(output["messages"][0]["role"], "user");
        assert_eq!(output["messages"][0]["content"], "Hello");
        assert_eq!(output["max_tokens"], 128);
        assert_eq!(output["temperature"], 0.2);
        assert_eq!(output["stream"], false);
    }

    #[test]
    fn responses_to_chat_plugin_preserves_input_image_content_parts() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            )
            .expect("Responses to Chat plugin");
        let input = json!({
            "model": "gpt-5.5",
            "input": [{
                "role": "user",
                "content": [
                    {"type": "input_text", "text": "Describe this."},
                    {"type": "input_image", "image_url": "data:image/png;base64,aGVsbG8="}
                ]
            }]
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiResponses,
                    ApiSurface::OpenAiChatCompletions,
                ),
            )
            .unwrap();

        assert_eq!(output["messages"][0]["role"], "user");
        assert_eq!(
            output["messages"][0]["content"],
            json!([
                {"type": "text", "text": "Describe this."},
                {"type": "image_url", "image_url": {"url": "data:image/png;base64,aGVsbG8="}}
            ])
        );
    }

    #[test]
    fn chat_to_responses_plugin_converts_messages_to_input() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses,
            )
            .expect("Chat to Responses plugin");
        let input = json!({
            "model": "gpt-5.5",
            "messages": [
                {"role": "system", "content": "Use short answers."},
                {"role": "user", "content": "Hello"}
            ],
            "max_tokens": 64,
            "temperature": 0.3,
            "stream": true
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::OpenAiResponses,
                ),
            )
            .unwrap();

        assert_eq!(output["model"], "gpt-5.5");
        assert_eq!(output["instructions"], "Use short answers.");
        assert_eq!(output["input"][0]["role"], "user");
        assert_eq!(output["input"][0]["content"][0]["type"], "input_text");
        assert_eq!(output["input"][0]["content"][0]["text"], "Hello");
        assert_eq!(output["max_output_tokens"], 64);
        assert_eq!(output["stream"], true);
    }

    #[test]
    fn chat_to_responses_plugin_maps_max_completion_tokens_to_max_output_tokens() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses,
            )
            .expect("Chat to Responses plugin");
        let input = json!({
            "model": "gpt-5.5",
            "messages": [{"role": "user", "content": "Hello"}],
            "max_completion_tokens": 321
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::OpenAiResponses,
                ),
            )
            .unwrap();

        assert_eq!(output["max_output_tokens"], 321);
    }

    #[test]
    fn chat_to_responses_plugin_preserves_common_openai_request_options() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses,
            )
            .expect("Chat to Responses plugin");
        let input = json!({
            "model": "gpt-5.5",
            "messages": [{"role": "user", "content": "Hello"}],
            "metadata": {"trace_id": "trace-123"},
            "store": true,
            "service_tier": "default",
            "safety_identifier": "user-hash",
            "prompt_cache_key": "workspace-1",
            "prompt_cache_retention": "24h",
            "stream_options": {"include_usage": true},
            "top_logprobs": 2,
            "user": "legacy-user"
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::OpenAiResponses,
                ),
            )
            .unwrap();

        assert_eq!(output["metadata"], json!({"trace_id": "trace-123"}));
        assert_eq!(output["store"], true);
        assert_eq!(output["service_tier"], "default");
        assert_eq!(output["safety_identifier"], "user-hash");
        assert_eq!(output["prompt_cache_key"], "workspace-1");
        assert_eq!(output["prompt_cache_retention"], "24h");
        assert_eq!(output["stream_options"], json!({"include_usage": true}));
        assert_eq!(output["top_logprobs"], 2);
        assert_eq!(output["user"], "legacy-user");
    }

    #[test]
    fn chat_to_responses_plugin_preserves_image_url_content_parts() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses,
            )
            .expect("Chat to Responses plugin");
        let input = json!({
            "model": "gpt-5.5",
            "messages": [{
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe this."},
                    {"type": "image_url", "image_url": {"url": "data:image/png;base64,aGVsbG8="}}
                ]
            }]
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::OpenAiResponses,
                ),
            )
            .unwrap();

        assert_eq!(
            output["input"][0]["content"],
            json!([
                {"type": "input_text", "text": "Describe this."},
                {"type": "input_image", "image_url": "data:image/png;base64,aGVsbG8="}
            ])
        );
    }

    #[test]
    fn chat_to_responses_plugin_preserves_tool_choice_parallel_and_response_format() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses,
            )
            .expect("Chat to Responses plugin");
        let input = json!({
            "model": "gpt-5.5",
            "messages": [{"role": "user", "content": "Return JSON"}],
            "tool_choice": {
                "type": "function",
                "function": {"name": "write_file"}
            },
            "parallel_tool_calls": false,
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "name": "answer",
                    "schema": {"type": "object", "properties": {"ok": {"type": "boolean"}}},
                    "strict": true
                }
            }
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::OpenAiResponses,
                ),
            )
            .unwrap();

        assert_eq!(output["tool_choice"]["type"], "function");
        assert_eq!(output["tool_choice"]["name"], "write_file");
        assert_eq!(output["parallel_tool_calls"], false);
        assert_eq!(output["text"]["format"]["type"], "json_schema");
        assert_eq!(output["text"]["format"]["name"], "answer");
        assert_eq!(output["text"]["format"]["strict"], true);
    }

    #[test]
    fn responses_to_chat_plugin_preserves_tool_choice_parallel_and_text_format() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            )
            .expect("Responses to Chat plugin");
        let input = json!({
            "model": "gpt-5.5",
            "input": "Return JSON",
            "tool_choice": "required",
            "parallel_tool_calls": false,
            "text": {
                "format": {
                    "type": "json_schema",
                    "name": "answer",
                    "schema": {"type": "object", "properties": {"ok": {"type": "boolean"}}},
                    "strict": true
                }
            }
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::OpenAiResponses,
                ),
            )
            .unwrap();

        assert_eq!(output["tool_choice"], "required");
        assert_eq!(output["parallel_tool_calls"], false);
        assert_eq!(output["response_format"]["type"], "json_schema");
        assert_eq!(output["response_format"]["json_schema"]["name"], "answer");
        assert_eq!(output["response_format"]["json_schema"]["strict"], true);
    }

    #[test]
    fn responses_to_chat_plugin_preserves_common_openai_request_options() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            )
            .expect("Responses to Chat plugin");
        let input = json!({
            "model": "gpt-5.5",
            "input": "Hello",
            "metadata": {"trace_id": "trace-123"},
            "store": true,
            "service_tier": "default",
            "safety_identifier": "user-hash",
            "prompt_cache_key": "workspace-1",
            "prompt_cache_retention": "24h",
            "stream_options": {"include_usage": true},
            "top_logprobs": 2,
            "user": "legacy-user"
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiResponses,
                    ApiSurface::OpenAiChatCompletions,
                ),
            )
            .unwrap();

        assert_eq!(output["metadata"], json!({"trace_id": "trace-123"}));
        assert_eq!(output["store"], true);
        assert_eq!(output["service_tier"], "default");
        assert_eq!(output["safety_identifier"], "user-hash");
        assert_eq!(output["prompt_cache_key"], "workspace-1");
        assert_eq!(output["prompt_cache_retention"], "24h");
        assert_eq!(output["stream_options"], json!({"include_usage": true}));
        assert_eq!(output["top_logprobs"], 2);
        assert_eq!(output["user"], "legacy-user");
    }

    #[test]
    fn chat_to_responses_plugin_preserves_tool_calls_and_outputs() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses,
            )
            .expect("Chat to Responses plugin");
        let input = json!({
            "model": "gpt-5.5",
            "messages": [
                {"role": "user", "content": "Weather?"},
                {
                    "role": "assistant",
                    "content": null,
                    "tool_calls": [{
                        "id": "call_123",
                        "type": "function",
                        "function": {
                            "name": "get_weather",
                            "arguments": "{\"city\":\"NYC\"}"
                        }
                    }]
                },
                {"role": "tool", "tool_call_id": "call_123", "content": "{\"temp\":72}"}
            ]
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::OpenAiResponses,
                ),
            )
            .unwrap();
        let items = output["input"].as_array().expect("Responses input items");
        let function_call = items
            .iter()
            .find(|item| item["type"] == "function_call")
            .expect("function_call input item");
        assert_eq!(function_call["call_id"], "call_123");
        assert_eq!(function_call["name"], "get_weather");
        assert_eq!(function_call["arguments"], "{\"city\":\"NYC\"}");

        let function_output = items
            .iter()
            .find(|item| item["type"] == "function_call_output")
            .expect("function_call_output input item");
        assert_eq!(function_output["call_id"], "call_123");
        assert_eq!(function_output["output"], "{\"temp\":72}");
    }

    #[test]
    fn chat_to_responses_plugin_maps_shell_tool_outputs_for_codex() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses,
            )
            .expect("Chat to Responses plugin");
        let input = json!({
            "model": "gpt-5.5",
            "messages": [
                {"role": "user", "content": "List files"},
                {
                    "role": "assistant",
                    "content": null,
                    "tool_calls": [{
                        "id": "call_shell_123",
                        "type": "function",
                        "function": {
                            "name": "shell",
                            "arguments": "{\"commands\":[\"ls -la\"],\"max_output_length\":4096}"
                        }
                    }]
                },
                {"role": "tool", "tool_call_id": "call_shell_123", "content": "Cargo.toml\nREADME.md\n"}
            ]
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::OpenAiResponses,
                ),
            )
            .unwrap();

        let items = output["input"].as_array().expect("Responses input items");
        let shell_output = items
            .iter()
            .find(|item| item["type"] == "shell_call_output")
            .expect("shell_call_output input item");
        assert_eq!(shell_output["call_id"], "call_shell_123");
        assert_eq!(shell_output["max_output_length"], 4096);
        assert_eq!(shell_output["status"], "completed");
        assert_eq!(
            shell_output["output"][0]["stdout"],
            "Cargo.toml\nREADME.md\n"
        );
        assert_eq!(shell_output["output"][0]["stderr"], "");
        assert_eq!(shell_output["output"][0]["outcome"]["type"], "exit");
        assert_eq!(shell_output["output"][0]["outcome"]["exit_code"], 0);
    }

    #[test]
    fn chat_to_responses_plugin_maps_local_shell_with_official_action_shape() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses,
            )
            .expect("Chat to Responses plugin");
        let input = json!({
            "model": "codex-mini-latest",
            "tools": [{
                "type": "function",
                "function": {
                    "name": "local_shell",
                    "parameters": {"type": "object", "properties": {}}
                }
            }],
            "messages": [
                {"role": "user", "content": "Print working directory"},
                {
                    "role": "assistant",
                    "content": null,
                    "tool_calls": [{
                        "id": "call_local_shell_123",
                        "type": "function",
                        "function": {
                            "name": "local_shell",
                            "arguments": "{\"command\":[\"pwd\"],\"working_directory\":\"/repo\",\"timeout_ms\":1000}"
                        }
                    }]
                },
                {"role": "tool", "tool_call_id": "call_local_shell_123", "content": "/repo\n"}
            ]
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::OpenAiResponses,
                ),
            )
            .unwrap();

        assert_eq!(output["tools"][0]["type"], "local_shell");
        let items = output["input"].as_array().expect("Responses input items");
        let local_shell_call = items
            .iter()
            .find(|item| item["type"] == "local_shell_call")
            .expect("local_shell_call input item");
        assert_eq!(local_shell_call["call_id"], "call_local_shell_123");
        assert_eq!(local_shell_call["action"]["type"], "exec");
        assert_eq!(local_shell_call["action"]["command"], json!(["pwd"]));
        assert_eq!(local_shell_call["action"]["env"], json!({}));
        assert_eq!(local_shell_call["action"]["working_directory"], "/repo");
        assert_eq!(local_shell_call["action"]["timeout_ms"], 1000);

        let local_shell_output = items
            .iter()
            .find(|item| item["type"] == "local_shell_call_output")
            .expect("local_shell_call_output input item");
        assert_eq!(local_shell_output["call_id"], "call_local_shell_123");
        assert_eq!(local_shell_output["output"], "/repo\n");
    }

    #[test]
    fn responses_to_chat_plugin_preserves_function_calls_and_outputs() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            )
            .expect("Responses to Chat plugin");
        let input = json!({
            "model": "gpt-5.5",
            "input": [
                {"role": "user", "content": [{"type": "input_text", "text": "Weather?"}]},
                {
                    "type": "function_call",
                    "call_id": "call_123",
                    "name": "get_weather",
                    "arguments": "{\"city\":\"NYC\"}"
                },
                {
                    "type": "function_call_output",
                    "call_id": "call_123",
                    "output": "{\"temp\":72}"
                }
            ]
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiResponses,
                    ApiSurface::OpenAiChatCompletions,
                ),
            )
            .unwrap();
        let messages = output["messages"].as_array().expect("Chat messages");
        let assistant = messages
            .iter()
            .find(|message| message["role"] == "assistant")
            .expect("assistant tool call message");
        let tool_calls = assistant["tool_calls"].as_array().expect("tool calls");
        assert_eq!(tool_calls[0]["id"], "call_123");
        assert_eq!(tool_calls[0]["function"]["name"], "get_weather");
        assert_eq!(tool_calls[0]["function"]["arguments"], "{\"city\":\"NYC\"}");

        let tool = messages
            .iter()
            .find(|message| message["role"] == "tool")
            .expect("tool output message");
        assert_eq!(tool["tool_call_id"], "call_123");
        assert_eq!(tool["content"], "{\"temp\":72}");
    }

    #[test]
    fn responses_to_chat_plugin_serializes_structured_function_call_outputs() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            )
            .expect("Responses to Chat plugin");
        let input = json!({
            "model": "gpt-5.5",
            "input": [{
                "type": "function_call_output",
                "call_id": "call_123",
                "output": {"temp": 72, "unit": "f"}
            }]
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiResponses,
                    ApiSurface::OpenAiChatCompletions,
                ),
            )
            .unwrap();

        let tool = output["messages"]
            .as_array()
            .expect("Chat messages")
            .iter()
            .find(|message| message["role"] == "tool")
            .expect("tool output message");
        assert_eq!(tool["tool_call_id"], "call_123");
        assert_eq!(tool["content"], "{\"temp\":72,\"unit\":\"f\"}");
    }

    #[test]
    fn chat_response_to_responses_plugin_preserves_tool_calls() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            )
            .expect("Responses to Chat plugin");
        let input = json!({
            "id": "chatcmpl_123",
            "model": "gpt-5.5",
            "choices": [{
                "message": {
                    "role": "assistant",
                    "content": null,
                    "tool_calls": [{
                        "id": "call_123",
                        "type": "function",
                        "function": {
                            "name": "get_weather",
                            "arguments": "{\"city\":\"NYC\"}"
                        }
                    }]
                },
                "finish_reason": "tool_calls"
            }],
            "usage": {"prompt_tokens": 10, "completion_tokens": 4, "total_tokens": 14}
        });

        let output = plugin
            .transform_response(
                &input,
                &context(
                    ApiSurface::OpenAiResponses,
                    ApiSurface::OpenAiChatCompletions,
                ),
            )
            .unwrap();
        let item = output["output"]
            .as_array()
            .expect("Responses output")
            .iter()
            .find(|item| item["type"] == "function_call")
            .expect("function_call output item");
        assert_eq!(item["call_id"], "call_123");
        assert_eq!(item["name"], "get_weather");
        assert_eq!(item["arguments"], "{\"city\":\"NYC\"}");
        assert_eq!(output["output_text"], "");
    }

    #[test]
    fn chat_response_to_responses_plugin_maps_length_finish_to_incomplete_response() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            )
            .expect("Responses to Chat plugin");
        let input = json!({
            "id": "chatcmpl_123",
            "model": "gpt-5.5",
            "choices": [{
                "message": {
                    "role": "assistant",
                    "content": "partial"
                },
                "finish_reason": "length"
            }],
            "usage": {"prompt_tokens": 10, "completion_tokens": 4, "total_tokens": 14},
            "metadata": {"trace_id": "trace-123"},
            "service_tier": "default"
        });

        let output = plugin
            .transform_response(
                &input,
                &context(
                    ApiSurface::OpenAiResponses,
                    ApiSurface::OpenAiChatCompletions,
                ),
            )
            .unwrap();

        assert_eq!(output["status"], "incomplete");
        assert_eq!(output["incomplete_details"]["reason"], "max_output_tokens");
        assert_eq!(output["output"][0]["status"], "incomplete");
        assert_eq!(output["metadata"], json!({"trace_id": "trace-123"}));
        assert_eq!(output["service_tier"], "default");
    }

    #[test]
    fn responses_response_to_chat_plugin_preserves_common_openai_response_fields() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses,
            )
            .expect("Chat to Responses plugin");
        let input = json!({
            "id": "resp_123",
            "model": "gpt-5.5",
            "status": "completed",
            "output_text": "done",
            "metadata": {"trace_id": "trace-123"},
            "service_tier": "default",
            "system_fingerprint": "fp_123",
            "usage": {"input_tokens": 10, "output_tokens": 4, "total_tokens": 14}
        });

        let output = plugin
            .transform_response(
                &input,
                &context(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::OpenAiResponses,
                ),
            )
            .unwrap();

        assert_eq!(output["metadata"], json!({"trace_id": "trace-123"}));
        assert_eq!(output["service_tier"], "default");
        assert_eq!(output["system_fingerprint"], "fp_123");
    }

    #[test]
    fn responses_to_chat_plugin_maps_shell_tools_and_outputs_for_codex() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            )
            .expect("Responses to Chat plugin");
        let input = json!({
            "model": "gpt-5.5",
            "tools": [{"type": "shell", "environment": {"type": "local"}}],
            "input": [
                {"role": "user", "content": [{"type": "input_text", "text": "List files"}]},
                {
                    "type": "shell_call_output",
                    "call_id": "call_shell_123",
                    "output": "Cargo.toml\nREADME.md\n"
                }
            ]
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiResponses,
                    ApiSurface::OpenAiChatCompletions,
                ),
            )
            .unwrap();

        let tools = output["tools"].as_array().expect("Chat tools");
        assert_eq!(tools[0]["type"], "function");
        assert_eq!(tools[0]["function"]["name"], "shell");
        let messages = output["messages"].as_array().expect("Chat messages");
        let tool_message = messages
            .iter()
            .find(|message| message["role"] == "tool")
            .expect("shell tool output message");
        assert_eq!(tool_message["tool_call_id"], "call_shell_123");
        assert_eq!(tool_message["content"], "Cargo.toml\nREADME.md\n");
    }

    #[test]
    fn responses_to_chat_plugin_flattens_official_shell_output_chunks_for_codex() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            )
            .expect("Responses to Chat plugin");
        let input = json!({
            "model": "gpt-5.5",
            "tools": [{"type": "local_shell"}],
            "input": [
                {"role": "user", "content": [{"type": "input_text", "text": "List files"}]},
                {
                    "type": "shell_call_output",
                    "call_id": "call_shell_123",
                    "output": [{
                        "stdout": "Cargo.toml\n",
                        "stderr": "warning: ignored\n",
                        "outcome": {"type": "exit", "exit_code": 0}
                    }]
                }
            ]
        });

        let output = plugin
            .transform_request(
                &input,
                &context(
                    ApiSurface::OpenAiResponses,
                    ApiSurface::OpenAiChatCompletions,
                ),
            )
            .unwrap();

        let tools = output["tools"].as_array().expect("Chat tools");
        assert_eq!(tools[0]["function"]["name"], "local_shell");
        assert_eq!(
            tools[0]["function"]["parameters"]["required"],
            json!(["command"])
        );

        let messages = output["messages"].as_array().expect("Chat messages");
        let tool_message = messages
            .iter()
            .find(|message| message["role"] == "tool")
            .expect("shell tool output message");
        assert_eq!(tool_message["tool_call_id"], "call_shell_123");
        assert_eq!(tool_message["content"], "Cargo.toml\nwarning: ignored\n");
    }

    #[test]
    fn responses_response_to_chat_plugin_maps_shell_calls_for_codex() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses,
            )
            .expect("Chat to Responses plugin");
        let input = json!({
            "id": "resp_shell",
            "model": "gpt-5.5",
            "status": "completed",
            "output": [{
                "type": "local_shell_call",
                "call_id": "call_shell_123",
                "action": {
                    "commands": ["ls -la"],
                    "timeout_ms": 120000,
                    "max_output_length": 4096
                },
                "environment": {"type": "local"},
                "status": "completed"
            }]
        });

        let output = plugin
            .transform_response(
                &input,
                &context(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::OpenAiResponses,
                ),
            )
            .unwrap();

        let choice = &output["choices"][0];
        assert_eq!(choice["finish_reason"], "tool_calls");
        let tool_calls = choice["message"]["tool_calls"]
            .as_array()
            .expect("Chat tool calls");
        assert_eq!(tool_calls[0]["id"], "call_shell_123");
        assert_eq!(tool_calls[0]["function"]["name"], "local_shell");
        assert_eq!(
            tool_calls[0]["function"]["arguments"],
            "{\"commands\":[\"ls -la\"],\"max_output_length\":4096,\"timeout_ms\":120000}"
        );
    }

    #[test]
    fn chat_response_to_responses_plugin_maps_shell_function_call_for_codex() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            )
            .expect("Responses to Chat plugin");
        let input = json!({
            "id": "chatcmpl_shell",
            "model": "gpt-5.5",
            "choices": [{
                "message": {
                    "role": "assistant",
                    "content": null,
                    "tool_calls": [{
                        "id": "call_shell_123",
                        "type": "function",
                        "function": {
                            "name": "shell",
                            "arguments": "{\"commands\":[\"ls -la\"],\"timeout_ms\":120000,\"max_output_length\":4096}"
                        }
                    }]
                },
                "finish_reason": "tool_calls"
            }]
        });

        let output = plugin
            .transform_response(
                &input,
                &context(
                    ApiSurface::OpenAiResponses,
                    ApiSurface::OpenAiChatCompletions,
                ),
            )
            .unwrap();
        let shell_call = output["output"]
            .as_array()
            .expect("Responses output")
            .iter()
            .find(|item| item["type"] == "shell_call")
            .expect("shell_call output item");
        assert_eq!(shell_call["call_id"], "call_shell_123");
        assert_eq!(shell_call["action"]["commands"][0], "ls -la");
        assert_eq!(shell_call["action"]["timeout_ms"], 120000);
    }

    #[test]
    fn chat_response_to_responses_plugin_preserves_local_shell_type_for_codex() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
            )
            .expect("Responses to Chat plugin");
        let input = json!({
            "id": "chatcmpl_shell",
            "model": "gpt-5.5",
            "choices": [{
                "message": {
                    "role": "assistant",
                    "content": null,
                    "tool_calls": [{
                        "id": "call_shell_123",
                        "type": "function",
                        "function": {
                            "name": "local_shell",
                            "arguments": "{\"commands\":[\"pwd\"]}"
                        }
                    }]
                },
                "finish_reason": "tool_calls"
            }]
        });

        let output = plugin
            .transform_response(
                &input,
                &context(
                    ApiSurface::OpenAiResponses,
                    ApiSurface::OpenAiChatCompletions,
                ),
            )
            .unwrap();

        let shell_call = output["output"]
            .as_array()
            .expect("Responses output")
            .iter()
            .find(|item| item["type"] == "local_shell_call")
            .expect("local_shell_call output item");
        assert_eq!(shell_call["call_id"], "call_shell_123");
        assert_eq!(shell_call["action"]["type"], "exec");
        assert_eq!(shell_call["action"]["command"][0], "pwd");
        assert_eq!(shell_call["action"]["env"], json!({}));
    }

    #[test]
    fn responses_response_to_chat_plugin_preserves_function_calls() {
        let registry = plugins::built_in_plugin_registry();
        let plugin = registry
            .resolve(
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses,
            )
            .expect("Chat to Responses plugin");
        let input = json!({
            "id": "resp_123",
            "model": "gpt-5.5",
            "status": "completed",
            "output": [{
                "type": "function_call",
                "call_id": "call_123",
                "name": "get_weather",
                "arguments": "{\"city\":\"NYC\"}"
            }],
            "usage": {"input_tokens": 10, "output_tokens": 4, "total_tokens": 14}
        });

        let output = plugin
            .transform_response(
                &input,
                &context(
                    ApiSurface::OpenAiChatCompletions,
                    ApiSurface::OpenAiResponses,
                ),
            )
            .unwrap();
        let choice = &output["choices"][0];
        assert_eq!(choice["finish_reason"], "tool_calls");
        assert_eq!(choice["message"]["content"], serde_json::Value::Null);
        let tool_calls = choice["message"]["tool_calls"]
            .as_array()
            .expect("Chat tool calls");
        assert_eq!(tool_calls[0]["id"], "call_123");
        assert_eq!(tool_calls[0]["function"]["name"], "get_weather");
        assert_eq!(tool_calls[0]["function"]["arguments"], "{\"city\":\"NYC\"}");
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
    let source_surface = plugins::protocol_default_surface(source);
    let target_surface = plugins::protocol_default_surface(target);
    let context = sdkwork_lr_plugin::TransformContext {
        source: source_surface,
        target: target_surface,
        source_protocol: source,
        target_protocol: target,
        client_path: String::new(),
        client_base_path: String::new(),
        model: body
            .get("model")
            .and_then(|v| v.as_str())
            .map(str::to_owned),
        is_streaming: body
            .get("stream")
            .and_then(|v| v.as_bool())
            .unwrap_or(false),
    };
    transform_request_body_with_context(body, &context)
}

pub fn transform_response_body(
    body: &Value,
    source: Protocol,
    target: Protocol,
    model: &str,
) -> Result<Value, String> {
    let upstream_surface = plugins::protocol_default_surface(source);
    let client_surface = plugins::protocol_default_surface(target);
    let context = sdkwork_lr_plugin::TransformContext {
        source: client_surface,
        target: upstream_surface,
        source_protocol: target,
        target_protocol: source,
        client_path: String::new(),
        client_base_path: String::new(),
        model: Some(model.to_owned()),
        is_streaming: false,
    };
    transform_response_body_with_context(body, &context)
}

pub fn transform_request_body_with_context(
    body: &Value,
    context: &sdkwork_lr_plugin::TransformContext,
) -> Result<Value, String> {
    let registry = plugins::built_in_plugin_registry();
    let plugin = registry
        .resolve(context.source, context.target)
        .ok_or_else(|| {
            format!(
                "unsupported transformation: {} -> {}",
                context.source, context.target
            )
        })?;
    plugin
        .transform_request(body, context)
        .map_err(|error| error.to_string())
}

pub fn transform_response_body_with_context(
    body: &Value,
    context: &sdkwork_lr_plugin::TransformContext,
) -> Result<Value, String> {
    let registry = plugins::built_in_plugin_registry();
    let plugin = registry
        .resolve(context.source, context.target)
        .ok_or_else(|| {
            format!(
                "unsupported transformation: {} -> {}",
                context.source, context.target
            )
        })?;
    plugin
        .transform_response(body, context)
        .map_err(|error| error.to_string())
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
        assert_eq!(
            claude_body.get("max_tokens").and_then(|v| v.as_u64()),
            Some(1024)
        );
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
        assert!(messages
            .iter()
            .any(|m| m.get("role").and_then(|v| v.as_str()) == Some("system")));
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
        assert_eq!(
            openai_body.get("max_tokens").and_then(|v| v.as_u64()),
            Some(512)
        );
    }

    #[test]
    fn gemini_request_generation_config_maps_sampling_fields_to_openai_chat() {
        let gemini_body = serde_json::json!({
            "contents": [
                {"role": "user", "parts": [{"text": "Hello"}]}
            ],
            "generationConfig": {
                "candidateCount": 2,
                "topP": 0.8,
                "topK": 40,
                "presencePenalty": 0.3,
                "frequencyPenalty": 0.4,
                "seed": 12345
            }
        });

        let result = transform_request_body(&gemini_body, Protocol::Google, Protocol::Openai);

        assert!(result.is_ok());
        let openai_body = result.unwrap();
        assert_eq!(openai_body["n"], 2);
        assert_eq!(openai_body["top_p"], 0.8);
        assert_eq!(openai_body["presence_penalty"], 0.3);
        assert_eq!(openai_body["frequency_penalty"], 0.4);
        assert_eq!(openai_body["seed"], 12345);
        assert!(openai_body.get("top_k").is_none());
    }

    #[test]
    fn gemini_request_response_schema_maps_to_openai_response_format() {
        let gemini_body = serde_json::json!({
            "contents": [
                {"role": "user", "parts": [{"text": "Return JSON"}]}
            ],
            "generationConfig": {
                "responseMimeType": "application/json",
                "responseSchema": {
                    "type": "object",
                    "properties": {"ok": {"type": "boolean"}},
                    "required": ["ok"]
                }
            }
        });

        let result = transform_request_body(&gemini_body, Protocol::Google, Protocol::Openai);

        assert!(result.is_ok());
        let openai_body = result.unwrap();
        assert_eq!(openai_body["response_format"]["type"], "json_schema");
        assert_eq!(
            openai_body["response_format"]["json_schema"]["schema"],
            serde_json::json!({
                "type": "object",
                "properties": {"ok": {"type": "boolean"}},
                "required": ["ok"]
            })
        );
    }

    #[test]
    fn gemini_request_json_mime_without_schema_maps_to_openai_json_object() {
        let gemini_body = serde_json::json!({
            "contents": [
                {"role": "user", "parts": [{"text": "Return JSON"}]}
            ],
            "generationConfig": {
                "responseMimeType": "application/json"
            }
        });

        let result = transform_request_body(&gemini_body, Protocol::Google, Protocol::Openai);

        assert!(result.is_ok());
        let openai_body = result.unwrap();
        assert_eq!(
            openai_body["response_format"],
            serde_json::json!({"type": "json_object"})
        );
    }

    #[test]
    fn test_gemini_request_with_function_call_to_openai() {
        let gemini_body = serde_json::json!({
            "contents": [
                {"role": "user", "parts": [{"text": "Weather?"}]},
                {
                    "role": "model",
                    "parts": [
                        {"text": "Let me check."},
                        {"functionCall": {"name": "get_weather", "args": {"city": "NYC"}}}
                    ]
                },
                {
                    "role": "user",
                    "parts": [
                        {"functionResponse": {"name": "get_weather", "response": {"temp": 72}}}
                    ]
                }
            ],
            "tools": [{
                "functionDeclarations": [{
                    "name": "get_weather",
                    "description": "Get weather",
                    "parameters": {"type": "object", "properties": {"city": {"type": "string"}}}
                }]
            }]
        });

        let result = transform_request_body(&gemini_body, Protocol::Google, Protocol::Openai);

        assert!(result.is_ok());
        let openai_body = result.unwrap();
        let messages = openai_body.get("messages").unwrap().as_array().unwrap();
        let assistant = messages
            .iter()
            .find(|message| message.get("role").and_then(|v| v.as_str()) == Some("assistant"))
            .expect("assistant message");
        assert_eq!(assistant["content"], "Let me check.");
        let tool_calls = assistant["tool_calls"].as_array().expect("tool calls");
        assert_eq!(tool_calls[0]["function"]["name"], "get_weather");
        assert_eq!(tool_calls[0]["function"]["arguments"], "{\"city\":\"NYC\"}");

        let tool = messages
            .iter()
            .find(|message| message.get("role").and_then(|v| v.as_str()) == Some("tool"))
            .expect("tool message");
        assert_eq!(tool["content"], "{\"temp\":72}");

        let tools = openai_body.get("tools").unwrap().as_array().unwrap();
        assert_eq!(tools[0]["type"], "function");
        assert_eq!(tools[0]["function"]["name"], "get_weather");
    }

    #[test]
    fn gemini_request_with_image_parts_maps_to_openai_content_parts() {
        let gemini_body = serde_json::json!({
            "contents": [{
                "role": "user",
                "parts": [
                    {"text": "Describe this."},
                    {"inlineData": {"mimeType": "image/png", "data": "aGVsbG8="}},
                    {"fileData": {"mimeType": "image/webp", "fileUri": "https://example.com/image.webp"}}
                ]
            }]
        });

        let result = transform_request_body(&gemini_body, Protocol::Google, Protocol::Openai);

        assert!(result.is_ok());
        let openai_body = result.unwrap();
        let content = openai_body["messages"][0]["content"].as_array().unwrap();
        assert_eq!(
            content[0],
            serde_json::json!({"type": "text", "text": "Describe this."})
        );
        assert_eq!(
            content[1],
            serde_json::json!({
                "type": "image_url",
                "image_url": {"url": "data:image/png;base64,aGVsbG8="}
            })
        );
        assert_eq!(
            content[2],
            serde_json::json!({
                "type": "image_url",
                "image_url": {"url": "https://example.com/image.webp"}
            })
        );
    }

    #[test]
    fn test_gemini_tool_config_to_openai_tool_choice() {
        let gemini_body = serde_json::json!({
            "contents": [{"role": "user", "parts": [{"text": "Weather?"}]}],
            "toolConfig": {
                "functionCallingConfig": {
                    "mode": "ANY",
                    "allowedFunctionNames": ["get_weather"]
                }
            }
        });

        let result = transform_request_body(&gemini_body, Protocol::Google, Protocol::Openai);

        assert!(result.is_ok());
        let openai_body = result.unwrap();
        assert_eq!(
            openai_body["tool_choice"],
            serde_json::json!({"type": "function", "function": {"name": "get_weather"}})
        );
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

        let result = transform_response_body(
            &claude_response,
            Protocol::Anthropic,
            Protocol::Openai,
            "claude-3",
        );
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

        let result = transform_response_body(
            &gemini_response,
            Protocol::Google,
            Protocol::Openai,
            "gemini-pro",
        );
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

        let result = transform_response_body(
            &openai_response,
            Protocol::Openai,
            Protocol::Anthropic,
            "gpt-4",
        );
        assert!(result.is_ok());
        let claude_response = result.unwrap();
        assert_eq!(
            claude_response.get("type").and_then(|v| v.as_str()),
            Some("message")
        );
        assert!(claude_response.get("content").is_some());
    }

    #[test]
    fn openai_content_filter_finish_maps_to_claude_refusal_stop_reason() {
        let openai_response = serde_json::json!({
            "id": "chatcmpl-123",
            "choices": [{
                "message": {"role": "assistant", "content": "blocked"},
                "finish_reason": "content_filter"
            }],
            "usage": {"prompt_tokens": 10, "completion_tokens": 2}
        });

        let result = transform_response_body(
            &openai_response,
            Protocol::Openai,
            Protocol::Anthropic,
            "gpt-4",
        );

        assert!(result.is_ok());
        let claude_response = result.unwrap();
        assert_eq!(claude_response["stop_reason"], "refusal");
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

        let result = transform_response_body(
            &openai_response,
            Protocol::Openai,
            Protocol::Google,
            "gpt-4",
        );
        assert!(result.is_ok());
        let gemini_response = result.unwrap();
        assert!(gemini_response.get("candidates").is_some());
    }

    #[test]
    fn openai_multiple_choices_map_to_gemini_candidates() {
        let openai_response = serde_json::json!({
            "id": "chatcmpl-123",
            "choices": [
                {
                    "index": 0,
                    "message": {"role": "assistant", "content": "First"},
                    "finish_reason": "stop"
                },
                {
                    "index": 1,
                    "message": {"role": "assistant", "content": "Second"},
                    "finish_reason": "length"
                }
            ],
            "usage": {"prompt_tokens": 10, "completion_tokens": 8}
        });

        let result = transform_response_body(
            &openai_response,
            Protocol::Openai,
            Protocol::Google,
            "gpt-4",
        );

        assert!(result.is_ok());
        let gemini_response = result.unwrap();
        let candidates = gemini_response["candidates"]
            .as_array()
            .expect("candidates");
        assert_eq!(candidates.len(), 2);
        assert_eq!(candidates[0]["index"], 0);
        assert_eq!(candidates[0]["content"]["parts"][0]["text"], "First");
        assert_eq!(candidates[0]["finishReason"], "STOP");
        assert_eq!(candidates[1]["index"], 1);
        assert_eq!(candidates[1]["content"]["parts"][0]["text"], "Second");
        assert_eq!(candidates[1]["finishReason"], "MAX_TOKENS");
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
        assert!(messages
            .iter()
            .any(|m| m.get("role").and_then(|v| v.as_str()) == Some("tool")));
        assert!(openai_body.get("tools").is_some());
    }

    #[test]
    fn claude_request_with_image_blocks_maps_to_openai_content_parts() {
        let claude_body = serde_json::json!({
            "model": "claude-3",
            "max_tokens": 1024,
            "messages": [{
                "role": "user",
                "content": [
                    {"type": "text", "text": "Describe this."},
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/png",
                            "data": "aGVsbG8="
                        }
                    },
                    {
                        "type": "image",
                        "source": {
                            "type": "url",
                            "url": "https://example.com/image.webp"
                        }
                    }
                ]
            }]
        });

        let result = transform_request_body(&claude_body, Protocol::Anthropic, Protocol::Openai);

        assert!(result.is_ok());
        let openai_body = result.unwrap();
        let content = openai_body["messages"][0]["content"].as_array().unwrap();
        assert_eq!(
            content[0],
            serde_json::json!({"type": "text", "text": "Describe this."})
        );
        assert_eq!(
            content[1],
            serde_json::json!({
                "type": "image_url",
                "image_url": {"url": "data:image/png;base64,aGVsbG8="}
            })
        );
        assert_eq!(
            content[2],
            serde_json::json!({
                "type": "image_url",
                "image_url": {"url": "https://example.com/image.webp"}
            })
        );
    }

    #[test]
    fn claude_tool_result_array_content_maps_to_openai_tool_content_json() {
        let claude_body = serde_json::json!({
            "model": "claude-3",
            "max_tokens": 1024,
            "messages": [{
                "role": "user",
                "content": [{
                    "type": "tool_result",
                    "tool_use_id": "tool_1",
                    "content": [
                        {"type": "text", "text": "Sunny"},
                        {"type": "text", "text": "72F"}
                    ]
                }]
            }]
        });

        let result = transform_request_body(&claude_body, Protocol::Anthropic, Protocol::Openai);

        assert!(result.is_ok());
        let openai_body = result.unwrap();
        assert_eq!(openai_body["messages"][0]["role"], "tool");
        assert_eq!(openai_body["messages"][0]["tool_call_id"], "tool_1");
        assert_eq!(openai_body["messages"][0]["content"], "Sunny72F");
    }

    #[test]
    fn test_claude_tool_choice_to_openai() {
        let claude_body = serde_json::json!({
            "model": "claude-3",
            "messages": [{"role": "user", "content": "Weather?"}],
            "max_tokens": 1024,
            "tool_choice": {"type": "tool", "name": "get_weather"}
        });

        let result = transform_request_body(&claude_body, Protocol::Anthropic, Protocol::Openai);

        assert!(result.is_ok());
        let openai_body = result.unwrap();
        assert_eq!(
            openai_body["tool_choice"],
            serde_json::json!({"type": "function", "function": {"name": "get_weather"}})
        );
    }

    #[test]
    fn claude_request_sampling_fields_map_to_openai_when_supported() {
        let claude_body = serde_json::json!({
            "model": "claude-3",
            "messages": [{"role": "user", "content": "Hello"}],
            "max_tokens": 1024,
            "temperature": 0.2,
            "top_p": 0.8,
            "top_k": 40
        });

        let result = transform_request_body(&claude_body, Protocol::Anthropic, Protocol::Openai);

        assert!(result.is_ok());
        let openai_body = result.unwrap();
        assert_eq!(openai_body["temperature"], 0.2);
        assert_eq!(openai_body["top_p"], 0.8);
        assert!(openai_body.get("top_k").is_none());
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
                let has_tool_result = content_arr
                    .iter()
                    .any(|block| block.get("type").and_then(|v| v.as_str()) == Some("tool_result"));

                if has_tool_result {
                    for block in content_arr {
                        if block.get("type").and_then(|v| v.as_str()) == Some("tool_result") {
                            let tool_use_id = block
                                .get("tool_use_id")
                                .and_then(|v| v.as_str())
                                .unwrap_or("");
                            let tool_content =
                                claude_tool_result_content_to_openai(block.get("content"));
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

        if role == "user" {
            if let Some(content_arr) = content.as_array() {
                let content_parts = claude_content_blocks_to_openai_parts(content_arr);
                if !content_parts.is_empty() {
                    openai_messages.push(serde_json::json!({
                        "role": "user",
                        "content": content_parts
                    }));
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
                            let id = block
                                .get("id")
                                .and_then(|v| v.as_str())
                                .unwrap_or("")
                                .to_owned();
                            let name = block
                                .get("name")
                                .and_then(|v| v.as_str())
                                .unwrap_or("")
                                .to_owned();
                            let input =
                                block.get("input").cloned().unwrap_or(serde_json::json!({}));
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
    if let Some(top_p) = body.get("top_p") {
        result["top_p"] = top_p.clone();
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
    if let Some(tool_choice) = body.get("tool_choice") {
        if let Some(openai_tool_choice) = claude_tool_choice_to_openai(tool_choice) {
            result["tool_choice"] = openai_tool_choice;
        }
    }

    if let Some(tools) = body.get("tools").and_then(|v| v.as_array()) {
        let openai_tools: Vec<Value> = tools
            .iter()
            .map(|tool| {
                let name = tool.get("name").and_then(|v| v.as_str()).unwrap_or("");
                let description = tool
                    .get("description")
                    .and_then(|v| v.as_str())
                    .unwrap_or("");
                let parameters = tool
                    .get("input_schema")
                    .cloned()
                    .unwrap_or(serde_json::json!({"type": "object", "properties": {}}));
                serde_json::json!({
                    "type": "function",
                    "function": {
                        "name": name,
                        "description": description,
                        "parameters": parameters
                    }
                })
            })
            .collect();

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
    let mut tool_call_ids: std::collections::HashMap<String, String> =
        std::collections::HashMap::new();
    let mut next_tool_call_index = 0usize;

    if let Some(sys) = body.get("systemInstruction") {
        let text = sys
            .get("parts")
            .and_then(|p| p.as_array())
            .map(|parts| {
                parts
                    .iter()
                    .filter_map(|part| part.get("text").and_then(|t| t.as_str()))
                    .collect::<Vec<_>>()
                    .join("\n")
            })
            .unwrap_or_default();
        if !text.is_empty() {
            openai_messages.push(serde_json::json!({"role": "system", "content": text}));
        }
    }

    for content in contents_arr {
        let role = content
            .get("role")
            .and_then(|v| v.as_str())
            .unwrap_or("user");
        let openai_role = match role {
            "model" => "assistant",
            _ => role,
        };
        let parts = content
            .get("parts")
            .and_then(|p| p.as_array())
            .cloned()
            .unwrap_or_default();
        let openai_content_parts = gemini_parts_to_openai_content_parts(&parts);
        let text = openai_content_parts
            .iter()
            .filter_map(|part| {
                part.get("text")
                    .and_then(|t| t.as_str())
                    .or_else(|| part.as_str())
            })
            .collect::<Vec<_>>()
            .join("");
        let function_calls: Vec<Value> = parts
            .iter()
            .filter_map(|part| part.get("functionCall"))
            .filter_map(|function_call| {
                let name = function_call.get("name").and_then(|v| v.as_str())?;
                let args = function_call
                    .get("args")
                    .cloned()
                    .unwrap_or_else(|| serde_json::json!({}));
                let arguments = serde_json::to_string(&args).unwrap_or_else(|_| "{}".to_owned());
                let call_id = format!("call_{next_tool_call_index}");
                next_tool_call_index += 1;
                tool_call_ids.insert(name.to_owned(), call_id.clone());
                Some(serde_json::json!({
                    "id": call_id,
                    "type": "function",
                    "function": {
                        "name": name,
                        "arguments": arguments
                    }
                }))
            })
            .collect();
        let function_responses: Vec<Value> = parts
            .iter()
            .filter_map(|part| part.get("functionResponse"))
            .filter_map(|function_response| {
                let name = function_response.get("name").and_then(|v| v.as_str())?;
                let response = function_response
                    .get("response")
                    .cloned()
                    .unwrap_or_else(|| serde_json::json!({}));
                let tool_call_id = tool_call_ids
                    .get(name)
                    .cloned()
                    .unwrap_or_else(|| format!("call_{name}"));
                let content = serde_json::to_string(&response).unwrap_or_default();
                Some(serde_json::json!({
                    "role": "tool",
                    "tool_call_id": tool_call_id,
                    "content": content
                }))
            })
            .collect();

        if openai_role == "assistant" {
            let mut message = serde_json::json!({
                "role": "assistant",
                "content": if text.is_empty() && !function_calls.is_empty() {
                    Value::Null
                } else {
                    Value::String(text)
                }
            });
            if !function_calls.is_empty() {
                message["tool_calls"] = Value::Array(function_calls);
            }
            openai_messages.push(message);
        } else {
            if !text.is_empty() || function_responses.is_empty() {
                let content = if openai_content_parts
                    .iter()
                    .any(|part| part.get("type").and_then(|v| v.as_str()) == Some("image_url"))
                {
                    Value::Array(openai_content_parts.clone())
                } else {
                    Value::String(text)
                };
                openai_messages.push(serde_json::json!({"role": openai_role, "content": content}));
            }
            openai_messages.extend(function_responses);
        }
    }

    let mut result = serde_json::json!({"messages": openai_messages});

    if let Some(gen_config) = body.get("generationConfig") {
        if let Some(max) = gen_config.get("maxOutputTokens") {
            result["max_tokens"] = max.clone();
        }
        if let Some(temp) = gen_config.get("temperature") {
            result["temperature"] = temp.clone();
        }
        if let Some(top_p) = gen_config.get("topP").or_else(|| gen_config.get("top_p")) {
            result["top_p"] = top_p.clone();
        }
        if let Some(candidate_count) = gen_config
            .get("candidateCount")
            .or_else(|| gen_config.get("candidate_count"))
        {
            result["n"] = candidate_count.clone();
        }
        if let Some(presence_penalty) = gen_config
            .get("presencePenalty")
            .or_else(|| gen_config.get("presence_penalty"))
        {
            result["presence_penalty"] = presence_penalty.clone();
        }
        if let Some(frequency_penalty) = gen_config
            .get("frequencyPenalty")
            .or_else(|| gen_config.get("frequency_penalty"))
        {
            result["frequency_penalty"] = frequency_penalty.clone();
        }
        if let Some(seed) = gen_config.get("seed") {
            result["seed"] = seed.clone();
        }
        if let Some(response_format) =
            gemini_generation_config_to_openai_response_format(gen_config)
        {
            result["response_format"] = response_format;
        }
        if let Some(stop) = gen_config.get("stopSequences") {
            result["stop"] = stop.clone();
        }
    }

    if let Some(tools) = body.get("tools").and_then(|v| v.as_array()) {
        let openai_tools: Vec<Value> = tools
            .iter()
            .flat_map(|tool| {
                tool.get("functionDeclarations")
                    .and_then(|v| v.as_array())
                    .cloned()
                    .unwrap_or_default()
            })
            .map(|declaration| {
                serde_json::json!({
                    "type": "function",
                    "function": {
                        "name": declaration.get("name").and_then(|v| v.as_str()).unwrap_or(""),
                        "description": declaration.get("description").and_then(|v| v.as_str()).unwrap_or(""),
                        "parameters": declaration.get("parameters").cloned().unwrap_or_else(|| serde_json::json!({"type": "object", "properties": {}}))
                    }
                })
            })
            .collect();
        if !openai_tools.is_empty() {
            result["tools"] = Value::Array(openai_tools);
        }
    }
    if let Some(tool_config) = body.get("toolConfig") {
        if let Some(openai_tool_choice) = gemini_tool_config_to_openai_tool_choice(tool_config) {
            result["tool_choice"] = openai_tool_choice;
        }
    }

    Ok(result)
}

fn claude_tool_result_content_to_openai(content: Option<&Value>) -> String {
    match content {
        Some(Value::String(text)) => text.clone(),
        Some(Value::Array(parts)) => parts
            .iter()
            .filter_map(|part| {
                part.get("text")
                    .and_then(|v| v.as_str())
                    .or_else(|| part.as_str())
            })
            .collect::<Vec<_>>()
            .join(""),
        Some(Value::Null) | None => String::new(),
        Some(value) => value.to_string(),
    }
}

fn claude_content_blocks_to_openai_parts(blocks: &[Value]) -> Vec<Value> {
    blocks
        .iter()
        .filter_map(|block| match block.get("type").and_then(|v| v.as_str()) {
            Some("text") => Some(serde_json::json!({
                "type": "text",
                "text": block.get("text").and_then(|v| v.as_str()).unwrap_or("")
            })),
            Some("image") => block
                .get("source")
                .and_then(claude_image_source_to_openai_image_url),
            _ => None,
        })
        .collect()
}

fn claude_image_source_to_openai_image_url(source: &Value) -> Option<Value> {
    match source.get("type").and_then(|v| v.as_str())? {
        "base64" => {
            let media_type = source
                .get("media_type")
                .and_then(|v| v.as_str())
                .unwrap_or("image/jpeg");
            let data = source.get("data").and_then(|v| v.as_str())?;
            Some(serde_json::json!({
                "type": "image_url",
                "image_url": {"url": format!("data:{media_type};base64,{data}")}
            }))
        }
        "url" => {
            let url = source.get("url").and_then(|v| v.as_str())?;
            Some(serde_json::json!({
                "type": "image_url",
                "image_url": {"url": url}
            }))
        }
        _ => None,
    }
}

fn gemini_parts_to_openai_content_parts(parts: &[Value]) -> Vec<Value> {
    parts
        .iter()
        .filter_map(|part| {
            if let Some(text) = part.get("text").and_then(|v| v.as_str()) {
                return Some(serde_json::json!({"type": "text", "text": text}));
            }
            if let Some(inline_data) = part.get("inlineData").or_else(|| part.get("inline_data")) {
                let mime_type = inline_data
                    .get("mimeType")
                    .or_else(|| inline_data.get("mime_type"))
                    .and_then(|v| v.as_str())
                    .unwrap_or("image/jpeg");
                let data = inline_data.get("data").and_then(|v| v.as_str())?;
                return Some(serde_json::json!({
                    "type": "image_url",
                    "image_url": {"url": format!("data:{mime_type};base64,{data}")}
                }));
            }
            if let Some(file_data) = part.get("fileData").or_else(|| part.get("file_data")) {
                let url = file_data
                    .get("fileUri")
                    .or_else(|| file_data.get("file_uri"))
                    .and_then(|v| v.as_str())?;
                return Some(serde_json::json!({
                    "type": "image_url",
                    "image_url": {"url": url}
                }));
            }
            None
        })
        .collect()
}

fn claude_tool_choice_to_openai(tool_choice: &Value) -> Option<Value> {
    match tool_choice.get("type").and_then(|v| v.as_str())? {
        "auto" => Some(Value::String("auto".to_owned())),
        "none" => Some(Value::String("none".to_owned())),
        "any" => Some(Value::String("required".to_owned())),
        "tool" => {
            let name = tool_choice.get("name").and_then(|v| v.as_str())?;
            Some(serde_json::json!({
                "type": "function",
                "function": {"name": name}
            }))
        }
        _ => None,
    }
}

fn gemini_tool_config_to_openai_tool_choice(tool_config: &Value) -> Option<Value> {
    let function_config = tool_config.get("functionCallingConfig")?;
    match function_config.get("mode").and_then(|v| v.as_str())? {
        "NONE" => Some(Value::String("none".to_owned())),
        "AUTO" => Some(Value::String("auto".to_owned())),
        "ANY" => {
            let allowed = function_config
                .get("allowedFunctionNames")
                .and_then(|v| v.as_array())
                .and_then(|names| names.first())
                .and_then(|value| value.as_str());
            if let Some(name) = allowed {
                Some(serde_json::json!({
                    "type": "function",
                    "function": {"name": name}
                }))
            } else {
                Some(Value::String("required".to_owned()))
            }
        }
        _ => None,
    }
}

fn gemini_generation_config_to_openai_response_format(gen_config: &Value) -> Option<Value> {
    let mime_type = gen_config
        .get("responseMimeType")
        .or_else(|| gen_config.get("response_mime_type"))
        .and_then(|v| v.as_str())?;
    if !mime_type.eq_ignore_ascii_case("application/json") {
        return None;
    }

    if let Some(schema) = gen_config
        .get("responseSchema")
        .or_else(|| gen_config.get("response_schema"))
    {
        return Some(serde_json::json!({
            "type": "json_schema",
            "json_schema": {
                "name": "response",
                "schema": schema,
                "strict": false
            }
        }));
    }

    Some(serde_json::json!({"type": "json_object"}))
}

fn openai_response_to_claude(body: &Value, model: &str) -> Result<Value, String> {
    let message = body
        .get("choices")
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
                let id = tc
                    .get("id")
                    .and_then(|v| v.as_str())
                    .unwrap_or("")
                    .to_owned();
                let name = tc
                    .get("function")
                    .and_then(|f| f.get("name"))
                    .and_then(|n| n.as_str())
                    .unwrap_or("")
                    .to_owned();
                let arguments_str = tc
                    .get("function")
                    .and_then(|f| f.get("arguments"))
                    .and_then(|a| a.as_str())
                    .unwrap_or("{}");
                let input: Value =
                    serde_json::from_str(arguments_str).unwrap_or(serde_json::json!({}));

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

    let finish_reason = body
        .get("choices")
        .and_then(|c| c.as_array())
        .and_then(|c| c.first())
        .and_then(|c| c.get("finish_reason"))
        .and_then(|f| f.as_str());

    let stop_reason = match finish_reason {
        Some("stop") => "end_turn",
        Some("length") => "max_tokens",
        Some("tool_calls") => "tool_use",
        Some("content_filter") => "refusal",
        _ => "end_turn",
    };

    let usage = body.get("usage");
    let input_tokens = usage
        .and_then(|u| u.get("prompt_tokens"))
        .and_then(|v| v.as_u64())
        .unwrap_or(0);
    let output_tokens = usage
        .and_then(|u| u.get("completion_tokens"))
        .and_then(|v| v.as_u64())
        .unwrap_or(0);

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
    let candidates = body
        .get("choices")
        .and_then(|c| c.as_array())
        .map(|choices| {
            choices
                .iter()
                .enumerate()
                .map(|(fallback_index, choice)| {
                    openai_choice_to_gemini_candidate(choice, fallback_index)
                })
                .collect::<Vec<_>>()
        })
        .filter(|candidates| !candidates.is_empty())
        .unwrap_or_else(|| vec![empty_gemini_candidate()]);

    let usage = body.get("usage");
    let prompt_tokens = usage
        .and_then(|u| u.get("prompt_tokens"))
        .and_then(|v| v.as_u64())
        .unwrap_or(0);
    let completion_tokens = usage
        .and_then(|u| u.get("completion_tokens"))
        .and_then(|v| v.as_u64())
        .unwrap_or(0);

    Ok(serde_json::json!({
        "candidates": candidates,
        "usageMetadata": {
            "promptTokenCount": prompt_tokens,
            "candidatesTokenCount": completion_tokens,
            "totalTokenCount": prompt_tokens + completion_tokens
        }
    }))
}

fn openai_choice_to_gemini_candidate(choice: &Value, fallback_index: usize) -> Value {
    let message = choice.get("message");
    let mut parts = message
        .map(openai_message_to_gemini_parts)
        .unwrap_or_default();

    if parts.is_empty() {
        parts.push(serde_json::json!({"text": ""}));
    }

    let finish_reason = choice.get("finish_reason").and_then(|f| f.as_str());

    serde_json::json!({
        "content": {"parts": parts, "role": "model"},
        "finishReason": openai_finish_reason_to_gemini(finish_reason),
        "index": choice
            .get("index")
            .and_then(|v| v.as_u64())
            .unwrap_or(fallback_index as u64)
    })
}

fn openai_message_to_gemini_parts(msg: &Value) -> Vec<Value> {
    let mut parts = Vec::new();

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

            parts.push(serde_json::json!({
                "functionCall": {
                    "name": name,
                    "args": serde_json::from_str::<Value>(arguments_str).unwrap_or(serde_json::json!({}))
                }
            }));
        }
    }

    parts
}

fn empty_gemini_candidate() -> Value {
    serde_json::json!({
        "content": {"parts": [{"text": ""}], "role": "model"},
        "finishReason": "STOP",
        "index": 0
    })
}

fn openai_finish_reason_to_gemini(finish_reason: Option<&str>) -> &'static str {
    match finish_reason {
        Some("length") => "MAX_TOKENS",
        Some("content_filter") => "SAFETY",
        _ => "STOP",
    }
}
