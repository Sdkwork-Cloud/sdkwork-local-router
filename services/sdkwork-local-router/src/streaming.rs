use axum::body::Body;
use axum::http::header;
use axum::response::Response;
use bytes::Bytes;
use futures_core::Stream;
use hyper::body::Incoming;
use sdkwork_lr_core::Protocol;
use sdkwork_lr_transform::streaming::{SseEvent, StreamTransformState};
use std::pin::Pin;
use std::task::{Context, Poll};
use tokio::sync::mpsc;
use std::time::Duration;

const MAX_SSE_BUFFER_SIZE: usize = 1024 * 1024;
const STREAM_TIMEOUT_SECS: u64 = 300;

pub fn wrap_streaming_response(
    upstream_response: hyper::Response<Incoming>,
    source: Protocol,
    target: Protocol,
    model: String,
    request_id: &str,
) -> Response {
    let (parts, body) = upstream_response.into_parts();

    let (tx, rx) = mpsc::channel::<Result<Bytes, std::io::Error>>(32);

    tokio::spawn(async move {
        let mut buffer = String::new();
        let mut data_stream = body.into_data_stream();
        let mut state = StreamTransformState::new(source, target, &model);

        use futures_util::StreamExt;

        let timeout = Duration::from_secs(STREAM_TIMEOUT_SECS);

        loop {
            let chunk_result = tokio::time::timeout(timeout, data_stream.next()).await;

            match chunk_result {
                Ok(Some(Ok(chunk))) => {
                    let chunk_str = String::from_utf8_lossy(&chunk);
                    if buffer.len() + chunk_str.len() > MAX_SSE_BUFFER_SIZE {
                        let last_end = buffer.rfind("\n\n")
                            .or_else(|| buffer.rfind("\r\n\r\n"));
                        if let Some(pos) = last_end {
                            let sep_len = if buffer.as_bytes().get(pos + 1) == Some(&b'\r') { 4 } else { 2 };
                            buffer.truncate(pos + sep_len);
                        } else {
                            buffer.clear();
                        }
                        tracing::warn!(request_id = %request_id, "SSE buffer exceeded limit, trimmed");
                    }

                    buffer.push_str(&chunk_str);

                    while let Some(event) = SseEvent::parse_from_buffer(&mut buffer) {
                        let transformed = state.transform(event);
                        for output in transformed {
                            let bytes = Bytes::from(output.serialize());
                            if tx.send(Ok(bytes)).await.is_err() {
                                return;
                            }
                        }
                    }
                }
                Ok(Some(Err(e))) => {
                    let _ = tx.send(Err(std::io::Error::new(
                        std::io::ErrorKind::Other,
                        e.to_string(),
                    ))).await;
                    return;
                }
                Ok(None) => {
                    let remaining = state.flush();
                    for output in remaining {
                        let bytes = Bytes::from(output.serialize());
                        if tx.send(Ok(bytes)).await.is_err() {
                            return;
                        }
                    }
                    return;
                }
                Err(_) => {
                    tracing::warn!(request_id = %request_id, "stream timeout after {}s, closing", STREAM_TIMEOUT_SECS);
                    let _ = tx.send(Err(std::io::Error::new(
                        std::io::ErrorKind::TimedOut,
                        format!("stream timeout after {}s", STREAM_TIMEOUT_SECS),
                    ))).await;
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

    if let Ok(val) = header::HeaderValue::from_str(request_id) {
        response.headers_mut().insert("x-request-id", val);
    }

    response
}

fn collect_connection_headers(headers: &axum::http::HeaderMap) -> std::collections::HashSet<String> {
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
        "connection" | "keep-alive" | "proxy-authenticate" | "proxy-authorization"
            | "te" | "trailer" | "transfer-encoding" | "upgrade"
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
