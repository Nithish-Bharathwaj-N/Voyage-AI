# 08. Health & Monitoring

## Kubernetes Probes
- **`GET /health/liveness`**: Returns 200 if the Node event loop is ticking. Used by Railway/Render to restart frozen containers.
- **`GET /health/readiness`**: Checks connections to Postgres, Redis, and BullMQ using the `@voyageai/observability` package. Returns 200 only if all are connected.

## Request Tracing
Every request is intercepted and assigned a `X-Request-Id` header (UUID v4) if not provided by the edge router. This ID is passed into the `PinoLogger` context to trace requests across the monolithic layer.
