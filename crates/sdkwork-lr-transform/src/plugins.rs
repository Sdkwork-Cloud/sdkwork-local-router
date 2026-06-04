use std::collections::HashMap;
use std::sync::Arc;

use sdkwork_lr_core::Protocol;
use sdkwork_lr_plugin::{
    standard_manifest, ApiSurface, ApiTransformPlugin, PluginCapabilities, PluginError,
    PluginManifest, PluginRegistry, TransformContext,
};
use serde_json::{json, Value};

type TransformFn = fn(&Value, &TransformContext) -> Result<Value, PluginError>;

struct JsonTransformPlugin {
    manifest: PluginManifest,
    request: TransformFn,
    response: TransformFn,
}

#[derive(Debug, Clone)]
struct ChatToolCallKind {
    name: String,
    max_output_length: Option<Value>,
}

impl ApiTransformPlugin for JsonTransformPlugin {
    fn manifest(&self) -> &PluginManifest {
        &self.manifest
    }

    fn transform_request(
        &self,
        body: &Value,
        context: &TransformContext,
    ) -> Result<Value, PluginError> {
        (self.request)(body, context)
    }

    fn transform_response(
        &self,
        body: &Value,
        context: &TransformContext,
    ) -> Result<Value, PluginError> {
        (self.response)(body, context)
    }
}

pub fn built_in_plugin_registry() -> PluginRegistry {
    let mut registry = PluginRegistry::new();
    for plugin in built_in_plugins() {
        registry
            .register(plugin)
            .expect("built-in transform plugin manifests must be valid and unique");
    }
    registry
}

pub fn built_in_plugin_manifests() -> Vec<PluginManifest> {
    built_in_plugin_registry().manifests()
}

fn built_in_plugins() -> Vec<Arc<dyn ApiTransformPlugin>> {
    vec![
        plugin(
            ApiSurface::OpenAiChatCompletions,
            ApiSurface::OpenAiResponses,
            PluginCapabilities::full_streaming_json(),
            "Convert OpenAI Chat Completions API requests and responses to OpenAI Responses API.",
            vec!["OPENAI_COMPATIBLE_CHAT_TO_RESPONSE_API"],
            chat_request_to_responses,
            responses_response_to_chat,
        ),
        plugin(
            ApiSurface::OpenAiResponses,
            ApiSurface::OpenAiChatCompletions,
            PluginCapabilities::full_streaming_json(),
            "Convert OpenAI Responses API requests and responses to OpenAI Chat Completions API.",
            vec!["OPENAI_COMPATIBLE_RESPONSE_TO_CHAT_API"],
            responses_request_to_chat,
            chat_response_to_responses,
        ),
        plugin(
            ApiSurface::OpenAiChatCompletions,
            ApiSurface::AnthropicMessages,
            PluginCapabilities::full_streaming_json(),
            "Convert OpenAI Chat Completions API to Anthropic Messages API.",
            vec!["OPENAI_COMPATIBLE_CHAT_TO_CLAUDE_MESSAGE_API"],
            chat_request_to_claude,
            claude_response_to_chat,
        ),
        plugin(
            ApiSurface::OpenAiChatCompletions,
            ApiSurface::GeminiGenerateContent,
            PluginCapabilities::full_streaming_json(),
            "Convert OpenAI Chat Completions API to Gemini GenerateContent API.",
            vec!["OPENAI_COMPATIBLE_CHAT_TO_GEMINI_MESSAGE_API"],
            chat_request_to_gemini,
            gemini_response_to_chat,
        ),
        plugin(
            ApiSurface::OpenAiResponses,
            ApiSurface::AnthropicMessages,
            PluginCapabilities::full_streaming_json(),
            "Convert OpenAI Responses API to Anthropic Messages API.",
            vec![
                "OPENAI_COMPATIBLE_RESPONSE_TO_CLAUDE_MESSAGE_API",
                "OPENAI_COMPATIBLE_RESPONSE_TO_CLAUDE_MESSAGES_API",
                "OPENAI_COMPATIBLE_RESPONSE_TO_ANTHROPIC_MESSAGES_API",
            ],
            responses_request_to_claude,
            claude_response_to_responses,
        ),
        plugin(
            ApiSurface::OpenAiResponses,
            ApiSurface::GeminiGenerateContent,
            PluginCapabilities::full_streaming_json(),
            "Convert OpenAI Responses API to Gemini GenerateContent API.",
            vec!["OPENAI_COMPATIBLE_RESPONSE_TO_GEMINI_MESSAGE_API"],
            responses_request_to_gemini,
            gemini_response_to_responses,
        ),
        plugin(
            ApiSurface::AnthropicMessages,
            ApiSurface::OpenAiChatCompletions,
            PluginCapabilities::full_streaming_json(),
            "Convert Anthropic Messages API to OpenAI Chat Completions API.",
            vec![
                "CLAUDE_MESSAGE_TO_OPENAI_CHAT_API",
                "CLAUDE_MESSAGES_TO_OPENAI_CHAT_API",
            ],
            claude_request_to_chat,
            chat_response_to_claude,
        ),
        plugin(
            ApiSurface::GeminiGenerateContent,
            ApiSurface::OpenAiChatCompletions,
            PluginCapabilities::full_streaming_json(),
            "Convert Gemini GenerateContent API to OpenAI Chat Completions API.",
            vec![
                "GEMINI_MESSAGE_TO_OPENAI_CHAT_API",
                "GEMINI_MESSAGES_TO_OPENAI_CHAT_API",
            ],
            gemini_request_to_chat,
            chat_response_to_gemini,
        ),
        plugin(
            ApiSurface::AnthropicMessages,
            ApiSurface::OpenAiResponses,
            PluginCapabilities::full_streaming_json(),
            "Convert Anthropic Messages API to OpenAI Responses API.",
            vec![
                "CLAUDE_MESSAGE_TO_OPENAI_RESPONSE_API",
                "CLAUDE_MESSAGES_TO_OPENAI_RESPONSE_API",
            ],
            claude_request_to_responses,
            responses_response_to_claude,
        ),
        plugin(
            ApiSurface::GeminiGenerateContent,
            ApiSurface::OpenAiResponses,
            PluginCapabilities::full_streaming_json(),
            "Convert Gemini GenerateContent API to OpenAI Responses API.",
            vec![
                "GEMINI_MESSAGE_TO_OPENAI_RESPONSE_API",
                "GEMINI_MESSAGES_TO_OPENAI_RESPONSE_API",
            ],
            gemini_request_to_responses,
            responses_response_to_gemini,
        ),
        plugin(
            ApiSurface::AnthropicMessages,
            ApiSurface::GeminiGenerateContent,
            PluginCapabilities::full_streaming_json(),
            "Convert Anthropic Messages API to Gemini GenerateContent API through OpenAI Chat canonical shape.",
            vec![],
            claude_request_to_gemini,
            gemini_response_to_claude,
        ),
        plugin(
            ApiSurface::GeminiGenerateContent,
            ApiSurface::AnthropicMessages,
            PluginCapabilities::full_streaming_json(),
            "Convert Gemini GenerateContent API to Anthropic Messages API through OpenAI Chat canonical shape.",
            vec![],
            gemini_request_to_claude,
            claude_response_to_gemini,
        ),
        plugin(
            ApiSurface::OpenAiBatch,
            ApiSurface::OpenAiChatCompletions,
            PluginCapabilities::reserved(),
            "Reserved standard for converting OpenAI Batch API work items to OpenAI Chat Completions execution.",
            vec!["OPENAI_COMPATIBLE_BATCH_TO_CHAT_API"],
            reserved_batch_transform,
            reserved_batch_transform,
        ),
        plugin(
            ApiSurface::OpenAiBatch,
            ApiSurface::OpenAiResponses,
            PluginCapabilities::reserved(),
            "Reserved standard for converting OpenAI Batch API work items to OpenAI Responses execution.",
            vec!["OPENAI_COMPATIBLE_BATCH_TO_RESPONSE_API"],
            reserved_batch_transform,
            reserved_batch_transform,
        ),
    ]
}

fn plugin(
    source: ApiSurface,
    target: ApiSurface,
    capabilities: PluginCapabilities,
    description: &str,
    aliases: Vec<&str>,
    request: TransformFn,
    response: TransformFn,
) -> Arc<dyn ApiTransformPlugin> {
    Arc::new(JsonTransformPlugin {
        manifest: standard_manifest(
            source,
            target,
            "sdkwork-lr-transform",
            env!("CARGO_PKG_VERSION"),
            capabilities,
            description,
            aliases.into_iter().map(str::to_owned).collect(),
        ),
        request,
        response,
    })
}

fn chat_request_to_claude(body: &Value, _context: &TransformContext) -> Result<Value, PluginError> {
    super::openai_request_to_claude(body).map_err(PluginError::from)
}

fn claude_response_to_chat(body: &Value, context: &TransformContext) -> Result<Value, PluginError> {
    super::claude_response_to_openai(body, model_for_context(context)).map_err(PluginError::from)
}

fn chat_request_to_gemini(body: &Value, _context: &TransformContext) -> Result<Value, PluginError> {
    super::openai_request_to_gemini(body).map_err(PluginError::from)
}

fn gemini_response_to_chat(body: &Value, context: &TransformContext) -> Result<Value, PluginError> {
    super::gemini_response_to_openai(body, model_for_context(context)).map_err(PluginError::from)
}

fn claude_request_to_chat(body: &Value, _context: &TransformContext) -> Result<Value, PluginError> {
    super::claude_request_to_openai(body).map_err(PluginError::from)
}

fn chat_response_to_claude(body: &Value, context: &TransformContext) -> Result<Value, PluginError> {
    super::openai_response_to_claude(body, model_for_context(context)).map_err(PluginError::from)
}

fn gemini_request_to_chat(body: &Value, _context: &TransformContext) -> Result<Value, PluginError> {
    super::gemini_request_to_openai(body).map_err(PluginError::from)
}

fn chat_response_to_gemini(body: &Value, context: &TransformContext) -> Result<Value, PluginError> {
    super::openai_response_to_gemini(body, model_for_context(context)).map_err(PluginError::from)
}

fn claude_request_to_gemini(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let chat = claude_request_to_chat(body, context)?;
    chat_request_to_gemini(&chat, context)
}

fn gemini_response_to_claude(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let chat = gemini_response_to_chat(body, context)?;
    chat_response_to_claude(&chat, context)
}

fn gemini_request_to_claude(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let chat = gemini_request_to_chat(body, context)?;
    chat_request_to_claude(&chat, context)
}

fn claude_response_to_gemini(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let chat = claude_response_to_chat(body, context)?;
    chat_response_to_gemini(&chat, context)
}

fn responses_request_to_claude(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let chat = responses_request_to_chat(body, context)?;
    chat_request_to_claude(&chat, context)
}

fn claude_response_to_responses(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let chat = claude_response_to_chat(body, context)?;
    chat_response_to_responses(&chat, context)
}

fn responses_request_to_gemini(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let chat = responses_request_to_chat(body, context)?;
    chat_request_to_gemini(&chat, context)
}

fn gemini_response_to_responses(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let chat = gemini_response_to_chat(body, context)?;
    chat_response_to_responses(&chat, context)
}

fn claude_request_to_responses(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let chat = claude_request_to_chat(body, context)?;
    chat_request_to_responses(&chat, context)
}

fn responses_response_to_claude(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let chat = responses_response_to_chat(body, context)?;
    chat_response_to_claude(&chat, context)
}

fn gemini_request_to_responses(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let chat = gemini_request_to_chat(body, context)?;
    chat_request_to_responses(&chat, context)
}

fn responses_response_to_gemini(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let chat = responses_response_to_chat(body, context)?;
    chat_response_to_gemini(&chat, context)
}

fn responses_request_to_chat(
    body: &Value,
    _context: &TransformContext,
) -> Result<Value, PluginError> {
    let mut messages = Vec::new();
    if let Some(instructions) = body.get("instructions").and_then(|v| v.as_str()) {
        if !instructions.is_empty() {
            messages.push(json!({"role": "system", "content": instructions}));
        }
    }

    let input = body
        .get("input")
        .ok_or_else(|| PluginError::new("missing input field"))?;
    match input {
        Value::String(text) => messages.push(json!({"role": "user", "content": text})),
        Value::Array(items) => {
            for item in items {
                if let Some(message) = response_input_item_to_chat_message(item) {
                    messages.push(message);
                }
            }
        }
        _ => return Err(PluginError::new("input must be a string or array")),
    }

    let mut result = json!({ "messages": messages });
    copy_field(body, &mut result, "model", "model");
    copy_field(body, &mut result, "temperature", "temperature");
    copy_field(body, &mut result, "top_p", "top_p");
    copy_field(body, &mut result, "stream", "stream");
    copy_field(body, &mut result, "stream_options", "stream_options");
    copy_field(body, &mut result, "stop", "stop");
    copy_field(body, &mut result, "max_output_tokens", "max_tokens");
    copy_common_openai_request_fields(body, &mut result);
    copy_field(
        body,
        &mut result,
        "parallel_tool_calls",
        "parallel_tool_calls",
    );
    if let Some(tool_choice) = body
        .get("tool_choice")
        .and_then(response_tool_choice_to_chat)
    {
        result["tool_choice"] = tool_choice;
    }
    if let Some(text) = body.get("text") {
        if let Some(response_format) = responses_text_to_chat_response_format(text) {
            result["response_format"] = response_format;
        }
    }

    if let Some(tools) = body.get("tools").and_then(|v| v.as_array()) {
        let chat_tools: Vec<Value> = tools
            .iter()
            .filter_map(response_tool_to_chat_tool)
            .collect();
        if !chat_tools.is_empty() {
            result["tools"] = Value::Array(chat_tools);
        }
    }

    Ok(result)
}

fn chat_request_to_responses(
    body: &Value,
    _context: &TransformContext,
) -> Result<Value, PluginError> {
    let messages = body
        .get("messages")
        .and_then(|v| v.as_array())
        .ok_or_else(|| PluginError::new("missing messages field"))?;

    let mut instructions = Vec::new();
    let mut input = Vec::new();
    let mut tool_call_kinds: HashMap<String, ChatToolCallKind> = HashMap::new();
    for message in messages {
        let role = message
            .get("role")
            .and_then(|v| v.as_str())
            .unwrap_or("user");
        if matches!(role, "system" | "developer") {
            if let Some(text) = message_content_text(message.get("content").unwrap_or(&Value::Null))
            {
                if !text.is_empty() {
                    instructions.push(text);
                }
            }
            continue;
        }

        input.extend(chat_message_to_response_input_items(
            message,
            &tool_call_kinds,
        ));
        remember_chat_tool_call_kinds(message, &mut tool_call_kinds);
    }

    let mut result = json!({ "input": input });
    if !instructions.is_empty() {
        result["instructions"] = Value::String(instructions.join("\n"));
    }
    copy_field(body, &mut result, "model", "model");
    copy_field(body, &mut result, "temperature", "temperature");
    copy_field(body, &mut result, "top_p", "top_p");
    copy_field(body, &mut result, "stream", "stream");
    copy_field(body, &mut result, "stream_options", "stream_options");
    copy_field(body, &mut result, "stop", "stop");
    copy_field(body, &mut result, "max_tokens", "max_output_tokens");
    if result.get("max_output_tokens").is_none() {
        copy_field(
            body,
            &mut result,
            "max_completion_tokens",
            "max_output_tokens",
        );
    }
    copy_common_openai_request_fields(body, &mut result);
    copy_field(
        body,
        &mut result,
        "parallel_tool_calls",
        "parallel_tool_calls",
    );
    if let Some(tool_choice) = body
        .get("tool_choice")
        .and_then(chat_tool_choice_to_responses)
    {
        result["tool_choice"] = tool_choice;
    }
    if let Some(response_format) = body.get("response_format") {
        if let Some(text) = chat_response_format_to_responses_text(response_format) {
            result["text"] = text;
        }
    }

    if let Some(tools) = body.get("tools").and_then(|v| v.as_array()) {
        let response_tools: Vec<Value> = tools
            .iter()
            .filter_map(chat_tool_to_response_tool)
            .collect();
        if !response_tools.is_empty() {
            result["tools"] = Value::Array(response_tools);
        }
    }

    Ok(result)
}

fn responses_response_to_chat(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let text = body
        .get("output_text")
        .and_then(|v| v.as_str())
        .map(str::to_owned)
        .unwrap_or_else(|| collect_responses_output_text(body));
    let tool_calls = collect_responses_function_calls(body);

    let finish_reason = if !tool_calls.is_empty() {
        "tool_calls"
    } else {
        match body.get("status").and_then(|v| v.as_str()) {
            Some("incomplete") => "length",
            _ => "stop",
        }
    };

    let usage = responses_usage_to_chat_usage(body.get("usage"));
    let mut message = json!({
        "role": "assistant",
        "content": if text.is_empty() && !tool_calls.is_empty() {
            Value::Null
        } else {
            Value::String(text)
        },
    });
    if !tool_calls.is_empty() {
        message["tool_calls"] = Value::Array(tool_calls);
    }

    let mut result = json!({
        "id": body.get("id").and_then(|v| v.as_str()).unwrap_or("chatcmpl-response-compat"),
        "object": "chat.completion",
        "created": unix_timestamp_secs(),
        "model": body.get("model").and_then(|v| v.as_str()).unwrap_or(model_for_context(context)),
        "choices": [{
            "index": 0,
            "message": message,
            "finish_reason": finish_reason
        }],
        "usage": usage
    });
    copy_common_openai_response_fields(body, &mut result);
    Ok(result)
}

fn chat_response_to_responses(
    body: &Value,
    context: &TransformContext,
) -> Result<Value, PluginError> {
    let choice = body
        .get("choices")
        .and_then(|v| v.as_array())
        .and_then(|v| v.first());
    let message = choice.and_then(|choice| choice.get("message"));
    let finish_reason = choice.and_then(|choice| {
        choice
            .get("finish_reason")
            .and_then(|finish_reason| finish_reason.as_str())
    });
    let response_status = responses_status_from_chat_finish_reason(finish_reason);
    let output_item_status = responses_output_item_status(response_status);
    let content = message
        .and_then(|m| m.get("content"))
        .and_then(message_content_text)
        .unwrap_or_default();
    let mut output = Vec::new();
    if !content.is_empty() {
        output.push(json!({
            "type": "message",
            "id": format!("msg_{}", uuid::Uuid::new_v4()),
            "status": output_item_status,
            "role": "assistant",
            "content": [{"type": "output_text", "text": content, "annotations": []}]
        }));
    }
    if let Some(tool_calls) = message
        .and_then(|m| m.get("tool_calls"))
        .and_then(|v| v.as_array())
    {
        for tool_call in tool_calls {
            if let Some(function_call) = chat_tool_call_to_response_output_item(tool_call) {
                output.push(function_call);
            }
        }
    }
    if output.is_empty() {
        output.push(json!({
            "type": "message",
            "id": format!("msg_{}", uuid::Uuid::new_v4()),
            "status": output_item_status,
            "role": "assistant",
            "content": [{"type": "output_text", "text": "", "annotations": []}]
        }));
    }
    let usage = chat_usage_to_responses_usage(body.get("usage"));
    let id = body
        .get("id")
        .and_then(|v| v.as_str())
        .map(str::to_owned)
        .unwrap_or_else(|| format!("resp_{}", uuid::Uuid::new_v4()));
    let model = body
        .get("model")
        .and_then(|v| v.as_str())
        .unwrap_or(model_for_context(context));

    let mut result = json!({
        "id": id,
        "object": "response",
        "created_at": unix_timestamp_secs(),
        "status": response_status,
        "model": model,
        "output": output,
        "output_text": content,
        "usage": usage
    });
    if let Some(incomplete_details) =
        responses_incomplete_details_from_chat_finish_reason(finish_reason)
    {
        result["incomplete_details"] = incomplete_details;
    } else {
        result["incomplete_details"] = Value::Null;
    }
    copy_common_openai_response_fields(body, &mut result);
    Ok(result)
}

fn reserved_batch_transform(
    _body: &Value,
    _context: &TransformContext,
) -> Result<Value, PluginError> {
    Err(PluginError::new(
        "batch conversion requires batch work-item expansion and is reserved in this plugin API version",
    ))
}

fn response_input_item_to_chat_message(item: &Value) -> Option<Value> {
    if item.get("type").and_then(|v| v.as_str()) == Some("reasoning") {
        return None;
    }

    if item.get("type").and_then(|v| v.as_str()) == Some("function_call") {
        let call_id = item
            .get("call_id")
            .or_else(|| item.get("id"))
            .and_then(|v| v.as_str())
            .unwrap_or("");
        return Some(json!({
            "role": "assistant",
            "content": Value::Null,
            "tool_calls": [{
                "id": call_id,
                "type": "function",
                "function": {
                    "name": item.get("name").and_then(|v| v.as_str()).unwrap_or(""),
                    "arguments": item.get("arguments").and_then(|v| v.as_str()).unwrap_or("{}")
                }
            }]
        }));
    }

    if matches!(
        item.get("type").and_then(|v| v.as_str()),
        Some("shell_call" | "local_shell_call")
    ) {
        let item_type = item.get("type").and_then(|v| v.as_str()).unwrap_or("");
        let call_id = item
            .get("call_id")
            .or_else(|| item.get("id"))
            .and_then(|v| v.as_str())
            .unwrap_or("");
        let name = if item_type == "local_shell_call" {
            "local_shell"
        } else {
            "shell"
        };
        let action = item.get("action").cloned().unwrap_or_else(|| json!({}));
        let arguments = serde_json::to_string(&action).unwrap_or_else(|_| "{}".to_owned());
        return Some(json!({
            "role": "assistant",
            "content": Value::Null,
            "tool_calls": [{
                "id": call_id,
                "type": "function",
                "function": {
                    "name": name,
                    "arguments": arguments
                }
            }]
        }));
    }

    if item.get("type").and_then(|v| v.as_str()) == Some("function_call_output") {
        let call_id = item.get("call_id").and_then(|v| v.as_str()).unwrap_or("");
        let output = shell_output_to_chat_content(item.get("output").unwrap_or(&Value::Null));
        return Some(json!({"role": "tool", "tool_call_id": call_id, "content": output}));
    }

    if matches!(
        item.get("type").and_then(|v| v.as_str()),
        Some("shell_call_output" | "local_shell_call_output")
    ) {
        let call_id = item
            .get("call_id")
            .or_else(|| item.get("id"))
            .and_then(|v| v.as_str())
            .unwrap_or("");
        let output = shell_output_to_chat_content(item.get("output").unwrap_or(&Value::Null));
        return Some(json!({"role": "tool", "tool_call_id": call_id, "content": output}));
    }

    let role = item.get("role").and_then(|v| v.as_str()).unwrap_or("user");
    let content = response_item_content_to_chat_content(item);

    Some(json!({"role": role, "content": content}))
}

fn chat_message_to_response_input_items(
    message: &Value,
    tool_call_kinds: &HashMap<String, ChatToolCallKind>,
) -> Vec<Value> {
    let role = message
        .get("role")
        .and_then(|v| v.as_str())
        .unwrap_or("user");
    if role == "tool" {
        let call_id = message
            .get("tool_call_id")
            .and_then(|v| v.as_str())
            .unwrap_or("");
        let content = message.get("content").unwrap_or(&Value::Null);
        return match tool_call_kinds.get(call_id) {
            Some(kind) if kind.name == "shell" => {
                let mut output = json!({
                    "type": "shell_call_output",
                    "call_id": call_id,
                    "status": "completed",
                    "output": shell_output_from_chat_content(content)
                });
                if let Some(max_output_length) = kind.max_output_length.as_ref() {
                    output["max_output_length"] = max_output_length.clone();
                }
                vec![output]
            }
            Some(kind) if kind.name == "local_shell" => vec![json!({
                "type": "local_shell_call_output",
                "call_id": call_id,
                "output": shell_output_to_chat_content(content)
            })],
            _ => vec![json!({
                "type": "function_call_output",
                "call_id": call_id,
                "output": shell_output_to_chat_content(content)
            })],
        };
    }

    let content_type = if role == "assistant" {
        "output_text"
    } else {
        "input_text"
    };
    let content = message.get("content").unwrap_or(&Value::Null);
    let response_content = chat_content_to_response_content(content, content_type);
    let text = message_content_text(content).unwrap_or_default();
    let mut items = Vec::new();
    if !text.is_empty()
        || message
            .get("tool_calls")
            .and_then(|v| v.as_array())
            .map_or(true, |tool_calls| tool_calls.is_empty())
    {
        items.push(json!({
            "role": role,
            "content": response_content
        }));
    }
    if let Some(tool_calls) = message.get("tool_calls").and_then(|v| v.as_array()) {
        for tool_call in tool_calls {
            if let Some(function_call) = chat_tool_call_to_response_output_item(tool_call) {
                items.push(function_call);
            }
        }
    }
    items
}

fn remember_chat_tool_call_kinds(
    message: &Value,
    tool_call_kinds: &mut HashMap<String, ChatToolCallKind>,
) {
    if message.get("role").and_then(|v| v.as_str()) != Some("assistant") {
        return;
    }
    let Some(tool_calls) = message.get("tool_calls").and_then(|v| v.as_array()) else {
        return;
    };
    for tool_call in tool_calls {
        let Some(call_id) = tool_call.get("id").and_then(|v| v.as_str()) else {
            continue;
        };
        let Some(name) = tool_call
            .get("function")
            .and_then(|function| function.get("name"))
            .and_then(|v| v.as_str())
        else {
            continue;
        };
        if matches!(name, "shell" | "local_shell") {
            let arguments = tool_call
                .get("function")
                .and_then(|function| function.get("arguments"))
                .and_then(|v| v.as_str())
                .and_then(|value| serde_json::from_str::<Value>(value).ok())
                .unwrap_or_else(|| json!({}));
            tool_call_kinds.insert(
                call_id.to_owned(),
                ChatToolCallKind {
                    name: name.to_owned(),
                    max_output_length: arguments
                        .get("max_output_length")
                        .or_else(|| arguments.get("maxOutputLength"))
                        .cloned(),
                },
            );
        }
    }
}

fn response_content_text(content: &Value) -> Option<String> {
    match content {
        Value::String(text) => Some(text.clone()),
        Value::Array(parts) => {
            let text = parts
                .iter()
                .filter_map(|part| {
                    part.get("text")
                        .and_then(|v| v.as_str())
                        .or_else(|| part.get("content").and_then(|v| v.as_str()))
                })
                .collect::<Vec<_>>()
                .join("");
            Some(text)
        }
        _ => None,
    }
}

fn response_item_content_to_chat_content(item: &Value) -> Value {
    if let Some(content) = item.get("content") {
        if let Some(parts) = content.as_array() {
            let chat_parts: Vec<Value> = parts
                .iter()
                .filter_map(response_content_part_to_chat_part)
                .collect();
            if chat_parts
                .iter()
                .any(|part| part.get("type").and_then(|v| v.as_str()) != Some("text"))
            {
                return Value::Array(chat_parts);
            }
            return Value::String(
                chat_parts
                    .iter()
                    .filter_map(|part| part.get("text").and_then(|v| v.as_str()))
                    .collect::<Vec<_>>()
                    .join(""),
            );
        }

        return response_content_text(content)
            .map(Value::String)
            .unwrap_or_else(|| Value::String(String::new()));
    }

    item.get("text")
        .and_then(|v| v.as_str())
        .map(|text| Value::String(text.to_owned()))
        .unwrap_or_else(|| Value::String(String::new()))
}

fn response_content_part_to_chat_part(part: &Value) -> Option<Value> {
    let part_type = part.get("type").and_then(|v| v.as_str()).unwrap_or("");
    if matches!(part_type, "input_text" | "output_text" | "text") {
        return Some(json!({
            "type": "text",
            "text": part.get("text").and_then(|v| v.as_str()).unwrap_or("")
        }));
    }
    if matches!(part_type, "input_image" | "image") {
        let url = part
            .get("image_url")
            .or_else(|| part.get("url"))
            .and_then(|v| v.as_str())?;
        return Some(json!({
            "type": "image_url",
            "image_url": {"url": url}
        }));
    }
    None
}

fn chat_content_to_response_content(content: &Value, text_part_type: &str) -> Value {
    match content {
        Value::Array(parts) => {
            let response_parts: Vec<Value> = parts
                .iter()
                .filter_map(|part| chat_content_part_to_response_part(part, text_part_type))
                .collect();
            Value::Array(response_parts)
        }
        _ => {
            let text = message_content_text(content).unwrap_or_default();
            json!([{"type": text_part_type, "text": text}])
        }
    }
}

fn chat_content_part_to_response_part(part: &Value, text_part_type: &str) -> Option<Value> {
    if let Some(text) = part.as_str() {
        return Some(json!({"type": text_part_type, "text": text}));
    }

    let part_type = part.get("type").and_then(|v| v.as_str()).unwrap_or("");
    if matches!(part_type, "text" | "input_text" | "output_text") {
        return Some(json!({
            "type": text_part_type,
            "text": part.get("text").and_then(|v| v.as_str()).unwrap_or("")
        }));
    }
    if matches!(part_type, "image_url" | "input_image") || part.get("image_url").is_some() {
        let image_url = part.get("image_url").or_else(|| part.get("input_image"))?;
        let url = image_url
            .as_str()
            .or_else(|| image_url.get("url").and_then(|v| v.as_str()))
            .or_else(|| image_url.get("image_url").and_then(|v| v.as_str()))?;
        return Some(json!({"type": "input_image", "image_url": url}));
    }
    None
}

fn message_content_text(content: &Value) -> Option<String> {
    match content {
        Value::String(text) => Some(text.clone()),
        Value::Array(parts) => {
            let text = parts
                .iter()
                .filter_map(|part| {
                    part.get("text")
                        .and_then(|v| v.as_str())
                        .or_else(|| part.as_str())
                })
                .collect::<Vec<_>>()
                .join("");
            Some(text)
        }
        Value::Null => Some(String::new()),
        _ => Some(content.to_string()),
    }
}

fn response_tool_to_chat_tool(tool: &Value) -> Option<Value> {
    let tool_type = tool.get("type").and_then(|v| v.as_str())?;
    if tool_type == "shell" {
        return Some(json!({
            "type": "function",
            "function": {
                "name": "shell",
                "description": "Execute one or more shell commands in the requested environment.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "commands": {"type": "array", "items": {"type": "string"}},
                        "timeout_ms": {"type": "number"},
                        "max_output_length": {"type": "number"}
                    },
                    "required": ["commands"]
                }
            }
        }));
    }
    if tool_type == "local_shell" {
        return Some(json!({
            "type": "function",
            "function": {
                "name": "local_shell",
                "description": "Execute one local shell command in the requested workspace.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "command": {"type": "array", "items": {"type": "string"}},
                        "env": {"type": "object", "additionalProperties": {"type": "string"}},
                        "working_directory": {"type": "string"},
                        "timeout_ms": {"type": "number"}
                    },
                    "required": ["command"]
                }
            }
        }));
    }

    if tool_type != "function" {
        return None;
    }
    Some(json!({
        "type": "function",
        "function": {
            "name": tool.get("name").and_then(|v| v.as_str()).unwrap_or(""),
            "description": tool.get("description").and_then(|v| v.as_str()).unwrap_or(""),
            "parameters": tool.get("parameters").cloned().unwrap_or_else(|| json!({"type": "object", "properties": {}}))
        }
    }))
}

fn chat_tool_to_response_tool(tool: &Value) -> Option<Value> {
    if tool.get("type").and_then(|v| v.as_str()) != Some("function") {
        return None;
    }
    let function = tool.get("function")?;
    let name = function.get("name").and_then(|v| v.as_str()).unwrap_or("");
    if matches!(name, "shell" | "local_shell") {
        return Some(json!({
            "type": name,
            "environment": {"type": "local"}
        }));
    }
    Some(json!({
        "type": "function",
        "name": name,
        "description": function.get("description").and_then(|v| v.as_str()).unwrap_or(""),
        "parameters": function.get("parameters").cloned().unwrap_or_else(|| json!({"type": "object", "properties": {}}))
    }))
}

fn chat_tool_call_to_response_output_item(tool_call: &Value) -> Option<Value> {
    if tool_call.get("type").and_then(|v| v.as_str()) != Some("function") {
        return None;
    }
    let function = tool_call.get("function")?;
    let name = function.get("name").and_then(|v| v.as_str()).unwrap_or("");
    if matches!(name, "shell" | "local_shell") {
        let arguments = function
            .get("arguments")
            .and_then(|v| v.as_str())
            .and_then(|value| serde_json::from_str::<Value>(value).ok())
            .unwrap_or_else(|| json!({}));
        let call_type = if name == "local_shell" {
            "local_shell_call"
        } else {
            "shell_call"
        };
        return Some(json!({
            "type": call_type,
            "call_id": tool_call.get("id").and_then(|v| v.as_str()).unwrap_or(""),
            "action": shell_action_from_chat_arguments(name, &arguments),
            "environment": {"type": "local"},
            "status": "completed"
        }));
    }
    Some(json!({
        "type": "function_call",
        "call_id": tool_call.get("id").and_then(|v| v.as_str()).unwrap_or(""),
        "name": name,
        "arguments": function.get("arguments").and_then(|v| v.as_str()).unwrap_or("{}"),
    }))
}

fn collect_responses_function_calls(body: &Value) -> Vec<Value> {
    body.get("output")
        .and_then(|v| v.as_array())
        .map(|items| {
            items
                .iter()
                .filter_map(|item| {
                    let item_type = item.get("type").and_then(|v| v.as_str())?;
                    let call_id = item
                        .get("call_id")
                        .or_else(|| item.get("id"))
                        .and_then(|v| v.as_str())
                        .unwrap_or("");
                    match item_type {
                        "function_call" => Some(json!({
                            "id": call_id,
                            "type": "function",
                            "function": {
                                "name": item.get("name").and_then(|v| v.as_str()).unwrap_or(""),
                                "arguments": item.get("arguments").and_then(|v| v.as_str()).unwrap_or("{}")
                            }
                        })),
                        "shell_call" | "local_shell_call" => {
                            let name = if item_type == "local_shell_call" {
                                "local_shell"
                            } else {
                                "shell"
                            };
                            let action = item.get("action").cloned().unwrap_or_else(|| json!({}));
                            let arguments =
                                serde_json::to_string(&action).unwrap_or_else(|_| "{}".to_owned());
                            Some(json!({
                                "id": call_id,
                                "type": "function",
                                "function": {
                                    "name": name,
                                    "arguments": arguments
                                }
                            }))
                        }
                        _ => None,
                    }
                })
                .collect()
        })
        .unwrap_or_default()
}

fn collect_responses_output_text(body: &Value) -> String {
    body.get("output")
        .and_then(|v| v.as_array())
        .map(|items| {
            items
                .iter()
                .flat_map(|item| {
                    item.get("content")
                        .and_then(|v| v.as_array())
                        .cloned()
                        .unwrap_or_default()
                })
                .filter_map(|part| {
                    part.get("text")
                        .and_then(|v| v.as_str())
                        .or_else(|| part.get("content").and_then(|v| v.as_str()))
                        .map(str::to_owned)
                })
                .collect::<Vec<_>>()
                .join("")
        })
        .unwrap_or_default()
}

fn response_tool_choice_to_chat(tool_choice: &Value) -> Option<Value> {
    if let Some(value) = tool_choice.as_str() {
        return match value {
            "auto" | "none" | "required" => Some(Value::String(value.to_owned())),
            _ => None,
        };
    }

    let choice_type = tool_choice.get("type").and_then(|v| v.as_str())?;
    if choice_type == "function" {
        let name = tool_choice.get("name").and_then(|v| v.as_str())?;
        return Some(json!({
            "type": "function",
            "function": {"name": name}
        }));
    }
    if matches!(choice_type, "shell" | "local_shell") {
        return Some(json!({
            "type": "function",
            "function": {"name": choice_type}
        }));
    }
    None
}

fn chat_tool_choice_to_responses(tool_choice: &Value) -> Option<Value> {
    if let Some(value) = tool_choice.as_str() {
        return match value {
            "auto" | "none" | "required" => Some(Value::String(value.to_owned())),
            _ => None,
        };
    }

    if tool_choice.get("type").and_then(|v| v.as_str()) != Some("function") {
        return None;
    }
    let name = tool_choice
        .get("function")
        .and_then(|function| function.get("name"))
        .and_then(|v| v.as_str())?;
    if matches!(name, "shell" | "local_shell") {
        return Some(json!({"type": name}));
    }
    Some(json!({
        "type": "function",
        "name": name
    }))
}

fn responses_text_to_chat_response_format(text: &Value) -> Option<Value> {
    let format = text.get("format")?;
    let format_type = format.get("type").and_then(|v| v.as_str())?;
    match format_type {
        "text" => Some(json!({"type": "text"})),
        "json_object" => Some(json!({"type": "json_object"})),
        "json_schema" => Some(json!({
            "type": "json_schema",
            "json_schema": {
                "name": format.get("name").cloned().unwrap_or_else(|| json!("response")),
                "schema": format.get("schema").cloned().unwrap_or_else(|| json!({})),
                "strict": format.get("strict").cloned().unwrap_or(Value::Bool(false))
            }
        })),
        _ => None,
    }
}

fn chat_response_format_to_responses_text(response_format: &Value) -> Option<Value> {
    let format_type = response_format.get("type").and_then(|v| v.as_str())?;
    match format_type {
        "text" => Some(json!({"format": {"type": "text"}})),
        "json_object" => Some(json!({"format": {"type": "json_object"}})),
        "json_schema" => {
            let json_schema = response_format.get("json_schema")?;
            Some(json!({
                "format": {
                    "type": "json_schema",
                    "name": json_schema.get("name").cloned().unwrap_or_else(|| json!("response")),
                    "schema": json_schema.get("schema").cloned().unwrap_or_else(|| json!({})),
                    "strict": json_schema.get("strict").cloned().unwrap_or(Value::Bool(false))
                }
            }))
        }
        _ => None,
    }
}

fn shell_action_from_chat_arguments(tool_name: &str, arguments: &Value) -> Value {
    if tool_name == "local_shell" {
        return local_shell_action_from_chat_arguments(arguments);
    }

    let commands = if let Some(commands) = arguments.get("commands").and_then(|v| v.as_array()) {
        Value::Array(commands.clone())
    } else if let Some(command) = arguments.get("command").and_then(|v| v.as_str()) {
        json!([command])
    } else if let Some(command) = arguments.get("command").and_then(|v| v.as_array()) {
        Value::Array(command.clone())
    } else if let Some(cmd) = arguments.get("cmd").and_then(|v| v.as_str()) {
        json!([cmd])
    } else {
        json!([])
    };

    let mut action = json!({ "commands": commands });
    if let Some(timeout_ms) = arguments
        .get("timeout_ms")
        .or_else(|| arguments.get("timeoutMs"))
    {
        action["timeout_ms"] = timeout_ms.clone();
    }
    if let Some(max_output_length) = arguments
        .get("max_output_length")
        .or_else(|| arguments.get("maxOutputLength"))
    {
        action["max_output_length"] = max_output_length.clone();
    }
    action
}

fn local_shell_action_from_chat_arguments(arguments: &Value) -> Value {
    let command = if let Some(command) = arguments.get("command").and_then(|v| v.as_array()) {
        Value::Array(command.clone())
    } else if let Some(command) = arguments.get("command").and_then(|v| v.as_str()) {
        json!([command])
    } else if let Some(commands) = arguments.get("commands").and_then(|v| v.as_array()) {
        Value::Array(commands.clone())
    } else if let Some(cmd) = arguments.get("cmd").and_then(|v| v.as_str()) {
        json!([cmd])
    } else {
        json!([])
    };

    let mut action = json!({
        "type": arguments
            .get("type")
            .and_then(|v| v.as_str())
            .unwrap_or("exec"),
        "command": command,
        "env": arguments.get("env").cloned().unwrap_or_else(|| json!({}))
    });
    if let Some(working_directory) = arguments
        .get("working_directory")
        .or_else(|| arguments.get("workingDirectory"))
        .or_else(|| arguments.get("cwd"))
    {
        action["working_directory"] = working_directory.clone();
    }
    if let Some(timeout_ms) = arguments
        .get("timeout_ms")
        .or_else(|| arguments.get("timeoutMs"))
    {
        action["timeout_ms"] = timeout_ms.clone();
    }
    action
}

fn shell_output_to_chat_content(output: &Value) -> String {
    match output {
        Value::String(value) => value.clone(),
        Value::Array(chunks) => chunks
            .iter()
            .map(shell_output_chunk_to_chat_content)
            .collect::<Vec<_>>()
            .join(""),
        Value::Object(_) => shell_output_chunk_to_chat_content(output),
        Value::Null => String::new(),
        _ => output.to_string(),
    }
}

fn shell_output_chunk_to_chat_content(chunk: &Value) -> String {
    if let Some(value) = chunk.as_str() {
        return value.to_owned();
    }
    let mut text = String::new();
    if let Some(stdout) = chunk.get("stdout").and_then(|v| v.as_str()) {
        text.push_str(stdout);
    }
    if let Some(stderr) = chunk.get("stderr").and_then(|v| v.as_str()) {
        text.push_str(stderr);
    }
    if text.is_empty() && !chunk.is_null() {
        chunk.to_string()
    } else {
        text
    }
}

fn shell_output_from_chat_content(content: &Value) -> Value {
    let stdout = shell_output_to_chat_content(content);
    json!([{
        "stdout": stdout,
        "stderr": "",
        "outcome": {"type": "exit", "exit_code": 0}
    }])
}

fn responses_usage_to_chat_usage(usage: Option<&Value>) -> Value {
    let prompt = usage
        .and_then(|u| u.get("input_tokens"))
        .and_then(|v| v.as_u64())
        .unwrap_or(0);
    let completion = usage
        .and_then(|u| u.get("output_tokens"))
        .and_then(|v| v.as_u64())
        .unwrap_or(0);
    let total = usage
        .and_then(|u| u.get("total_tokens"))
        .and_then(|v| v.as_u64())
        .unwrap_or(prompt + completion);
    json!({
        "prompt_tokens": prompt,
        "completion_tokens": completion,
        "total_tokens": total
    })
}

fn chat_usage_to_responses_usage(usage: Option<&Value>) -> Value {
    let input = usage
        .and_then(|u| u.get("prompt_tokens"))
        .and_then(|v| v.as_u64())
        .unwrap_or(0);
    let output = usage
        .and_then(|u| u.get("completion_tokens"))
        .and_then(|v| v.as_u64())
        .unwrap_or(0);
    let total = usage
        .and_then(|u| u.get("total_tokens"))
        .and_then(|v| v.as_u64())
        .unwrap_or(input + output);
    json!({
        "input_tokens": input,
        "output_tokens": output,
        "total_tokens": total
    })
}

fn copy_field(source: &Value, target: &mut Value, from: &str, to: &str) {
    if let Some(value) = source.get(from) {
        target[to] = value.clone();
    }
}

fn copy_fields(source: &Value, target: &mut Value, fields: &[&str]) {
    for field in fields {
        copy_field(source, target, field, field);
    }
}

fn copy_common_openai_request_fields(source: &Value, target: &mut Value) {
    copy_fields(
        source,
        target,
        &[
            "metadata",
            "store",
            "service_tier",
            "safety_identifier",
            "prompt_cache_key",
            "prompt_cache_retention",
            "user",
            "top_logprobs",
        ],
    );
}

fn copy_common_openai_response_fields(source: &Value, target: &mut Value) {
    copy_fields(
        source,
        target,
        &["metadata", "service_tier", "system_fingerprint"],
    );
}

fn responses_status_from_chat_finish_reason(finish_reason: Option<&str>) -> &'static str {
    match finish_reason {
        Some("length") | Some("content_filter") => "incomplete",
        _ => "completed",
    }
}

fn responses_output_item_status(response_status: &str) -> &'static str {
    match response_status {
        "incomplete" => "incomplete",
        _ => "completed",
    }
}

fn responses_incomplete_details_from_chat_finish_reason(
    finish_reason: Option<&str>,
) -> Option<Value> {
    match finish_reason {
        Some("length") => Some(json!({"reason": "max_output_tokens"})),
        Some("content_filter") => Some(json!({"reason": "content_filter"})),
        _ => None,
    }
}

fn model_for_context(context: &TransformContext) -> &str {
    context.model.as_deref().unwrap_or("unknown")
}

fn unix_timestamp_secs() -> u64 {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs()
}

pub fn protocol_default_surface(protocol: Protocol) -> ApiSurface {
    match protocol {
        Protocol::Openai => ApiSurface::OpenAiChatCompletions,
        Protocol::Anthropic => ApiSurface::AnthropicMessages,
        Protocol::Google => ApiSurface::GeminiGenerateContent,
    }
}
