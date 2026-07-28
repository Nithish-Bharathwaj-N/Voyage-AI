# 08. Observability

AI features are notoriously hard to debug. We require strict telemetry.

## Tracked Metrics
- **Provider Latency**: How long did Gemini take to respond?
- **Token Usage**: Tracked per user and per session for cost analysis.
- **Validation Failure Rate**: How often is the AI hallucinating or breaking schema?
- **Prompt Version**: Tag every telemetry event with the active prompt version.

This data is streamed to our logging infrastructure (Datadog/Grafana) via `@voyageai/observability`.
