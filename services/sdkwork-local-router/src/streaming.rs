use axum::body::Body;
use axum::http::header;
use axum::response::Response;
use bytes::Bytes;
use futures_core::Stream;
use http_body_util::BodyExt;
use hyper::body::Incoming;
use sdkwork_lr_core::{Protocol, StreamUsageAccumulator, TokenUsage};
use sdkwork_lr_transform::streaming::{SseEvent, StreamTransformState};
use std::future::Future;
use std::pin::Pin;
use std::task::{Context, Poll};
use std::time::Duration;
use tokio::sync::mpsc;

const MAX_SSE_BUFFER_SIZE: usize = 1024 * 1024;
const STREAM_TIMEOUT_SECS: u64 = 300;

pub fn wrap_streaming_response(
    upstream_response: hyper::Response<Incoming>,
    source: Protocol,
    target: Protocol,
    model: String,
    request_id: String,
    on_complete: impl FnOnce(Option<TokenUsage>) -> Pin<Box<dyn Future<Output = ()> + Send>>
        + Send
        + 'static,
) -> Response {
    let (parts, body) = upstream_response.into_parts();
    wrap_streaming_parts(
        parts,
        body.into_data_stream(),
        source,
        target,
        model,
        request_id,
        on_complete,
    )
}

fn wrap_streaming_parts<S, E>(
    parts: axum::http::response::Parts,
    mut data_stream: S,
    source: Protocol,
    target: Protocol,
    model: String,
    request_id: String,
    on_complete: impl FnOnce(Option<TokenUsage>) -> Pin<Box<dyn Future<Output = ()> + Send>>
        + Send
        + 'static,
) -> Response
where
    S: Stream<Item = Result<Bytes, E>> + Send + Unpin + 'static,
    E: std::fmt::Display + Send + 'static,
{
    let (tx, rx) = mpsc::channel::<Result<Bytes, std::io::Error>>(32);

    let request_id_for_log = request_id.clone();
    tokio::spawn(async move {
        let mut buffer = String::new();
        let mut state = StreamTransformState::new(source, target, &model);
        let mut usage_accumulator = StreamUsageAccumulator::default();
        let mut on_complete = Some(on_complete);

        use futures_util::StreamExt;

        let timeout = Duration::from_secs(STREAM_TIMEOUT_SECS);

        loop {
            let chunk_result = tokio::time::timeout(timeout, data_stream.next()).await;

            match chunk_result {
                Ok(Some(Ok(chunk))) => {
                    let chunk_str = String::from_utf8_lossy(&chunk);
                    if buffer.len() + chunk_str.len() > MAX_SSE_BUFFER_SIZE {
                        let last_end = buffer.rfind("\n\n").or_else(|| buffer.rfind("\r\n\r\n"));
                        if let Some(pos) = last_end {
                            let sep_len = if buffer.as_bytes().get(pos + 1) == Some(&b'\r') {
                                4
                            } else {
                                2
                            };
                            buffer.truncate(pos + sep_len);
                        } else {
                            buffer.clear();
                        }
                        tracing::warn!(request_id = %request_id_for_log, "SSE buffer exceeded limit, trimmed");
                    }

                    buffer.push_str(&chunk_str);

                    while let Some(event) = SseEvent::parse_from_buffer(&mut buffer) {
                        if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&event.data) {
                            usage_accumulator.observe_event_data(source, &parsed);
                        }
                        let transformed = state.transform(event);
                        for output in transformed {
                            let bytes = Bytes::from(output.serialize());
                            if tx.send(Ok(bytes)).await.is_err() {
                                finalize_stream_usage(&mut on_complete, &usage_accumulator).await;
                                return;
                            }
                        }
                    }
                }
                Ok(Some(Err(e))) => {
                    let _ = tx
                        .send(Err(std::io::Error::new(
                            std::io::ErrorKind::Other,
                            e.to_string(),
                        )))
                        .await;
                    finalize_stream_usage(&mut on_complete, &usage_accumulator).await;
                    return;
                }
                Ok(None) => {
                    let remaining = state.flush();
                    for output in remaining {
                        let bytes = Bytes::from(output.serialize());
                        if tx.send(Ok(bytes)).await.is_err() {
                            finalize_stream_usage(&mut on_complete, &usage_accumulator).await;
                            return;
                        }
                    }
                    finalize_stream_usage(&mut on_complete, &usage_accumulator).await;
                    return;
                }
                Err(_) => {
                    tracing::warn!(request_id = %request_id_for_log, "stream timeout after {}s, closing", STREAM_TIMEOUT_SECS);
                    let _ = tx
                        .send(Err(std::io::Error::new(
                            std::io::ErrorKind::TimedOut,
                            format!("stream timeout after {}s", STREAM_TIMEOUT_SECS),
                        )))
                        .await;
                    finalize_stream_usage(&mut on_complete, &usage_accumulator).await;
                    return;
                }
            }
        }
    });

    let new_body = Body::from_stream(SseReceiverStream { rx });

    let mut response = Response::new(new_body);
    *response.status_mut() = parts.status;

    let connection_header_names = collect_connection_headers(&parts.headers);
    for (name, value) in parts.headers.iter() {
        if should_forward_header(name, &connection_header_names) {
            response.headers_mut().append(name, value.clone());
        }
    }

    response.headers_mut().insert(
        header::CONTENT_TYPE,
        header::HeaderValue::from_static("text/event-stream"),
    );
    response.headers_mut().insert(
        header::CACHE_CONTROL,
        header::HeaderValue::from_static("no-cache"),
    );
    response.headers_mut().insert(
        header::CONNECTION,
        header::HeaderValue::from_static("keep-alive"),
    );

    if let Ok(val) = header::HeaderValue::from_str(&request_id) {
        response.headers_mut().insert("x-request-id", val);
    }

    response
}

async fn finalize_stream_usage<F>(
    on_complete: &mut Option<F>,
    usage_accumulator: &StreamUsageAccumulator,
) where
    F: FnOnce(Option<TokenUsage>) -> Pin<Box<dyn Future<Output = ()> + Send>> + Send + 'static,
{
    if let Some(on_complete) = on_complete.take() {
        on_complete(usage_accumulator.token_usage()).await;
    }
}

fn collect_connection_headers(
    headers: &axum::http::HeaderMap,
) -> std::collections::HashSet<String> {
    headers
        .get_all(header::CONNECTION)
        .iter()
        .filter_map(|v| v.to_str().ok())
        .flat_map(|v| v.split(','))
        .map(|v| v.trim().to_ascii_lowercase())
        .filter(|v| !v.is_empty())
        .collect()
}

fn should_forward_header(
    name: &axum::http::header::HeaderName,
    connection_headers: &std::collections::HashSet<String>,
) -> bool {
    let name_str = name.as_str();
    !matches!(
        name_str,
        "connection"
            | "keep-alive"
            | "proxy-authenticate"
            | "proxy-authorization"
            | "te"
            | "trailer"
            | "transfer-encoding"
            | "upgrade"
            | "content-length"
    ) && !connection_headers.contains(name_str)
}

struct SseReceiverStream {
    rx: mpsc::Receiver<Result<Bytes, std::io::Error>>,
}

impl Stream for SseReceiverStream {
    type Item = Result<Bytes, std::io::Error>;

    fn poll_next(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Option<Self::Item>> {
        self.rx.poll_recv(cx)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use http_body_util::BodyExt;
    use std::sync::Arc;
    use tokio::sync::Mutex;

    #[tokio::test]
    async fn streaming_wrapper_reports_usage_to_completion_callback() {
        let parts = axum::http::Response::builder()
            .status(200)
            .header(header::CONTENT_TYPE, "text/event-stream")
            .body(())
            .unwrap()
            .into_parts()
            .0;
        let upstream_events = futures_util::stream::iter(vec![Ok::<Bytes, std::io::Error>(
            Bytes::from_static(
                b"data: {\"id\":\"chatcmpl_1\",\"object\":\"chat.completion.chunk\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"ok\"},\"finish_reason\":null}],\"usage\":null}\n\n\
                  data: {\"id\":\"chatcmpl_1\",\"object\":\"chat.completion.chunk\",\"choices\":[],\"usage\":{\"prompt_tokens\":8,\"completion_tokens\":3,\"total_tokens\":11}}\n\n\
                  data: [DONE]\n\n",
            ),
        )]);
        let captured_usage: Arc<Mutex<Option<TokenUsage>>> = Arc::new(Mutex::new(None));
        let captured_usage_for_callback = captured_usage.clone();

        let response = wrap_streaming_parts(
            parts,
            upstream_events,
            Protocol::Openai,
            Protocol::Openai,
            "gpt-5".to_owned(),
            "req_stream_usage".to_owned(),
            move |usage| {
                Box::pin(async move {
                    *captured_usage_for_callback.lock().await = usage;
                })
            },
        );

        let _body = response
            .into_body()
            .collect()
            .await
            .expect("stream body")
            .to_bytes();

        let usage = captured_usage
            .lock()
            .await
            .clone()
            .expect("usage should be reported");
        assert_eq!(usage.prompt_tokens, Some(8));
        assert_eq!(usage.completion_tokens, Some(3));
        assert_eq!(usage.total_tokens, Some(11));
    }
}
