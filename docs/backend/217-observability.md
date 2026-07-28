# 217 - Observability

- **Tracing**: Custom Logger intercepts `startTime` and `latency` for every `AIOrchestrator` execution.
- **ProviderMetrics**: Failed health checks or 500s are logged into the PostgreSQL database.
- **Workflow State**: Emitting `EXECUTING_AI` or `VALIDATING_OUTPUT` over WebSockets implicitly traces user-facing latency.
