use std::sync::Arc;

use crate::invocation::Invocation;

pub trait Interceptor: Send + Sync {
    fn name(&self) -> &str;
    fn on_request(&self, _invocation: &mut Invocation) -> Result<(), String> { Ok(()) }
    fn on_response(&self, _invocation: &mut Invocation) -> Result<(), String> { Ok(()) }
    fn on_error(&self, _invocation: &Invocation, _error: &str) {}
}

pub struct InterceptorChain {
    interceptors: Vec<Arc<dyn Interceptor>>,
}

impl InterceptorChain {
    pub fn new() -> Self {
        Self { interceptors: Vec::new() }
    }

    pub fn with_interceptors(interceptors: Vec<Arc<dyn Interceptor>>) -> Self {
        Self { interceptors }
    }

    pub fn add(&mut self, interceptor: Arc<dyn Interceptor>) {
        self.interceptors.push(interceptor);
    }

    pub fn before_request(&self, invocation: &mut Invocation) -> Result<(), String> {
        for interceptor in &self.interceptors {
            interceptor.on_request(invocation)?;
        }
        Ok(())
    }

    pub fn after_response(&self, invocation: &mut Invocation) -> Result<(), String> {
        for interceptor in self.interceptors.iter().rev() {
            interceptor.on_response(invocation)?;
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
    fn name(&self) -> &str { "logging" }

    fn on_request(&self, invocation: &mut Invocation) -> Result<(), String> {
        tracing::info!(
            request_id = %invocation.id,
            method = %invocation.method,
            path = %invocation.path,
            model = ?invocation.model,
            "request received"
        );
        Ok(())
    }

    fn on_response(&self, invocation: &mut Invocation) -> Result<(), String> {
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
    fn name(&self) -> &str { "metrics" }

    fn on_response(&self, invocation: &mut Invocation) -> Result<(), String> {
        invocation.metadata.insert("latency_ms".to_owned(), invocation.latency_ms().to_string());
        if let Some(ref usage) = invocation.token_usage {
            invocation.metadata.insert("total_tokens".to_owned(), usage.total_tokens.unwrap_or(0).to_string());
        }
        Ok(())
    }
}
