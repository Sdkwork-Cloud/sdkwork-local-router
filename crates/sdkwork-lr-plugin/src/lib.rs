use std::collections::BTreeMap;
use std::fmt;
use std::sync::Arc;

use sdkwork_lr_core::Protocol;
use sdkwork_models::{ClientApiCompatibility, ModelCatalog, ModelInfo, ModelVendor};
use serde::{Deserialize, Serialize};
use serde_json::Value;

pub const PLUGIN_API_VERSION: &str = "2026-06-04";

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum PluginPolicy {
    Auto,
    Strict,
    Passthrough,
    ForceTransform,
}

impl PluginPolicy {
    pub fn from_code(value: &str) -> Option<Self> {
        match value.trim().replace('-', "_").to_ascii_lowercase().as_str() {
            "auto" => Some(Self::Auto),
            "strict" => Some(Self::Strict),
            "passthrough" | "off" | "disabled" => Some(Self::Passthrough),
            "force" | "force_plugin" | "force_transform" | "force_plugins" => {
                Some(Self::ForceTransform)
            }
            _ => None,
        }
    }

    pub fn as_str(self) -> &'static str {
        match self {
            Self::Auto => "auto",
            Self::Strict => "strict",
            Self::Passthrough => "passthrough",
            Self::ForceTransform => "force_transform",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ApiSurface {
    OpenAiChatCompletions,
    OpenAiResponses,
    OpenAiBatch,
    AnthropicMessages,
    GeminiGenerateContent,
}

impl ApiSurface {
    pub fn protocol_code(self) -> &'static str {
        match self {
            Self::OpenAiChatCompletions => "openai_compatible",
            Self::OpenAiResponses => "openai_responses",
            Self::OpenAiBatch => "openai_batch",
            Self::AnthropicMessages => "anthropic_messages",
            Self::GeminiGenerateContent => "google_gemini",
        }
    }

    pub fn canonical_token(self) -> &'static str {
        match self {
            Self::OpenAiChatCompletions => "OPENAI_CHAT_COMPLETIONS",
            Self::OpenAiResponses => "OPENAI_RESPONSES",
            Self::OpenAiBatch => "OPENAI_BATCH",
            Self::AnthropicMessages => "ANTHROPIC_MESSAGES",
            Self::GeminiGenerateContent => "GEMINI_GENERATE_CONTENT",
        }
    }

    pub fn from_protocol_and_path(protocol: Protocol, path: &str, base_path: &str) -> Self {
        match protocol {
            Protocol::Openai => {
                let stripped = strip_base_path(path, base_path);
                let normalized = stripped.trim_start_matches('/').to_ascii_lowercase();
                if normalized.starts_with("responses") || normalized.starts_with("v1/responses") {
                    Self::OpenAiResponses
                } else if normalized.starts_with("batches") || normalized.starts_with("v1/batches")
                {
                    Self::OpenAiBatch
                } else {
                    Self::OpenAiChatCompletions
                }
            }
            Protocol::Anthropic => Self::AnthropicMessages,
            Protocol::Google => Self::GeminiGenerateContent,
        }
    }

    pub fn from_protocol_code(protocol_code: &str) -> Option<Self> {
        match protocol_code.trim().to_ascii_lowercase().as_str() {
            "openai_compatible" | "openai_chat_completions" | "openai_chat" => {
                Some(Self::OpenAiChatCompletions)
            }
            "openai_responses" | "openai_response" => Some(Self::OpenAiResponses),
            "openai_batch" | "openai_batches" => Some(Self::OpenAiBatch),
            "anthropic_messages" | "anthropic_message" | "claude_messages" | "claude_message" => {
                Some(Self::AnthropicMessages)
            }
            "google_gemini" | "gemini_generate_content" | "gemini_message" => {
                Some(Self::GeminiGenerateContent)
            }
            _ => None,
        }
    }

    pub fn preferred_client_surface(client_api_code: &str) -> Option<Self> {
        match normalize_client_api_code(client_api_code).as_str() {
            "codex" => Some(Self::OpenAiResponses),
            "claude_code" => Some(Self::AnthropicMessages),
            "gemini_cli" => Some(Self::GeminiGenerateContent),
            _ => None,
        }
    }
}

impl fmt::Display for ApiSurface {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.canonical_token())
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct PluginManifest {
    pub id: String,
    pub aliases: Vec<String>,
    pub api_version: String,
    pub package: String,
    pub version: String,
    pub source: ApiSurface,
    pub target: ApiSurface,
    pub capabilities: PluginCapabilities,
    pub description: String,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct PluginRouteCapability {
    pub plugin_id: String,
    pub source: ApiSurface,
    pub target: ApiSurface,
    pub registered: bool,
    pub ready: bool,
    pub reason: String,
    pub capabilities: Option<PluginCapabilities>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct PluginCapabilities {
    pub request_body: bool,
    pub response_body: bool,
    pub path: bool,
    pub stream: bool,
}

impl PluginCapabilities {
    pub const fn full_json() -> Self {
        Self {
            request_body: true,
            response_body: true,
            path: true,
            stream: false,
        }
    }

    pub const fn full_streaming_json() -> Self {
        Self {
            request_body: true,
            response_body: true,
            path: true,
            stream: true,
        }
    }

    pub const fn reserved() -> Self {
        Self {
            request_body: false,
            response_body: false,
            path: false,
            stream: false,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TransformContext {
    pub source: ApiSurface,
    pub target: ApiSurface,
    pub source_protocol: Protocol,
    pub target_protocol: Protocol,
    pub client_path: String,
    pub client_base_path: String,
    pub model: Option<String>,
    pub is_streaming: bool,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ClientSupportStatus {
    Supported,
    Unsupported,
    Partial,
    Unspecified,
}

impl ClientSupportStatus {
    pub fn from_sdkwork_status(value: &str) -> Self {
        match value.trim().to_ascii_lowercase().as_str() {
            "supported" => Self::Supported,
            "unsupported" => Self::Unsupported,
            "partial" => Self::Partial,
            _ => Self::Unspecified,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CompatibilityDecision {
    pub model_id: String,
    pub vendor_code: String,
    pub client_api_code: String,
    pub client_support_status: ClientSupportStatus,
    pub client_surface: ApiSurface,
    pub source: ApiSurface,
    pub target: ApiSurface,
    pub plugin_id: Option<String>,
    pub reason: String,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ClientApiStandard {
    pub code: String,
    pub display_name: String,
    pub default_surface: ApiSurface,
    pub aliases: Vec<String>,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ApiSurfaceStandard {
    pub surface: ApiSurface,
    pub code: String,
    pub token: String,
    pub display_name: String,
    pub protocol: Protocol,
    pub request_path: String,
    pub stream_path: Option<String>,
    pub required_request_fields: Vec<String>,
    pub optional_request_fields: Vec<String>,
    pub response_fields: Vec<String>,
    pub streaming_event_types: Vec<String>,
}

impl CompatibilityDecision {
    pub fn needs_plugin(&self) -> bool {
        self.plugin_id.is_some()
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct EffectivePluginDecision {
    pub decision: CompatibilityDecision,
    pub model_catalog_loaded: bool,
    pub policy: PluginPolicy,
    pub upstream_surface: ApiSurface,
    pub effective_target: ApiSurface,
    pub effective_plugin_id: Option<String>,
}

impl EffectivePluginDecision {
    pub fn from_decision(
        policy: PluginPolicy,
        upstream_surface: ApiSurface,
        model_catalog_loaded: bool,
        decision: CompatibilityDecision,
    ) -> Self {
        let effective_target = select_target_surface_for_policy(
            policy,
            decision.source,
            upstream_surface,
            Some(decision.target),
        );
        let effective_plugin_id = if decision.source == effective_target {
            None
        } else {
            Some(canonical_plugin_id(decision.source, effective_target))
        };

        Self {
            decision,
            model_catalog_loaded,
            policy,
            upstream_surface,
            effective_target,
            effective_plugin_id,
        }
    }

    pub fn needs_plugin(&self) -> bool {
        self.effective_plugin_id.is_some()
    }
}

pub fn select_target_surface_for_policy(
    policy: PluginPolicy,
    request_surface: ApiSurface,
    upstream_surface: ApiSurface,
    catalog_target_surface: Option<ApiSurface>,
) -> ApiSurface {
    match policy {
        PluginPolicy::Passthrough => request_surface,
        PluginPolicy::ForceTransform => upstream_surface,
        PluginPolicy::Auto | PluginPolicy::Strict => {
            catalog_target_surface.unwrap_or(upstream_surface)
        }
    }
}

pub fn fallback_compatibility_decision(
    model_id: &str,
    client_api_code: &str,
    request_surface: ApiSurface,
    upstream_surface: ApiSurface,
) -> CompatibilityDecision {
    let client_api_code = normalize_client_api_code(client_api_code);
    let plugin_id = if request_surface == upstream_surface {
        None
    } else {
        Some(canonical_plugin_id(request_surface, upstream_surface))
    };

    CompatibilityDecision {
        model_id: model_id.to_owned(),
        vendor_code: "unknown".to_owned(),
        client_api_code: client_api_code.clone(),
        client_support_status: ClientSupportStatus::Unspecified,
        client_surface: ApiSurface::preferred_client_surface(&client_api_code)
            .unwrap_or(request_surface),
        source: request_surface,
        target: upstream_surface,
        plugin_id,
        reason: "model catalog is not loaded; using upstream provider surface fallback".to_owned(),
    }
}

pub struct ModelCompatibilityResolver<'a> {
    catalog: &'a ModelCatalog,
}

impl<'a> ModelCompatibilityResolver<'a> {
    pub fn new(catalog: &'a ModelCatalog) -> Self {
        Self { catalog }
    }

    pub fn decide(
        &self,
        model_id: &str,
        client_api_code: &str,
        request_surface: ApiSurface,
        upstream_surface: ApiSurface,
    ) -> CompatibilityDecision {
        let client_api_code = normalize_client_api_code(client_api_code);
        let model = find_model_by_id(self.catalog, model_id);
        let vendor = model.and_then(|m| find_vendor(self.catalog, &m.vendor_code, &m.region_code));
        let vendor_code = model
            .map(|m| m.vendor_code.clone())
            .or_else(|| infer_vendor_code(model_id).map(str::to_owned))
            .unwrap_or_else(|| "unknown".to_owned());
        let model_surface = model
            .and_then(|m| ApiSurface::from_protocol_code(&m.api_format))
            .unwrap_or(upstream_surface);
        let compatibility = vendor.and_then(|v| client_compatibility(v, &client_api_code));
        let vendor_support = compatibility
            .map(|entry| ClientSupportStatus::from_sdkwork_status(&entry.support_status))
            .unwrap_or(ClientSupportStatus::Unspecified);
        let declared_client_surface = compatibility.and_then(|entry| {
            entry
                .protocol_codes
                .iter()
                .find_map(|code| ApiSurface::from_protocol_code(code))
        });
        let client_surface = declared_client_surface
            .or_else(|| ApiSurface::preferred_client_surface(&client_api_code))
            .unwrap_or(request_surface);
        let native_client_surface = if matches!(
            vendor_support,
            ClientSupportStatus::Supported | ClientSupportStatus::Partial
        ) && declared_client_surface.is_some()
            && request_surface == client_surface
        {
            Some(client_surface)
        } else {
            None
        };

        let target = native_client_surface.unwrap_or_else(|| {
            if upstream_surface == model_surface {
                upstream_surface
            } else {
                model_surface
            }
        });
        let source = request_surface;

        let plugin_id = if source == target {
            None
        } else {
            Some(canonical_plugin_id(source, target))
        };

        let reason = if plugin_id.is_none() && native_client_surface.is_some() {
            format!(
                "vendor {} declares {:?} native support for client API {} via {}; no plugin required",
                vendor_code, vendor_support, client_api_code, target
            )
        } else if plugin_id.is_none() {
            format!(
                "request surface {} already matches target surface {} for vendor {}",
                source, target, vendor_code
            )
        } else if matches!(
            vendor_support,
            ClientSupportStatus::Supported | ClientSupportStatus::Partial
        ) && client_surface == target
        {
            format!(
                "vendor {} declares {:?} support for client API {} via {}",
                vendor_code, vendor_support, client_api_code, target
            )
        } else {
            format!(
                "vendor {} model {} uses {}; client request {} must be converted to {}",
                vendor_code, model_id, target, source, target
            )
        };

        CompatibilityDecision {
            model_id: model_id.to_owned(),
            vendor_code,
            client_api_code,
            client_support_status: vendor_support,
            client_surface,
            source,
            target,
            plugin_id,
            reason,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PluginError {
    message: String,
}

impl PluginError {
    pub fn new(message: impl Into<String>) -> Self {
        Self {
            message: message.into(),
        }
    }

    pub fn message(&self) -> &str {
        &self.message
    }
}

impl fmt::Display for PluginError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.message)
    }
}

impl std::error::Error for PluginError {}

impl From<String> for PluginError {
    fn from(value: String) -> Self {
        Self::new(value)
    }
}

impl From<&str> for PluginError {
    fn from(value: &str) -> Self {
        Self::new(value)
    }
}

pub trait ApiTransformPlugin: Send + Sync {
    fn manifest(&self) -> &PluginManifest;

    fn transform_request(
        &self,
        body: &Value,
        context: &TransformContext,
    ) -> Result<Value, PluginError>;

    fn transform_response(
        &self,
        body: &Value,
        context: &TransformContext,
    ) -> Result<Value, PluginError>;

    fn map_upstream_path(&self, context: &TransformContext) -> Result<String, PluginError> {
        Ok(map_standard_upstream_path(context))
    }
}

#[derive(Default, Clone)]
pub struct PluginRegistry {
    plugins: Vec<Arc<dyn ApiTransformPlugin>>,
    id_index: BTreeMap<String, usize>,
    route_index: BTreeMap<(ApiSurface, ApiSurface), usize>,
}

impl PluginRegistry {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn register(&mut self, plugin: Arc<dyn ApiTransformPlugin>) -> Result<(), PluginError> {
        let manifest = plugin.manifest();
        let canonical = normalize_plugin_id(&manifest.id);
        if canonical != manifest.id {
            return Err(PluginError::new(format!(
                "plugin id '{}' must be canonical '{}'",
                manifest.id, canonical
            )));
        }
        if self.id_index.contains_key(&manifest.id) {
            return Err(PluginError::new(format!(
                "duplicate plugin id '{}'",
                manifest.id
            )));
        }

        let idx = self.plugins.len();
        self.id_index.insert(manifest.id.clone(), idx);
        for alias in &manifest.aliases {
            self.id_index.insert(normalize_plugin_id(alias), idx);
        }
        self.route_index
            .insert((manifest.source, manifest.target), idx);
        self.plugins.push(plugin);
        Ok(())
    }

    pub fn get(&self, id_or_alias: &str) -> Option<Arc<dyn ApiTransformPlugin>> {
        let id = normalize_plugin_id(id_or_alias);
        self.id_index.get(&id).map(|idx| self.plugins[*idx].clone())
    }

    pub fn resolve(
        &self,
        source: ApiSurface,
        target: ApiSurface,
    ) -> Option<Arc<dyn ApiTransformPlugin>> {
        self.route_index
            .get(&(source, target))
            .map(|idx| self.plugins[*idx].clone())
    }

    pub fn manifests(&self) -> Vec<PluginManifest> {
        self.plugins.iter().map(|p| p.manifest().clone()).collect()
    }

    pub fn route_capability(
        &self,
        source: ApiSurface,
        target: ApiSurface,
    ) -> Option<PluginRouteCapability> {
        let plugin_id = canonical_plugin_id(source, target);
        let Some(plugin) = self.resolve(source, target) else {
            return Some(PluginRouteCapability {
                plugin_id,
                source,
                target,
                registered: false,
                ready: false,
                reason: "missing".to_owned(),
                capabilities: None,
            });
        };

        let capabilities = plugin.manifest().capabilities;
        let ready = capabilities.request_body && capabilities.response_body && capabilities.path;
        let reason = if ready {
            "ready"
        } else if capabilities == PluginCapabilities::reserved() {
            "reserved"
        } else {
            "partial"
        };

        Some(PluginRouteCapability {
            plugin_id,
            source,
            target,
            registered: true,
            ready,
            reason: reason.to_owned(),
            capabilities: Some(capabilities),
        })
    }

    pub fn standard_route_capabilities(&self) -> Vec<PluginRouteCapability> {
        standard_plugin_routes()
            .iter()
            .filter_map(|(source, target)| self.route_capability(*source, *target))
            .collect()
    }
}

pub fn canonical_plugin_id(source: ApiSurface, target: ApiSurface) -> String {
    format!(
        "{}_TO_{}_API",
        source.canonical_token(),
        target.canonical_token()
    )
}

pub fn standard_plugin_routes() -> &'static [(ApiSurface, ApiSurface)] {
    &[
        (
            ApiSurface::OpenAiChatCompletions,
            ApiSurface::OpenAiResponses,
        ),
        (
            ApiSurface::OpenAiResponses,
            ApiSurface::OpenAiChatCompletions,
        ),
        (ApiSurface::OpenAiBatch, ApiSurface::OpenAiChatCompletions),
        (ApiSurface::OpenAiBatch, ApiSurface::OpenAiResponses),
        (
            ApiSurface::OpenAiChatCompletions,
            ApiSurface::AnthropicMessages,
        ),
        (
            ApiSurface::OpenAiChatCompletions,
            ApiSurface::GeminiGenerateContent,
        ),
        (ApiSurface::OpenAiResponses, ApiSurface::AnthropicMessages),
        (
            ApiSurface::OpenAiResponses,
            ApiSurface::GeminiGenerateContent,
        ),
        (
            ApiSurface::AnthropicMessages,
            ApiSurface::OpenAiChatCompletions,
        ),
        (
            ApiSurface::GeminiGenerateContent,
            ApiSurface::OpenAiChatCompletions,
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
    ]
}

pub fn normalize_plugin_id(id: &str) -> String {
    let mut normalized = id
        .trim()
        .replace('-', "_")
        .replace(' ', "_")
        .to_ascii_uppercase();
    while normalized.contains("__") {
        normalized = normalized.replace("__", "_");
    }
    normalized = normalized.trim_matches('_').to_owned();

    match normalized.as_str() {
        "OPENAI_COMPATIBLE_CHAT_TO_RESPONSE_API" => canonical_plugin_id(
            ApiSurface::OpenAiChatCompletions,
            ApiSurface::OpenAiResponses,
        ),
        "OPENAI_COMPATIBLE_RESPONSE_TO_CHAT_API" => canonical_plugin_id(
            ApiSurface::OpenAiResponses,
            ApiSurface::OpenAiChatCompletions,
        ),
        "OPENAI_COMPATIBLE_BATCH_TO_CHAT_API" => {
            canonical_plugin_id(ApiSurface::OpenAiBatch, ApiSurface::OpenAiChatCompletions)
        }
        "OPENAI_COMPATIBLE_BATCH_TO_RESPONSE_API" => {
            canonical_plugin_id(ApiSurface::OpenAiBatch, ApiSurface::OpenAiResponses)
        }
        "OPENAI_COMPATIBLE_RESPONSE_TO_CLADUE_MESSAGE_API"
        | "OPENAI_COMPATIBLE_RESPONSE_TO_CLAUDE_MESSAGE_API"
        | "OPENAI_COMPATIBLE_RESPONSE_TO_CLAUDE_MESSAGES_API"
        | "OPENAI_COMPATIBLE_RESPONSE_TO_ANTHROPIC_MESSAGE_API"
        | "OPENAI_COMPATIBLE_RESPONSE_TO_ANTHROPIC_MESSAGES_API" => {
            canonical_plugin_id(ApiSurface::OpenAiResponses, ApiSurface::AnthropicMessages)
        }
        "OPENAI_COMPATIBLE_RESPONSE_TO_GEMINI_MESSAGE_API"
        | "OPENAI_COMPATIBLE_RESPONSE_TO_GEMINI_MESSAGES_API"
        | "OPENAI_COMPATIBLE_RESPONSE_TO_GEMINI_GENERATE_CONTENT_API" => canonical_plugin_id(
            ApiSurface::OpenAiResponses,
            ApiSurface::GeminiGenerateContent,
        ),
        "CLAUDE_MESSAGE_TO_OPENAI_CHAT_API"
        | "CLAUDE_MESSAGES_TO_OPENAI_CHAT_API"
        | "ANTHROPIC_MESSAGE_TO_OPENAI_CHAT_API"
        | "ANTHROPIC_MESSAGES_TO_OPENAI_CHAT_API" => canonical_plugin_id(
            ApiSurface::AnthropicMessages,
            ApiSurface::OpenAiChatCompletions,
        ),
        "GEMINI_MESSAGE_TO_OPENAI_CHAT_API"
        | "GEMINI_MESSAGES_TO_OPENAI_CHAT_API"
        | "GEMINI_GENERATE_CONTENT_TO_OPENAI_CHAT_API" => canonical_plugin_id(
            ApiSurface::GeminiGenerateContent,
            ApiSurface::OpenAiChatCompletions,
        ),
        "CLAUDE_MESSAGE_TO_OPENAI_RESPONSE_API"
        | "CLAUDE_MESSAGES_TO_OPENAI_RESPONSE_API"
        | "ANTHROPIC_MESSAGE_TO_OPENAI_RESPONSE_API"
        | "ANTHROPIC_MESSAGES_TO_OPENAI_RESPONSE_API" => {
            canonical_plugin_id(ApiSurface::AnthropicMessages, ApiSurface::OpenAiResponses)
        }
        "GEMINI_MESSAGE_TO_OPENAI_RESPONSE_API"
        | "GEMINI_MESSAGES_TO_OPENAI_RESPONSE_API"
        | "GEMINI_GENERATE_CONTENT_TO_OPENAI_RESPONSE_API" => canonical_plugin_id(
            ApiSurface::GeminiGenerateContent,
            ApiSurface::OpenAiResponses,
        ),
        _ => normalized,
    }
}

pub fn map_standard_upstream_path(context: &TransformContext) -> String {
    let stripped = strip_base_path(&context.client_path, &context.client_base_path);
    let normalized = stripped.trim_start_matches('/').to_ascii_lowercase();

    if normalized == "models" || normalized == "v1/models" {
        return match context.target {
            ApiSurface::AnthropicMessages => "/v1/models".to_owned(),
            ApiSurface::GeminiGenerateContent => "/v1/models".to_owned(),
            _ => "/models".to_owned(),
        };
    }

    match context.target {
        ApiSurface::OpenAiChatCompletions => {
            if is_generation_endpoint(&normalized) {
                "/chat/completions".to_owned()
            } else {
                ensure_leading_slash(&stripped)
            }
        }
        ApiSurface::OpenAiResponses => {
            if is_generation_endpoint(&normalized) {
                "/responses".to_owned()
            } else {
                ensure_leading_slash(&stripped)
            }
        }
        ApiSurface::OpenAiBatch => {
            if normalized.starts_with("batches") || normalized.starts_with("v1/batches") {
                ensure_leading_slash(&stripped)
            } else {
                "/batches".to_owned()
            }
        }
        ApiSurface::AnthropicMessages => "/v1/messages".to_owned(),
        ApiSurface::GeminiGenerateContent => {
            if context.source == ApiSurface::GeminiGenerateContent {
                ensure_leading_slash(&stripped)
            } else {
                let model = context.model.as_deref().unwrap_or("gemini-pro");
                if context.is_streaming {
                    format!("/v1/models/{model}:streamGenerateContent?alt=sse")
                } else {
                    format!("/v1/models/{model}:generateContent")
                }
            }
        }
    }
}

fn is_generation_endpoint(normalized_path: &str) -> bool {
    normalized_path == "chat/completions"
        || normalized_path == "v1/chat/completions"
        || normalized_path == "responses"
        || normalized_path == "v1/responses"
        || normalized_path == "messages"
        || normalized_path == "v1/messages"
        || normalized_path.contains(":generatecontent")
        || normalized_path.contains(":streamgeneratecontent")
}

pub fn strip_base_path(path: &str, base_path: &str) -> String {
    let stripped = path.strip_prefix(base_path).unwrap_or(path);
    ensure_leading_slash(stripped)
}

fn ensure_leading_slash(path: &str) -> String {
    if path.starts_with('/') {
        path.to_owned()
    } else {
        format!("/{path}")
    }
}

pub fn standard_manifest(
    source: ApiSurface,
    target: ApiSurface,
    package: impl Into<String>,
    version: impl Into<String>,
    capabilities: PluginCapabilities,
    description: impl Into<String>,
    aliases: Vec<String>,
) -> PluginManifest {
    PluginManifest {
        id: canonical_plugin_id(source, target),
        aliases,
        api_version: PLUGIN_API_VERSION.to_owned(),
        package: package.into(),
        version: version.into(),
        source,
        target,
        capabilities,
        description: description.into(),
    }
}

pub fn normalize_client_api_code(code: &str) -> String {
    let normalized = code.trim().replace('-', "_").to_ascii_lowercase();
    match normalized.as_str() {
        "claude" | "claude_cli" | "claudecode" | "claude-code" => "claude_code".to_owned(),
        "gemini" | "gemini_code" | "gemini-cli" => "gemini_cli".to_owned(),
        "openai_codex" | "openai-codex" => "codex".to_owned(),
        _ => normalized,
    }
}

pub fn standard_client_apis() -> Vec<ClientApiStandard> {
    vec![
        ClientApiStandard {
            code: "codex".to_owned(),
            display_name: "Codex".to_owned(),
            default_surface: ApiSurface::OpenAiResponses,
            aliases: vec!["openai_codex".to_owned(), "openai-codex".to_owned()],
        },
        ClientApiStandard {
            code: "claude_code".to_owned(),
            display_name: "Claude Code".to_owned(),
            default_surface: ApiSurface::AnthropicMessages,
            aliases: vec![
                "claude".to_owned(),
                "claude_cli".to_owned(),
                "claudecode".to_owned(),
                "claude-code".to_owned(),
            ],
        },
        ClientApiStandard {
            code: "gemini_cli".to_owned(),
            display_name: "Gemini CLI".to_owned(),
            default_surface: ApiSurface::GeminiGenerateContent,
            aliases: vec![
                "gemini".to_owned(),
                "gemini_code".to_owned(),
                "gemini-cli".to_owned(),
            ],
        },
    ]
}

pub fn standard_api_surfaces() -> Vec<ApiSurfaceStandard> {
    vec![
        api_surface_standard(
            ApiSurface::OpenAiChatCompletions,
            "OpenAI Chat Completions",
            Protocol::Openai,
            "/v1/chat/completions",
            None,
            &["model", "messages"],
            &[
                "stream",
                "stream_options",
                "temperature",
                "top_p",
                "max_tokens",
                "max_completion_tokens",
                "stop",
                "tools",
                "tool_choice",
                "response_format",
                "response_format.json_schema",
                "parallel_tool_calls",
                "metadata",
                "store",
                "service_tier",
                "safety_identifier",
                "prompt_cache_key",
                "prompt_cache_retention",
                "top_logprobs",
            ],
            &[
                "id",
                "object",
                "created",
                "model",
                "choices",
                "usage",
                "metadata",
                "service_tier",
                "system_fingerprint",
            ],
            &["chat.completion.chunk", "[DONE]"],
        ),
        api_surface_standard(
            ApiSurface::OpenAiResponses,
            "OpenAI Responses",
            Protocol::Openai,
            "/v1/responses",
            Some("/v1/responses"),
            &["model", "input"],
            &[
                "instructions",
                "stream",
                "stream_options",
                "temperature",
                "top_p",
                "max_output_tokens",
                "tools",
                "tools.shell",
                "tools.local_shell",
                "tool_choice",
                "parallel_tool_calls",
                "reasoning",
                "text",
                "text.format",
                "metadata",
                "store",
                "service_tier",
                "safety_identifier",
                "prompt_cache_key",
                "prompt_cache_retention",
                "top_logprobs",
                "truncation",
            ],
            &[
                "id",
                "object",
                "created_at",
                "status",
                "model",
                "output",
                "output_text",
                "usage",
                "metadata",
                "service_tier",
                "system_fingerprint",
            ],
            &[
                "response.created",
                "response.in_progress",
                "response.output_item.added",
                "response.content_part.added",
                "response.output_text.delta",
                "response.output_text.done",
                "response.completed",
                "response.failed",
                "response.incomplete",
            ],
        ),
        api_surface_standard(
            ApiSurface::OpenAiBatch,
            "OpenAI Batch",
            Protocol::Openai,
            "/v1/batches",
            None,
            &["input_file_id", "endpoint", "completion_window"],
            &["metadata"],
            &[
                "id",
                "object",
                "endpoint",
                "input_file_id",
                "completion_window",
                "status",
                "request_counts",
            ],
            &[],
        ),
        api_surface_standard(
            ApiSurface::AnthropicMessages,
            "Anthropic Messages",
            Protocol::Anthropic,
            "/v1/messages",
            Some("/v1/messages"),
            &["model", "max_tokens", "messages"],
            &[
                "system",
                "stream",
                "temperature",
                "top_p",
                "top_k",
                "stop_sequences",
                "tools",
                "tool_choice",
            ],
            &[
                "id",
                "type",
                "role",
                "content",
                "model",
                "stop_reason",
                "stop_sequence",
                "usage",
            ],
            &[
                "message_start",
                "content_block_start",
                "content_block_delta",
                "content_block_stop",
                "message_delta",
                "message_stop",
                "ping",
                "error",
            ],
        ),
        api_surface_standard(
            ApiSurface::GeminiGenerateContent,
            "Gemini GenerateContent",
            Protocol::Google,
            "/v1/models/{model}:generateContent",
            Some("/v1/models/{model}:streamGenerateContent?alt=sse"),
            &["contents"],
            &[
                "systemInstruction",
                "tools",
                "tools.functionDeclarations",
                "toolConfig",
                "toolConfig.functionCallingConfig",
                "generationConfig",
                "generationConfig.maxOutputTokens",
                "generationConfig.temperature",
                "generationConfig.topP",
                "generationConfig.candidateCount",
                "generationConfig.presencePenalty",
                "generationConfig.frequencyPenalty",
                "generationConfig.seed",
                "generationConfig.stopSequences",
                "generationConfig.responseMimeType",
                "generationConfig.responseSchema",
                "safetySettings",
            ],
            &["candidates", "promptFeedback", "usageMetadata"],
            &["GenerateContentResponse"],
        ),
    ]
}

fn api_surface_standard(
    surface: ApiSurface,
    display_name: &str,
    protocol: Protocol,
    request_path: &str,
    stream_path: Option<&str>,
    required_request_fields: &[&str],
    optional_request_fields: &[&str],
    response_fields: &[&str],
    streaming_event_types: &[&str],
) -> ApiSurfaceStandard {
    ApiSurfaceStandard {
        surface,
        code: surface.protocol_code().to_owned(),
        token: surface.canonical_token().to_owned(),
        display_name: display_name.to_owned(),
        protocol,
        request_path: request_path.to_owned(),
        stream_path: stream_path.map(str::to_owned),
        required_request_fields: required_request_fields
            .iter()
            .map(|field| (*field).to_owned())
            .collect(),
        optional_request_fields: optional_request_fields
            .iter()
            .map(|field| (*field).to_owned())
            .collect(),
        response_fields: response_fields
            .iter()
            .map(|field| (*field).to_owned())
            .collect(),
        streaming_event_types: streaming_event_types
            .iter()
            .map(|field| (*field).to_owned())
            .collect(),
    }
}

fn find_model_by_id<'a>(catalog: &'a ModelCatalog, model_id: &str) -> Option<&'a ModelInfo> {
    let normalized = model_id.trim();
    let catalog_key_match = sdkwork_models::find_model(catalog, normalized);
    if catalog_key_match.is_some() {
        return catalog_key_match;
    }
    sdkwork_models::list_models(catalog, sdkwork_models::ModelFilter::default())
        .into_iter()
        .find(|model| model.model_id == normalized)
}

fn find_vendor<'a>(
    catalog: &'a ModelCatalog,
    vendor_code: &str,
    region_code: &str,
) -> Option<&'a ModelVendor> {
    catalog
        .vendors
        .iter()
        .find(|vendor| vendor.vendor_code == vendor_code && vendor.region_code == region_code)
        .or_else(|| {
            catalog
                .vendors
                .iter()
                .find(|vendor| vendor.vendor_code == vendor_code)
        })
        .map(|vendor| &vendor.vendor)
}

fn client_compatibility<'a>(
    vendor: &'a ModelVendor,
    client_api_code: &str,
) -> Option<&'a ClientApiCompatibility> {
    vendor
        .client_api_compatibility
        .get(client_api_code)
        .or_else(|| {
            vendor
                .client_api_compatibility
                .get(&normalize_client_api_code(client_api_code))
        })
}

fn infer_vendor_code(model_id: &str) -> Option<&'static str> {
    let normalized = model_id.trim().to_ascii_lowercase();
    if normalized.starts_with("gpt-")
        || normalized.starts_with("o3")
        || normalized.starts_with("o4")
    {
        Some("openai")
    } else if normalized.starts_with("claude-") {
        Some("anthropic")
    } else if normalized.starts_with("gemini-") {
        Some("google")
    } else {
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use sdkwork_models::{
        CatalogManifest, ModelCatalog, ModelInfo, ModelVendor, SourceEvidence, VendorCatalog,
    };
    use serde_json::json;
    use std::collections::BTreeMap;

    struct EchoPlugin {
        manifest: PluginManifest,
    }

    impl ApiTransformPlugin for EchoPlugin {
        fn manifest(&self) -> &PluginManifest {
            &self.manifest
        }

        fn transform_request(
            &self,
            body: &Value,
            _context: &TransformContext,
        ) -> Result<Value, PluginError> {
            Ok(body.clone())
        }

        fn transform_response(
            &self,
            body: &Value,
            _context: &TransformContext,
        ) -> Result<Value, PluginError> {
            Ok(body.clone())
        }
    }

    #[test]
    fn canonical_ids_are_precise_api_surface_names() {
        assert_eq!(
            canonical_plugin_id(
                ApiSurface::OpenAiChatCompletions,
                ApiSurface::OpenAiResponses
            ),
            "OPENAI_CHAT_COMPLETIONS_TO_OPENAI_RESPONSES_API"
        );
        assert_eq!(
            canonical_plugin_id(
                ApiSurface::AnthropicMessages,
                ApiSurface::OpenAiChatCompletions
            ),
            "ANTHROPIC_MESSAGES_TO_OPENAI_CHAT_COMPLETIONS_API"
        );
    }

    #[test]
    fn plugin_policy_parses_standard_codes_and_legacy_spellings() {
        assert_eq!(PluginPolicy::from_code("auto"), Some(PluginPolicy::Auto));
        assert_eq!(
            PluginPolicy::from_code("strict"),
            Some(PluginPolicy::Strict)
        );
        assert_eq!(
            PluginPolicy::from_code("disabled"),
            Some(PluginPolicy::Passthrough)
        );
        assert_eq!(
            PluginPolicy::from_code("force-plugin"),
            Some(PluginPolicy::ForceTransform)
        );
        assert_eq!(PluginPolicy::from_code("legacy-shim"), None);
    }

    #[test]
    fn plugin_policy_selects_effective_target_surface() {
        assert_eq!(
            select_target_surface_for_policy(
                PluginPolicy::Passthrough,
                ApiSurface::OpenAiResponses,
                ApiSurface::AnthropicMessages,
                Some(ApiSurface::AnthropicMessages),
            ),
            ApiSurface::OpenAiResponses
        );
        assert_eq!(
            select_target_surface_for_policy(
                PluginPolicy::ForceTransform,
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
                Some(ApiSurface::GeminiGenerateContent),
            ),
            ApiSurface::OpenAiChatCompletions
        );
        assert_eq!(
            select_target_surface_for_policy(
                PluginPolicy::Auto,
                ApiSurface::OpenAiResponses,
                ApiSurface::OpenAiChatCompletions,
                Some(ApiSurface::AnthropicMessages),
            ),
            ApiSurface::AnthropicMessages
        );
    }

    #[test]
    fn standard_client_apis_export_codes_surfaces_and_aliases() {
        let standards = standard_client_apis();
        let codex = standards
            .iter()
            .find(|standard| standard.code == "codex")
            .expect("codex standard");
        assert_eq!(codex.default_surface, ApiSurface::OpenAiResponses);
        assert_eq!(codex.default_surface.protocol_code(), "openai_responses");
        assert!(codex.aliases.iter().any(|alias| alias == "openai-codex"));

        let claude = standards
            .iter()
            .find(|standard| standard.code == "claude_code")
            .expect("claude code standard");
        assert_eq!(claude.default_surface, ApiSurface::AnthropicMessages);
        assert_eq!(claude.default_surface.protocol_code(), "anthropic_messages");
        assert!(claude
            .aliases
            .iter()
            .all(|alias| normalize_client_api_code(alias) == claude.code));

        let gemini = standards
            .iter()
            .find(|standard| standard.code == "gemini_cli")
            .expect("gemini cli standard");
        assert_eq!(gemini.default_surface, ApiSurface::GeminiGenerateContent);
        assert_eq!(gemini.default_surface.protocol_code(), "google_gemini");
        assert!(gemini
            .aliases
            .iter()
            .all(|alias| normalize_client_api_code(alias) == gemini.code));
    }

    #[test]
    fn standard_api_surfaces_export_official_paths_and_shapes() {
        let surfaces = standard_api_surfaces();
        assert_eq!(surfaces.len(), 5);

        let responses = surfaces
            .iter()
            .find(|surface| surface.code == "openai_responses")
            .expect("OpenAI Responses surface");
        assert_eq!(responses.surface, ApiSurface::OpenAiResponses);
        assert_eq!(responses.request_path, "/v1/responses");
        assert!(responses
            .required_request_fields
            .iter()
            .any(|field| field == "input"));
        assert!(responses
            .response_fields
            .iter()
            .any(|field| field == "output_text"));
        assert!(responses
            .streaming_event_types
            .iter()
            .any(|event| event == "response.output_text.delta"));
        for field in [
            "metadata",
            "store",
            "service_tier",
            "safety_identifier",
            "prompt_cache_key",
            "prompt_cache_retention",
            "stream_options",
            "top_logprobs",
            "truncation",
        ] {
            assert!(
                responses
                    .optional_request_fields
                    .iter()
                    .any(|existing| existing == field),
                "OpenAI Responses optional fields must include {field}"
            );
        }
        for field in ["metadata", "service_tier", "system_fingerprint"] {
            assert!(
                responses
                    .response_fields
                    .iter()
                    .any(|existing| existing == field),
                "OpenAI Responses response fields must include {field}"
            );
        }

        let anthropic = surfaces
            .iter()
            .find(|surface| surface.code == "anthropic_messages")
            .expect("Anthropic Messages surface");
        assert_eq!(anthropic.request_path, "/v1/messages");
        assert!(anthropic
            .required_request_fields
            .iter()
            .any(|field| field == "max_tokens"));
        assert!(anthropic
            .streaming_event_types
            .iter()
            .any(|event| event == "content_block_delta"));

        let gemini = surfaces
            .iter()
            .find(|surface| surface.code == "google_gemini")
            .expect("Gemini GenerateContent surface");
        assert_eq!(gemini.surface, ApiSurface::GeminiGenerateContent);
        assert_eq!(gemini.request_path, "/v1/models/{model}:generateContent");
        assert_eq!(
            gemini.stream_path.as_deref(),
            Some("/v1/models/{model}:streamGenerateContent?alt=sse")
        );
        assert!(gemini
            .optional_request_fields
            .iter()
            .any(|field| field == "generationConfig"));
        for field in [
            "generationConfig.candidateCount",
            "generationConfig.presencePenalty",
            "generationConfig.frequencyPenalty",
            "generationConfig.seed",
            "generationConfig.responseMimeType",
            "generationConfig.responseSchema",
        ] {
            assert!(
                gemini
                    .optional_request_fields
                    .iter()
                    .any(|existing| existing == field),
                "Gemini optional fields must include {field}"
            );
        }

        let batch = surfaces
            .iter()
            .find(|surface| surface.code == "openai_batch")
            .expect("OpenAI Batch surface");
        assert!(batch
            .required_request_fields
            .iter()
            .any(|field| field == "completion_window"));
        assert!(batch.streaming_event_types.is_empty());
    }

    #[test]
    fn fallback_compatibility_decision_uses_upstream_surface_without_catalog() {
        let decision = fallback_compatibility_decision(
            "unknown-model",
            "claude-code",
            ApiSurface::OpenAiResponses,
            ApiSurface::AnthropicMessages,
        );

        assert_eq!(decision.model_id, "unknown-model");
        assert_eq!(decision.vendor_code, "unknown");
        assert_eq!(decision.client_api_code, "claude_code");
        assert_eq!(
            decision.client_support_status,
            ClientSupportStatus::Unspecified
        );
        assert_eq!(decision.client_surface, ApiSurface::AnthropicMessages);
        assert_eq!(decision.target, ApiSurface::AnthropicMessages);
        assert_eq!(
            decision.plugin_id.as_deref(),
            Some("OPENAI_RESPONSES_TO_ANTHROPIC_MESSAGES_API")
        );
    }

    #[test]
    fn effective_plugin_decision_applies_passthrough_policy() {
        let decision = CompatibilityDecision {
            model_id: "claude-sonnet-4-6".to_owned(),
            vendor_code: "anthropic".to_owned(),
            client_api_code: "codex".to_owned(),
            client_support_status: ClientSupportStatus::Unsupported,
            client_surface: ApiSurface::OpenAiResponses,
            source: ApiSurface::OpenAiResponses,
            target: ApiSurface::AnthropicMessages,
            plugin_id: Some("OPENAI_RESPONSES_TO_ANTHROPIC_MESSAGES_API".to_owned()),
            reason: "test".to_owned(),
        };

        let effective = EffectivePluginDecision::from_decision(
            PluginPolicy::Passthrough,
            ApiSurface::AnthropicMessages,
            true,
            decision,
        );

        assert_eq!(effective.effective_target, ApiSurface::OpenAiResponses);
        assert_eq!(effective.effective_plugin_id, None);
        assert!(!effective.needs_plugin());
    }

    #[test]
    fn effective_plugin_decision_can_introduce_plugin_under_force_transform() {
        let decision = CompatibilityDecision {
            model_id: "gpt-5.5".to_owned(),
            vendor_code: "openai".to_owned(),
            client_api_code: "codex".to_owned(),
            client_support_status: ClientSupportStatus::Supported,
            client_surface: ApiSurface::OpenAiResponses,
            source: ApiSurface::OpenAiResponses,
            target: ApiSurface::OpenAiResponses,
            plugin_id: None,
            reason: "native".to_owned(),
        };

        let effective = EffectivePluginDecision::from_decision(
            PluginPolicy::ForceTransform,
            ApiSurface::OpenAiChatCompletions,
            true,
            decision,
        );

        assert_eq!(
            effective.effective_target,
            ApiSurface::OpenAiChatCompletions
        );
        assert_eq!(
            effective.effective_plugin_id.as_deref(),
            Some("OPENAI_RESPONSES_TO_OPENAI_CHAT_COMPLETIONS_API")
        );
        assert!(effective.needs_plugin());
    }

    #[test]
    fn user_examples_normalize_to_canonical_ids() {
        assert_eq!(
            normalize_plugin_id("OPENAI_COMPATIBLE_CHAT_TO_RESPONSE_API"),
            "OPENAI_CHAT_COMPLETIONS_TO_OPENAI_RESPONSES_API"
        );
        assert_eq!(
            normalize_plugin_id("OPENAI_COMPATIBLE_RESPONSE_TO_CLADUE_MESSAGE_API"),
            "OPENAI_RESPONSES_TO_ANTHROPIC_MESSAGES_API"
        );
        assert_eq!(
            normalize_plugin_id("GEMINI_MESSAGE_TO_OPENAI_RESPONSE_API"),
            "GEMINI_GENERATE_CONTENT_TO_OPENAI_RESPONSES_API"
        );
    }

    #[test]
    fn registry_resolves_by_alias_and_surface_pair() {
        let manifest = standard_manifest(
            ApiSurface::AnthropicMessages,
            ApiSurface::OpenAiChatCompletions,
            "sdkwork-lr-transform",
            "0.1.0",
            PluginCapabilities::full_json(),
            "Claude Messages to OpenAI Chat Completions",
            vec!["CLAUDE_MESSAGE_TO_OPENAI_CHAT_API".to_owned()],
        );
        let mut registry = PluginRegistry::new();
        registry
            .register(Arc::new(EchoPlugin { manifest }))
            .unwrap();

        assert!(registry.get("CLAUDE_MESSAGE_TO_OPENAI_CHAT_API").is_some());
        assert!(registry
            .resolve(
                ApiSurface::AnthropicMessages,
                ApiSurface::OpenAiChatCompletions
            )
            .is_some());
    }

    #[test]
    fn registry_route_capability_reports_reserved_plugins() {
        let manifest = standard_manifest(
            ApiSurface::OpenAiBatch,
            ApiSurface::OpenAiResponses,
            "sdkwork-lr-transform",
            "0.1.0",
            PluginCapabilities::reserved(),
            "reserved batch transform",
            vec![],
        );
        let mut registry = PluginRegistry::new();
        registry
            .register(Arc::new(EchoPlugin { manifest }))
            .unwrap();

        let capability = registry
            .route_capability(ApiSurface::OpenAiBatch, ApiSurface::OpenAiResponses)
            .expect("registered batch plugin capability");

        assert_eq!(capability.plugin_id, "OPENAI_BATCH_TO_OPENAI_RESPONSES_API");
        assert!(!capability.ready);
        assert_eq!(capability.reason, "reserved");
    }

    #[test]
    fn registry_route_capability_reports_missing_plugins() {
        let registry = PluginRegistry::new();

        let capability = registry
            .route_capability(ApiSurface::OpenAiResponses, ApiSurface::AnthropicMessages)
            .expect("missing plugin capability report");

        assert_eq!(
            capability.plugin_id,
            "OPENAI_RESPONSES_TO_ANTHROPIC_MESSAGES_API"
        );
        assert!(!capability.ready);
        assert_eq!(capability.reason, "missing");
    }

    #[test]
    fn path_mapper_targets_tool_specific_openai_paths() {
        let context = TransformContext {
            source: ApiSurface::AnthropicMessages,
            target: ApiSurface::OpenAiChatCompletions,
            source_protocol: Protocol::Anthropic,
            target_protocol: Protocol::Openai,
            client_path: "/anthropic/v1/messages".to_owned(),
            client_base_path: "/anthropic".to_owned(),
            model: Some("gpt-4o".to_owned()),
            is_streaming: false,
        };
        assert_eq!(map_standard_upstream_path(&context), "/chat/completions");
    }

    #[test]
    fn path_mapper_targets_gemini_model_generate_content() {
        let context = TransformContext {
            source: ApiSurface::OpenAiResponses,
            target: ApiSurface::GeminiGenerateContent,
            source_protocol: Protocol::Openai,
            target_protocol: Protocol::Google,
            client_path: "/v1/responses".to_owned(),
            client_base_path: "/v1".to_owned(),
            model: Some("gemini-2.5-pro".to_owned()),
            is_streaming: false,
        };
        assert_eq!(
            map_standard_upstream_path(&context),
            "/v1/models/gemini-2.5-pro:generateContent"
        );
    }

    #[test]
    fn path_mapper_preserves_non_generation_openai_paths() {
        let context = TransformContext {
            source: ApiSurface::OpenAiChatCompletions,
            target: ApiSurface::OpenAiChatCompletions,
            source_protocol: Protocol::Openai,
            target_protocol: Protocol::Openai,
            client_path: "/v1/files".to_owned(),
            client_base_path: "/v1".to_owned(),
            model: None,
            is_streaming: false,
        };
        assert_eq!(map_standard_upstream_path(&context), "/files");
    }

    #[test]
    fn echo_plugin_keeps_json_body() {
        let manifest = standard_manifest(
            ApiSurface::OpenAiResponses,
            ApiSurface::OpenAiChatCompletions,
            "sdkwork-lr-transform",
            "0.1.0",
            PluginCapabilities::full_json(),
            "OpenAI Responses to Chat",
            vec![],
        );
        let plugin = EchoPlugin { manifest };
        let context = TransformContext {
            source: ApiSurface::OpenAiResponses,
            target: ApiSurface::OpenAiChatCompletions,
            source_protocol: Protocol::Openai,
            target_protocol: Protocol::Openai,
            client_path: "/v1/responses".to_owned(),
            client_base_path: "/v1".to_owned(),
            model: None,
            is_streaming: false,
        };
        assert_eq!(
            plugin
                .transform_request(&json!({"input": "hi"}), &context)
                .unwrap(),
            json!({"input": "hi"})
        );
    }

    #[test]
    fn compatibility_resolver_selects_codex_to_anthropic_plugin_for_claude_model() {
        let catalog = catalog_with_vendor_model(
            vendor(
                "anthropic",
                "Anthropic",
                &[
                    ("claude_code", "supported", &["anthropic_messages"]),
                    ("codex", "unsupported", &[]),
                ],
                &["anthropic_messages"],
            ),
            model("claude-sonnet-4-6", "anthropic", "anthropic_messages"),
        );
        let resolver = ModelCompatibilityResolver::new(&catalog);

        let decision = resolver.decide(
            "claude-sonnet-4-6",
            "codex",
            ApiSurface::OpenAiResponses,
            ApiSurface::AnthropicMessages,
        );

        assert!(decision.needs_plugin());
        assert_eq!(decision.vendor_code, "anthropic");
        assert_eq!(
            decision.plugin_id.as_deref(),
            Some("OPENAI_RESPONSES_TO_ANTHROPIC_MESSAGES_API")
        );
        assert_eq!(
            decision.client_support_status,
            ClientSupportStatus::Unsupported
        );
    }

    #[test]
    fn compatibility_resolver_skips_plugin_when_vendor_supports_client_surface() {
        let catalog = catalog_with_vendor_model(
            vendor(
                "google",
                "Google",
                &[
                    ("gemini_cli", "supported", &["google_gemini"]),
                    ("codex", "unsupported", &[]),
                ],
                &["google_gemini"],
            ),
            model("gemini-3.5-flash", "google", "google_gemini"),
        );
        let resolver = ModelCompatibilityResolver::new(&catalog);

        let decision = resolver.decide(
            "gemini-3.5-flash",
            "gemini_cli",
            ApiSurface::GeminiGenerateContent,
            ApiSurface::GeminiGenerateContent,
        );

        assert!(!decision.needs_plugin());
        assert_eq!(
            decision.client_support_status,
            ClientSupportStatus::Supported
        );
        assert_eq!(decision.target, ApiSurface::GeminiGenerateContent);
    }

    #[test]
    fn compatibility_resolver_prefers_declared_client_surface_when_vendor_supports_it() {
        let catalog = catalog_with_vendor_model(
            vendor(
                "openai",
                "OpenAI",
                &[("codex", "supported", &["openai_responses"])],
                &["openai_responses", "openai_compatible"],
            ),
            model("gpt-4o-compatible", "openai", "openai_compatible"),
        );
        let resolver = ModelCompatibilityResolver::new(&catalog);

        let decision = resolver.decide(
            "gpt-4o-compatible",
            "codex",
            ApiSurface::OpenAiResponses,
            ApiSurface::OpenAiChatCompletions,
        );

        assert!(!decision.needs_plugin());
        assert_eq!(decision.target, ApiSurface::OpenAiResponses);
        assert_eq!(
            decision.client_support_status,
            ClientSupportStatus::Supported
        );
    }

    #[test]
    fn compatibility_resolver_uses_model_api_format_over_provider_kind() {
        let catalog = catalog_with_vendor_model(
            vendor(
                "openai",
                "OpenAI",
                &[
                    ("codex", "supported", &["openai_responses"]),
                    ("claude_code", "unsupported", &[]),
                ],
                &["openai_responses", "openai_compatible"],
            ),
            model("gpt-5.5", "openai", "openai_responses"),
        );
        let resolver = ModelCompatibilityResolver::new(&catalog);

        let decision = resolver.decide(
            "gpt-5.5",
            "claude_code",
            ApiSurface::AnthropicMessages,
            ApiSurface::OpenAiChatCompletions,
        );

        assert_eq!(decision.target, ApiSurface::OpenAiResponses);
        assert_eq!(
            decision.plugin_id.as_deref(),
            Some("ANTHROPIC_MESSAGES_TO_OPENAI_RESPONSES_API")
        );
    }

    fn catalog_with_vendor_model(vendor: ModelVendor, model: ModelInfo) -> ModelCatalog {
        ModelCatalog {
            manifest: CatalogManifest {
                name: "test".to_owned(),
                schema_version: "1.0.0".to_owned(),
                catalog_version: "test".to_owned(),
                generated_at: "2026-06-04T00:00:00Z".to_owned(),
                models_root: "models".to_owned(),
                schemas_root: "schemas".to_owned(),
            },
            meters: vec![],
            protocols: vec![],
            vendors: vec![VendorCatalog {
                vendor_code: vendor.vendor_code.clone(),
                region_code: vendor.region_code.clone(),
                vendor,
                families: vec![],
                models: vec![model],
                pricing: vec![],
                rankings: vec![],
            }],
        }
    }

    fn vendor(
        code: &str,
        display_name: &str,
        compatibility: &[(&str, &str, &[&str])],
        supported_protocols: &[&str],
    ) -> ModelVendor {
        let client_api_compatibility = compatibility
            .iter()
            .map(|(client, status, protocols)| {
                (
                    (*client).to_owned(),
                    sdkwork_models::ClientApiCompatibility {
                        client_api_code: (*client).to_owned(),
                        display_name: (*client).to_owned(),
                        support_status: (*status).to_owned(),
                        protocol_codes: protocols.iter().map(|p| (*p).to_owned()).collect(),
                        api_codes: vec![],
                        resource_codes: vec![],
                        notes: "test".to_owned(),
                        source: source(),
                    },
                )
            })
            .collect::<BTreeMap<_, _>>();

        ModelVendor {
            vendor_code: code.to_owned(),
            region_code: "global".to_owned(),
            display_name: display_name.to_owned(),
            legal_name: None,
            description: None,
            website_url: None,
            docs_url: None,
            country_region: None,
            vendor_type: "commercial".to_owned(),
            market_scope: "global".to_owned(),
            billing_currency: "USD".to_owned(),
            billing_jurisdiction: "US".to_owned(),
            operating_regions: vec!["GLOBAL".to_owned()],
            model_families: vec![],
            capabilities: vec!["chat".to_owned()],
            supported_protocols: supported_protocols
                .iter()
                .map(|p| (*p).to_owned())
                .collect(),
            client_api_compatibility,
            open_source: Some(false),
            sort_order: None,
            source: source(),
        }
    }

    fn model(model_id: &str, vendor_code: &str, api_format: &str) -> ModelInfo {
        ModelInfo {
            catalog_key: format!("{vendor_code}/{model_id}"),
            model_id: model_id.to_owned(),
            display_name: model_id.to_owned(),
            vendor_code: vendor_code.to_owned(),
            region_code: "global".to_owned(),
            vendor_name: None,
            family_code: "test".to_owned(),
            primary_capability: "chat".to_owned(),
            capabilities: vec!["chat".to_owned()],
            input_modalities: vec!["text".to_owned()],
            output_modalities: vec!["text".to_owned()],
            api_format: api_format.to_owned(),
            context_tokens: None,
            max_input_tokens: None,
            max_output_tokens: None,
            supports_streaming: true,
            supports_tools: true,
            supports_json_schema: true,
            rank_score: None,
            lifecycle: "current".to_owned(),
            release_stage: "active".to_owned(),
            shelf_state: "listed".to_owned(),
            routing_state: "enabled".to_owned(),
            replacement_model: None,
            description: None,
            strengths: vec![],
            color_token: None,
            latency_p50_ms: None,
            latency_p95_ms: None,
            win_rate: None,
            trend_score: None,
            source: source(),
        }
    }

    fn source() -> SourceEvidence {
        SourceEvidence {
            source_url: "https://sdkwork.cloud/test".to_owned(),
            observed_at: "2026-06-04T00:00:00Z".to_owned(),
            source_hash: None,
        }
    }
}
