use std::collections::HashMap;
use std::sync::Arc;

use crate::account_pool::Account;
use crate::invocation::Invocation;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum InterceptorStage {
    RequestReceived,
    RequestBodyRead,
    RouteCandidates,
    AccountSelected,
    BeforeTransform,
    BeforeForward,
    UpstreamResponse,
    ResponseReady,
    BeforePersist,
    Error,
}

impl InterceptorStage {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::RequestReceived => "request_received",
            Self::RequestBodyRead => "request_body_read",
            Self::RouteCandidates => "route_candidates",
            Self::AccountSelected => "account_selected",
            Self::BeforeTransform => "before_transform",
            Self::BeforeForward => "before_forward",
            Self::UpstreamResponse => "upstream_response",
            Self::ResponseReady => "response_ready",
            Self::BeforePersist => "before_persist",
            Self::Error => "error",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InterceptorError {
    pub http_status: u16,
    pub code: String,
    pub message: String,
}

impl InterceptorError {
    pub fn new(http_status: u16, code: impl Into<String>, message: impl Into<String>) -> Self {
        Self {
            http_status,
            code: code.into(),
            message: message.into(),
        }
    }

    pub fn internal(message: impl Into<String>) -> Self {
        Self::new(500, "interceptor_error", message)
    }

    pub fn bad_request(message: impl Into<String>) -> Self {
        Self::new(400, "interceptor_bad_request", message)
    }

    pub fn forbidden(message: impl Into<String>) -> Self {
        Self::new(403, "interceptor_forbidden", message)
    }

    pub fn payment_required(message: impl Into<String>) -> Self {
        Self::new(402, "interceptor_payment_required", message)
    }

    pub fn too_many_requests(message: impl Into<String>) -> Self {
        Self::new(429, "interceptor_too_many_requests", message)
    }
}

impl std::fmt::Display for InterceptorError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}: {}", self.code, self.message)
    }
}

impl std::error::Error for InterceptorError {}

impl From<String> for InterceptorError {
    fn from(value: String) -> Self {
        Self::internal(value)
    }
}

impl From<&str> for InterceptorError {
    fn from(value: &str) -> Self {
        Self::internal(value)
    }
}

pub type InterceptorResult = Result<(), InterceptorError>;

pub trait Interceptor: Send + Sync {
    fn name(&self) -> &str;
    fn on_request(&self, _invocation: &mut Invocation) -> InterceptorResult {
        Ok(())
    }
    fn on_request_body_read(
        &self,
        _invocation: &mut Invocation,
        _body_size: usize,
    ) -> InterceptorResult {
        Ok(())
    }
    fn on_route_candidates(
        &self,
        _invocation: &mut Invocation,
        _candidates: &mut Vec<Arc<Account>>,
    ) -> InterceptorResult {
        Ok(())
    }
    fn on_account_selected(
        &self,
        _invocation: &mut Invocation,
        _account: &Account,
    ) -> InterceptorResult {
        Ok(())
    }
    fn on_before_transform(&self, _invocation: &mut Invocation) -> InterceptorResult {
        Ok(())
    }
    fn on_before_forward(&self, _invocation: &mut Invocation) -> InterceptorResult {
        Ok(())
    }
    fn on_upstream_response(
        &self,
        _invocation: &mut Invocation,
        _status_code: u16,
    ) -> InterceptorResult {
        Ok(())
    }
    fn on_response(&self, _invocation: &mut Invocation) -> InterceptorResult {
        Ok(())
    }
    fn on_before_persist(&self, _invocation: &mut Invocation) -> InterceptorResult {
        Ok(())
    }
    fn on_error(&self, _invocation: &Invocation, _error: &str) {}
}

pub struct InterceptorChain {
    interceptors: Vec<Arc<dyn Interceptor>>,
}

impl InterceptorChain {
    pub fn new() -> Self {
        Self {
            interceptors: Vec::new(),
        }
    }

    pub fn with_interceptors(interceptors: Vec<Arc<dyn Interceptor>>) -> Self {
        Self { interceptors }
    }

    pub fn add(&mut self, interceptor: Arc<dyn Interceptor>) {
        self.interceptors.push(interceptor);
    }

    pub fn before_request(&self, invocation: &mut Invocation) -> InterceptorResult {
        for interceptor in &self.interceptors {
            interceptor.on_request(invocation)?;
        }
        Ok(())
    }

    pub fn after_request_body_read(
        &self,
        invocation: &mut Invocation,
        body_size: usize,
    ) -> InterceptorResult {
        for interceptor in &self.interceptors {
            interceptor.on_request_body_read(invocation, body_size)?;
        }
        Ok(())
    }

    pub fn route_candidates(
        &self,
        invocation: &mut Invocation,
        candidates: &mut Vec<Arc<Account>>,
    ) -> InterceptorResult {
        for interceptor in &self.interceptors {
            interceptor.on_route_candidates(invocation, candidates)?;
        }
        Ok(())
    }

    pub fn account_selected(
        &self,
        invocation: &mut Invocation,
        account: &Account,
    ) -> InterceptorResult {
        for interceptor in &self.interceptors {
            interceptor.on_account_selected(invocation, account)?;
        }
        Ok(())
    }

    pub fn before_transform(&self, invocation: &mut Invocation) -> InterceptorResult {
        for interceptor in &self.interceptors {
            interceptor.on_before_transform(invocation)?;
        }
        Ok(())
    }

    pub fn before_forward(&self, invocation: &mut Invocation) -> InterceptorResult {
        for interceptor in &self.interceptors {
            interceptor.on_before_forward(invocation)?;
        }
        Ok(())
    }

    pub fn after_upstream_response(
        &self,
        invocation: &mut Invocation,
        status_code: u16,
    ) -> InterceptorResult {
        for interceptor in self.interceptors.iter().rev() {
            interceptor.on_upstream_response(invocation, status_code)?;
        }
        Ok(())
    }

    pub fn after_response(&self, invocation: &mut Invocation) -> InterceptorResult {
        for interceptor in self.interceptors.iter().rev() {
            interceptor.on_response(invocation)?;
        }
        Ok(())
    }

    pub fn before_persist(&self, invocation: &mut Invocation) -> InterceptorResult {
        for interceptor in &self.interceptors {
            interceptor.on_before_persist(invocation)?;
        }
        Ok(())
    }

    pub fn notify_error(&self, invocation: &Invocation, error: &str) {
        for interceptor in &self.interceptors {
            interceptor.on_error(invocation, error);
        }
    }
}

pub struct LoggingInterceptor;

impl Interceptor for LoggingInterceptor {
    fn name(&self) -> &str {
        "logging"
    }

    fn on_request(&self, invocation: &mut Invocation) -> InterceptorResult {
        tracing::info!(
            request_id = %invocation.id,
            user_id = invocation.user_id,
            api_group = %invocation.api_group,
            method = %invocation.method,
            path = %invocation.path,
            model = ?invocation.model,
            "request received"
        );
        Ok(())
    }

    fn on_route_candidates(
        &self,
        invocation: &mut Invocation,
        candidates: &mut Vec<Arc<Account>>,
    ) -> InterceptorResult {
        tracing::debug!(
            request_id = %invocation.id,
            candidates = candidates.len(),
            model = ?invocation.model,
            "route candidates resolved"
        );
        Ok(())
    }

    fn on_account_selected(
        &self,
        invocation: &mut Invocation,
        account: &Account,
    ) -> InterceptorResult {
        tracing::debug!(
            request_id = %invocation.id,
            account = %account.name,
            provider = %account.provider,
            "route account selected"
        );
        Ok(())
    }

    fn on_response(&self, invocation: &mut Invocation) -> InterceptorResult {
        tracing::info!(
            request_id = %invocation.id,
            status_code = ?invocation.status_code,
            latency_ms = invocation.latency_ms(),
            model = ?invocation.model,
            tokens = ?invocation.token_usage,
            "request completed"
        );
        Ok(())
    }

    fn on_error(&self, invocation: &Invocation, error: &str) {
        tracing::error!(
            request_id = %invocation.id,
            error = %error,
            model = ?invocation.model,
            "request failed"
        );
    }
}

pub struct MetricsInterceptor;

impl Interceptor for MetricsInterceptor {
    fn name(&self) -> &str {
        "metrics"
    }

    fn on_request_body_read(
        &self,
        invocation: &mut Invocation,
        body_size: usize,
    ) -> InterceptorResult {
        invocation
            .metadata
            .insert("request_body_size".to_owned(), body_size.to_string());
        Ok(())
    }

    fn on_route_candidates(
        &self,
        invocation: &mut Invocation,
        candidates: &mut Vec<Arc<Account>>,
    ) -> InterceptorResult {
        invocation.metadata.insert(
            "route_candidate_count".to_owned(),
            candidates.len().to_string(),
        );
        Ok(())
    }

    fn on_upstream_response(
        &self,
        invocation: &mut Invocation,
        status_code: u16,
    ) -> InterceptorResult {
        invocation
            .metadata
            .insert("upstream_status_code".to_owned(), status_code.to_string());
        Ok(())
    }

    fn on_response(&self, invocation: &mut Invocation) -> InterceptorResult {
        invocation
            .metadata
            .insert("latency_ms".to_owned(), invocation.latency_ms().to_string());
        if let Some(ref usage) = invocation.token_usage {
            invocation.metadata.insert(
                "total_tokens".to_owned(),
                usage.total_tokens.unwrap_or(0).to_string(),
            );
        }
        Ok(())
    }
}

#[derive(Debug, Clone, Default)]
pub struct SecurityPolicyConfig {
    pub blocked_models: Vec<String>,
    pub blocked_accounts: Vec<String>,
    pub blocked_providers: Vec<String>,
    pub max_body_size_bytes: Option<usize>,
}

pub struct SecurityPolicyInterceptor {
    config: SecurityPolicyConfig,
}

impl SecurityPolicyInterceptor {
    pub fn new(config: SecurityPolicyConfig) -> Self {
        Self { config }
    }

    fn reject_model_if_needed(&self, invocation: &Invocation) -> InterceptorResult {
        if let Some(model) = invocation.model.as_deref() {
            if pattern_list_matches(&self.config.blocked_models, model) {
                return Err(InterceptorError::forbidden(format!(
                    "model '{model}' is blocked by security policy"
                )));
            }
        }
        Ok(())
    }

    fn account_blocked(&self, account: &Account) -> bool {
        pattern_list_matches(&self.config.blocked_accounts, &account.name)
            || pattern_list_matches(
                &self.config.blocked_providers,
                &account.provider.to_string(),
            )
    }
}

impl Interceptor for SecurityPolicyInterceptor {
    fn name(&self) -> &str {
        "security_policy"
    }

    fn on_request_body_read(
        &self,
        _invocation: &mut Invocation,
        body_size: usize,
    ) -> InterceptorResult {
        if let Some(limit) = self.config.max_body_size_bytes {
            if body_size > limit {
                return Err(InterceptorError::new(
                    413,
                    "interceptor_payload_too_large",
                    format!("request body size {body_size} exceeds security policy limit {limit}"),
                ));
            }
        }
        Ok(())
    }

    fn on_route_candidates(
        &self,
        invocation: &mut Invocation,
        candidates: &mut Vec<Arc<Account>>,
    ) -> InterceptorResult {
        let before = candidates.len();
        candidates.retain(|account| !self.account_blocked(account));
        let filtered = before.saturating_sub(candidates.len());
        if filtered > 0 {
            invocation.metadata.insert(
                "security_policy_filtered_candidates".to_owned(),
                filtered.to_string(),
            );
        }
        Ok(())
    }

    fn on_account_selected(
        &self,
        _invocation: &mut Invocation,
        account: &Account,
    ) -> InterceptorResult {
        if self.account_blocked(account) {
            return Err(InterceptorError::forbidden(format!(
                "account '{}' is blocked by security policy",
                account.name
            )));
        }
        Ok(())
    }

    fn on_before_transform(&self, invocation: &mut Invocation) -> InterceptorResult {
        self.reject_model_if_needed(invocation)
    }

    fn on_before_forward(&self, invocation: &mut Invocation) -> InterceptorResult {
        self.reject_model_if_needed(invocation)
    }
}

#[derive(Debug, Clone, Default)]
pub struct ConcurrencyLimitConfig {
    pub global_limit: Option<usize>,
    pub per_user_limit: Option<usize>,
    pub per_model_limit: Option<usize>,
    pub per_account_limit: Option<usize>,
}

#[derive(Debug, Default)]
struct ConcurrencyState {
    active: HashMap<String, Vec<String>>,
    counts: HashMap<String, usize>,
}

pub struct ConcurrencyLimitInterceptor {
    config: ConcurrencyLimitConfig,
    state: parking_lot::Mutex<ConcurrencyState>,
}

impl ConcurrencyLimitInterceptor {
    pub fn new(config: ConcurrencyLimitConfig) -> Self {
        Self {
            config,
            state: parking_lot::Mutex::new(ConcurrencyState::default()),
        }
    }

    fn scoped_limits(&self, invocation: &Invocation) -> Vec<(String, usize)> {
        let mut scopes = Vec::new();
        if let Some(limit) = self.config.global_limit {
            scopes.push(("global".to_owned(), limit));
        }
        if let Some(limit) = self.config.per_user_limit {
            scopes.push((format!("user:{}", invocation.user_id), limit));
        }
        if let (Some(limit), Some(model)) =
            (self.config.per_model_limit, invocation.model.as_deref())
        {
            scopes.push((format!("model:{model}"), limit));
        }
        if let (Some(limit), Some(account)) = (
            self.config.per_account_limit,
            invocation.account_name.as_deref(),
        ) {
            scopes.push((format!("account:{account}"), limit));
        }
        scopes
    }

    fn release(&self, invocation: &Invocation) {
        let mut state = self.state.lock();
        let Some(scopes) = state.active.remove(&invocation.id) else {
            return;
        };
        for scope in scopes {
            if let Some(count) = state.counts.get_mut(&scope) {
                *count = count.saturating_sub(1);
                if *count == 0 {
                    state.counts.remove(&scope);
                }
            }
        }
    }
}

impl Interceptor for ConcurrencyLimitInterceptor {
    fn name(&self) -> &str {
        "concurrency_control"
    }

    fn on_before_forward(&self, invocation: &mut Invocation) -> InterceptorResult {
        let scoped_limits = self.scoped_limits(invocation);
        if scoped_limits.is_empty() {
            return Ok(());
        }

        let mut state = self.state.lock();
        if state.active.contains_key(&invocation.id) {
            return Ok(());
        }

        for (scope, limit) in &scoped_limits {
            let current = state.counts.get(scope).copied().unwrap_or(0);
            if current >= *limit {
                return Err(InterceptorError::too_many_requests(format!(
                    "concurrency limit exceeded for {scope}"
                )));
            }
        }

        let scopes = scoped_limits
            .into_iter()
            .map(|(scope, _limit)| {
                *state.counts.entry(scope.clone()).or_insert(0) += 1;
                scope
            })
            .collect::<Vec<_>>();
        invocation
            .metadata
            .insert("concurrency_control_scopes".to_owned(), scopes.join(","));
        state.active.insert(invocation.id.clone(), scopes);
        Ok(())
    }

    fn on_response(&self, invocation: &mut Invocation) -> InterceptorResult {
        self.release(invocation);
        Ok(())
    }

    fn on_error(&self, invocation: &Invocation, _error: &str) {
        self.release(invocation);
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BillingQuotaScope {
    Global,
    User,
    UserModel,
    UserAccount,
}

#[derive(Debug, Clone)]
pub struct BillingQuotaConfig {
    pub scope: BillingQuotaScope,
    pub max_requests: Option<u64>,
    pub max_tokens: Option<u64>,
}

impl Default for BillingQuotaConfig {
    fn default() -> Self {
        Self {
            scope: BillingQuotaScope::User,
            max_requests: None,
            max_tokens: None,
        }
    }
}

#[derive(Debug, Default)]
struct BillingUsageState {
    usage_by_scope: HashMap<String, BillingUsage>,
    reservations: HashMap<String, String>,
}

#[derive(Debug, Default, Clone, Copy)]
struct BillingUsage {
    requests: u64,
    tokens: u64,
}

pub struct BillingQuotaInterceptor {
    config: BillingQuotaConfig,
    state: parking_lot::Mutex<BillingUsageState>,
}

impl BillingQuotaInterceptor {
    pub fn new(config: BillingQuotaConfig) -> Self {
        Self {
            config,
            state: parking_lot::Mutex::new(BillingUsageState::default()),
        }
    }

    fn quota_enabled(&self) -> bool {
        self.config.max_requests.is_some() || self.config.max_tokens.is_some()
    }

    fn scope_key(&self, invocation: &Invocation) -> String {
        match self.config.scope {
            BillingQuotaScope::Global => "global".to_owned(),
            BillingQuotaScope::User => format!("user:{}", invocation.user_id),
            BillingQuotaScope::UserModel => format!(
                "user:{}:model:{}",
                invocation.user_id,
                invocation.model.as_deref().unwrap_or("unknown")
            ),
            BillingQuotaScope::UserAccount => format!(
                "user:{}:account:{}",
                invocation.user_id,
                invocation.account_name.as_deref().unwrap_or("unknown")
            ),
        }
    }

    fn release_reservation(&self, invocation: &Invocation) -> Option<String> {
        self.state.lock().reservations.remove(&invocation.id)
    }
}

impl Interceptor for BillingQuotaInterceptor {
    fn name(&self) -> &str {
        "billing_meter"
    }

    fn on_before_forward(&self, invocation: &mut Invocation) -> InterceptorResult {
        if !self.quota_enabled() {
            return Ok(());
        }

        let scope = self.scope_key(invocation);
        let mut state = self.state.lock();
        if state.reservations.contains_key(&invocation.id) {
            return Ok(());
        }

        let usage = state
            .usage_by_scope
            .get(&scope)
            .copied()
            .unwrap_or_default();
        if self
            .config
            .max_requests
            .is_some_and(|max_requests| usage.requests >= max_requests)
        {
            return Err(InterceptorError::payment_required(format!(
                "request quota exhausted for {scope}"
            )));
        }
        if self
            .config
            .max_tokens
            .is_some_and(|max_tokens| usage.tokens >= max_tokens)
        {
            return Err(InterceptorError::payment_required(format!(
                "token quota exhausted for {scope}"
            )));
        }

        let usage = state.usage_by_scope.entry(scope.clone()).or_default();
        usage.requests = usage.requests.saturating_add(1);
        state
            .reservations
            .insert(invocation.id.clone(), scope.clone());
        invocation
            .metadata
            .insert("billing_quota_scope".to_owned(), scope);
        Ok(())
    }

    fn on_response(&self, invocation: &mut Invocation) -> InterceptorResult {
        let Some(scope) = self.release_reservation(invocation) else {
            return Ok(());
        };
        let tokens = invocation
            .token_usage
            .as_ref()
            .and_then(|usage| usage.total_tokens)
            .unwrap_or(0)
            .max(0) as u64;
        if tokens > 0 {
            let mut state = self.state.lock();
            let usage = state.usage_by_scope.entry(scope).or_default();
            usage.tokens = usage.tokens.saturating_add(tokens);
            invocation.metadata.insert(
                "billing_quota_recorded_tokens".to_owned(),
                tokens.to_string(),
            );
        }
        Ok(())
    }

    fn on_error(&self, invocation: &Invocation, _error: &str) {
        let _ = self.release_reservation(invocation);
    }
}

pub struct AuditMetadataInterceptor;

impl Interceptor for AuditMetadataInterceptor {
    fn name(&self) -> &str {
        "audit_metadata"
    }

    fn on_before_persist(&self, invocation: &mut Invocation) -> InterceptorResult {
        invocation
            .metadata
            .insert("audit.request_id".to_owned(), invocation.id.clone());
        invocation
            .metadata
            .insert("audit.user_id".to_owned(), invocation.user_id.to_string());
        invocation
            .metadata
            .insert("audit.api_group".to_owned(), invocation.api_group.clone());
        invocation
            .metadata
            .insert("audit.protocol".to_owned(), invocation.protocol.to_string());
        invocation
            .metadata
            .insert("audit.method".to_owned(), invocation.method.clone());
        invocation
            .metadata
            .insert("audit.path".to_owned(), invocation.path.clone());
        invocation
            .metadata
            .insert("audit.status".to_owned(), invocation.status.to_string());
        if let Some(status_code) = invocation.status_code {
            invocation
                .metadata
                .insert("audit.status_code".to_owned(), status_code.to_string());
        }
        insert_optional_audit_metadata(&mut invocation.metadata, "audit.model", &invocation.model);
        insert_optional_audit_metadata(
            &mut invocation.metadata,
            "audit.account_name",
            &invocation.account_name,
        );
        insert_optional_audit_metadata(
            &mut invocation.metadata,
            "audit.client_api",
            &invocation.client_api,
        );
        insert_optional_audit_metadata(
            &mut invocation.metadata,
            "audit.plugin_id",
            &invocation.plugin_id,
        );
        insert_optional_audit_metadata(
            &mut invocation.metadata,
            "audit.model_vendor",
            &invocation.model_vendor,
        );
        Ok(())
    }
}

fn insert_optional_audit_metadata(
    metadata: &mut HashMap<String, String>,
    key: &str,
    value: &Option<String>,
) {
    if let Some(value) = value {
        metadata.insert(key.to_owned(), value.clone());
    }
}

fn pattern_list_matches(patterns: &[String], value: &str) -> bool {
    patterns
        .iter()
        .any(|pattern| pattern_matches(pattern.trim(), value))
}

fn pattern_matches(pattern: &str, value: &str) -> bool {
    if pattern.is_empty() {
        return false;
    }
    if pattern == "*" || pattern == ".*" {
        return true;
    }
    if pattern.starts_with('/') && pattern.ends_with('/') && pattern.len() > 2 {
        return regex::Regex::new(&pattern[1..pattern.len() - 1])
            .map(|regex| regex.is_match(value))
            .unwrap_or(false);
    }
    if pattern.contains('*') {
        let regex_pattern = format!(
            "^{}$",
            regex::escape(pattern)
                .replace("\\*", ".*")
                .replace("\\?", ".")
        );
        return regex::Regex::new(&regex_pattern)
            .map(|regex| regex.is_match(value))
            .unwrap_or(false);
    }
    value == pattern
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{Account, Invocation, Protocol, ProviderKind};
    use std::collections::BTreeMap;
    use std::sync::Mutex;
    use std::time::Duration;

    struct RecordingInterceptor {
        events: Arc<Mutex<Vec<String>>>,
    }

    impl RecordingInterceptor {
        fn new(events: Arc<Mutex<Vec<String>>>) -> Self {
            Self { events }
        }

        fn push(&self, event: &str) {
            self.events.lock().unwrap().push(event.to_owned());
        }
    }

    impl Interceptor for RecordingInterceptor {
        fn name(&self) -> &str {
            "recording"
        }

        fn on_request(&self, _invocation: &mut Invocation) -> InterceptorResult {
            self.push("request_received");
            Ok(())
        }

        fn on_request_body_read(
            &self,
            _invocation: &mut Invocation,
            body_size: usize,
        ) -> InterceptorResult {
            self.push(&format!("request_body_read:{body_size}"));
            Ok(())
        }

        fn on_route_candidates(
            &self,
            _invocation: &mut Invocation,
            candidates: &mut Vec<Arc<Account>>,
        ) -> InterceptorResult {
            self.push(&format!("route_candidates:{}", candidates.len()));
            candidates.retain(|account| account.name != "blocked");
            Ok(())
        }

        fn on_account_selected(
            &self,
            _invocation: &mut Invocation,
            account: &Account,
        ) -> InterceptorResult {
            self.push(&format!("account_selected:{}", account.name));
            Ok(())
        }

        fn on_before_transform(&self, _invocation: &mut Invocation) -> InterceptorResult {
            self.push("before_transform");
            Ok(())
        }

        fn on_before_forward(&self, _invocation: &mut Invocation) -> InterceptorResult {
            self.push("before_forward");
            Ok(())
        }

        fn on_response(&self, _invocation: &mut Invocation) -> InterceptorResult {
            self.push("response_ready");
            Ok(())
        }

        fn on_before_persist(&self, _invocation: &mut Invocation) -> InterceptorResult {
            self.push("before_persist");
            Ok(())
        }
    }

    fn account(name: &str) -> Arc<Account> {
        Arc::new(Account {
            name: name.to_owned(),
            provider: ProviderKind::Openai,
            base_url: "https://example.test".to_owned(),
            upstream_api_key: "secret".to_owned(),
            models: vec!["*".to_owned()],
            priority: 10,
            timeout: Duration::from_secs(30),
            max_retries: 0,
            retry_delay_ms: 500,
            anthropic_version: None,
            default_headers: BTreeMap::new(),
            enabled: true,
            model_aliases: BTreeMap::new(),
        })
    }

    fn invocation_for_user(request_id: &str, user_id: i64, model: &str) -> Invocation {
        let mut invocation = Invocation::new(
            request_id.to_owned(),
            Protocol::Openai,
            "POST".to_owned(),
            "/v1/responses".to_owned(),
        )
        .with_model(model);
        invocation.user_id = user_id;
        invocation
    }

    #[test]
    fn interceptor_chain_exposes_standard_pipeline_hooks_in_order() {
        let events = Arc::new(Mutex::new(Vec::new()));
        let chain = InterceptorChain::with_interceptors(vec![Arc::new(RecordingInterceptor::new(
            events.clone(),
        ))]);
        let mut invocation = Invocation::new(
            "req-1".to_owned(),
            Protocol::Openai,
            "POST".to_owned(),
            "/v1/responses".to_owned(),
        );
        let mut candidates = vec![account("primary"), account("blocked")];

        chain.before_request(&mut invocation).unwrap();
        chain.after_request_body_read(&mut invocation, 128).unwrap();
        chain
            .route_candidates(&mut invocation, &mut candidates)
            .unwrap();
        chain
            .account_selected(&mut invocation, candidates[0].as_ref())
            .unwrap();
        chain.before_transform(&mut invocation).unwrap();
        chain.before_forward(&mut invocation).unwrap();
        chain.after_response(&mut invocation).unwrap();
        chain.before_persist(&mut invocation).unwrap();

        assert_eq!(candidates.len(), 1);
        assert_eq!(candidates[0].name, "primary");
        assert_eq!(
            events.lock().unwrap().as_slice(),
            &[
                "request_received",
                "request_body_read:128",
                "route_candidates:2",
                "account_selected:primary",
                "before_transform",
                "before_forward",
                "response_ready",
                "before_persist",
            ]
        );
    }

    #[test]
    fn security_policy_interceptor_blocks_models_and_filters_candidates() {
        let interceptor = SecurityPolicyInterceptor::new(SecurityPolicyConfig {
            blocked_models: vec!["gpt-danger".to_owned()],
            blocked_accounts: vec!["blocked".to_owned()],
            blocked_providers: vec![],
            max_body_size_bytes: None,
        });
        let mut blocked_invocation = invocation_for_user("req-blocked", 7, "gpt-danger");

        let error = interceptor
            .on_before_transform(&mut blocked_invocation)
            .expect_err("blocked model should fail before transform");

        assert_eq!(error.http_status, 403);
        assert_eq!(error.code, "interceptor_forbidden");

        let mut allowed_invocation = invocation_for_user("req-allowed", 7, "gpt-4o");
        let mut candidates = vec![account("primary"), account("blocked")];

        interceptor
            .on_route_candidates(&mut allowed_invocation, &mut candidates)
            .unwrap();

        assert_eq!(candidates.len(), 1);
        assert_eq!(candidates[0].name, "primary");
        assert_eq!(
            allowed_invocation
                .metadata
                .get("security_policy_filtered_candidates")
                .map(String::as_str),
            Some("1")
        );
    }

    #[test]
    fn concurrency_limit_interceptor_rejects_when_limit_is_exceeded_and_releases() {
        let interceptor = ConcurrencyLimitInterceptor::new(ConcurrencyLimitConfig {
            global_limit: Some(1),
            per_user_limit: None,
            per_model_limit: None,
            per_account_limit: None,
        });
        let mut first = invocation_for_user("req-1", 7, "gpt-4o");
        let mut second = invocation_for_user("req-2", 8, "gpt-4o");

        interceptor.on_before_forward(&mut first).unwrap();
        let error = interceptor
            .on_before_forward(&mut second)
            .expect_err("global limit should reject the second in-flight request");

        assert_eq!(error.http_status, 429);
        assert_eq!(error.code, "interceptor_too_many_requests");

        interceptor.on_response(&mut first).unwrap();
        interceptor.on_before_forward(&mut second).unwrap();
    }

    #[test]
    fn billing_quota_interceptor_enforces_request_quota_per_user() {
        let interceptor = BillingQuotaInterceptor::new(BillingQuotaConfig {
            scope: BillingQuotaScope::User,
            max_requests: Some(1),
            max_tokens: None,
        });
        let mut first = invocation_for_user("req-1", 7, "gpt-4o");
        let mut same_user_second = invocation_for_user("req-2", 7, "gpt-4o");
        let mut other_user = invocation_for_user("req-3", 8, "gpt-4o");

        interceptor.on_before_forward(&mut first).unwrap();
        let error = interceptor
            .on_before_forward(&mut same_user_second)
            .expect_err("same user request quota should be exhausted");

        assert_eq!(error.http_status, 402);
        assert_eq!(error.code, "interceptor_payment_required");
        interceptor.on_before_forward(&mut other_user).unwrap();
    }

    #[test]
    fn billing_quota_interceptor_records_stream_usage_tokens_on_response() {
        let interceptor = BillingQuotaInterceptor::new(BillingQuotaConfig {
            scope: BillingQuotaScope::User,
            max_requests: Some(10),
            max_tokens: Some(100),
        });
        let mut invocation = invocation_for_user("stream-req-1", 42, "gpt-5");
        invocation.streaming = true;

        interceptor.on_before_forward(&mut invocation).unwrap();
        invocation.set_token_usage(crate::TokenUsage {
            prompt_tokens: Some(12),
            completion_tokens: Some(5),
            total_tokens: Some(17),
        });
        interceptor.on_response(&mut invocation).unwrap();

        assert_eq!(
            invocation.metadata.get("billing_quota_scope"),
            Some(&"user:42".to_owned())
        );
        assert_eq!(
            invocation.metadata.get("billing_quota_recorded_tokens"),
            Some(&"17".to_owned())
        );
    }

    #[test]
    fn audit_metadata_interceptor_records_standard_context_before_persist() {
        let interceptor = AuditMetadataInterceptor;
        let mut invocation =
            invocation_for_user("req-audit", 42, "gpt-4o").with_account("openai-primary");
        invocation.set_routing_metadata(
            "openai",
            "/v1/responses",
            "codex",
            "openai_responses",
            "openai_responses",
            "auto",
            Some("OPENAI_RESPONSES_PASSTHROUGH_API".to_owned()),
            Some("openai".to_owned()),
            false,
            1,
        );
        invocation.set_response(200, None);

        interceptor.on_before_persist(&mut invocation).unwrap();

        assert_eq!(
            invocation.metadata.get("audit.user_id").map(String::as_str),
            Some("42")
        );
        assert_eq!(
            invocation
                .metadata
                .get("audit.api_group")
                .map(String::as_str),
            Some("local-router-open-api")
        );
        assert_eq!(
            invocation
                .metadata
                .get("audit.account_name")
                .map(String::as_str),
            Some("openai-primary")
        );
        assert_eq!(
            invocation.metadata.get("audit.status").map(String::as_str),
            Some("completed")
        );
        assert_eq!(
            invocation
                .metadata
                .get("audit.plugin_id")
                .map(String::as_str),
            Some("OPENAI_RESPONSES_PASSTHROUGH_API")
        );
    }
}
