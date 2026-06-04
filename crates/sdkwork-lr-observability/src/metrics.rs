use std::sync::LazyLock;

use prometheus::{
    Encoder, HistogramOpts, HistogramVec, IntCounter, IntGauge, Registry, TextEncoder,
};

pub static REGISTRY: LazyLock<Registry> = LazyLock::new(Registry::new);

pub static REQUESTS_TOTAL: LazyLock<IntCounter> = LazyLock::new(|| {
    IntCounter::new(
        "sdkwork_requests_total",
        "Total number of requests processed",
    )
    .unwrap()
});

pub static REQUESTS_SUCCESS: LazyLock<IntCounter> = LazyLock::new(|| {
    IntCounter::new(
        "sdkwork_requests_success_total",
        "Total number of successful requests",
    )
    .unwrap()
});

pub static REQUESTS_FAILURE: LazyLock<IntCounter> = LazyLock::new(|| {
    IntCounter::new(
        "sdkwork_requests_failure_total",
        "Total number of failed requests",
    )
    .unwrap()
});

pub static REQUEST_DURATION: LazyLock<HistogramVec> = LazyLock::new(|| {
    HistogramVec::new(
        HistogramOpts::new(
            "sdkwork_request_duration_seconds",
            "Request duration in seconds",
        )
        .buckets(vec![0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0, 30.0, 60.0]),
        &["provider", "model"],
    )
    .unwrap()
});

pub static ACTIVE_ACCOUNTS: LazyLock<IntGauge> = LazyLock::new(|| {
    IntGauge::new(
        "sdkwork_active_accounts",
        "Number of active (healthy) accounts in the pool",
    )
    .unwrap()
});

pub static DEGRADED_ACCOUNTS: LazyLock<IntGauge> = LazyLock::new(|| {
    IntGauge::new(
        "sdkwork_degraded_accounts",
        "Number of degraded (half-open) accounts in the pool",
    )
    .unwrap()
});

pub static CIRCUIT_OPEN_ACCOUNTS: LazyLock<IntGauge> = LazyLock::new(|| {
    IntGauge::new(
        "sdkwork_circuit_open_accounts",
        "Number of circuit-open (removed) accounts in the pool",
    )
    .unwrap()
});

pub static CIRCUIT_OPENS_TOTAL: LazyLock<IntCounter> = LazyLock::new(|| {
    IntCounter::new(
        "sdkwork_circuit_opens_total",
        "Total number of circuit breaker open events",
    )
    .unwrap()
});

pub static TOKENS_INPUT_TOTAL: LazyLock<IntCounter> = LazyLock::new(|| {
    IntCounter::new("sdkwork_tokens_input_total", "Total input tokens consumed").unwrap()
});

pub static TOKENS_OUTPUT_TOTAL: LazyLock<IntCounter> = LazyLock::new(|| {
    IntCounter::new(
        "sdkwork_tokens_output_total",
        "Total output tokens consumed",
    )
    .unwrap()
});

pub static FALLBACK_TOTAL: LazyLock<IntCounter> = LazyLock::new(|| {
    IntCounter::new(
        "sdkwork_fallback_total",
        "Total number of fallback attempts",
    )
    .unwrap()
});

pub fn init_metrics() {
    REGISTRY.register(Box::new(REQUESTS_TOTAL.clone())).unwrap();
    REGISTRY
        .register(Box::new(REQUESTS_SUCCESS.clone()))
        .unwrap();
    REGISTRY
        .register(Box::new(REQUESTS_FAILURE.clone()))
        .unwrap();
    REGISTRY
        .register(Box::new(REQUEST_DURATION.clone()))
        .unwrap();
    REGISTRY
        .register(Box::new(ACTIVE_ACCOUNTS.clone()))
        .unwrap();
    REGISTRY
        .register(Box::new(DEGRADED_ACCOUNTS.clone()))
        .unwrap();
    REGISTRY
        .register(Box::new(CIRCUIT_OPEN_ACCOUNTS.clone()))
        .unwrap();
    REGISTRY
        .register(Box::new(CIRCUIT_OPENS_TOTAL.clone()))
        .unwrap();
    REGISTRY
        .register(Box::new(TOKENS_INPUT_TOTAL.clone()))
        .unwrap();
    REGISTRY
        .register(Box::new(TOKENS_OUTPUT_TOTAL.clone()))
        .unwrap();
    REGISTRY.register(Box::new(FALLBACK_TOTAL.clone())).unwrap();
}

pub fn gather_metrics() -> String {
    let encoder = TextEncoder::new();
    let metric_families = REGISTRY.gather();
    let mut buffer = Vec::new();
    encoder.encode(&metric_families, &mut buffer).unwrap();
    String::from_utf8(buffer).unwrap()
}
