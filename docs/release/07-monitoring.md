# 07. Monitoring & Observability

If the AI starts hallucinating in production, we need to know immediately.

## Datadog / Grafana Integration
- **LLM Token Burn Rate**: Tracked globally and per-user to prevent abuse.
- **AI Rejection Rate**: How often does the `CommandValidator` reject the LLM's output? If this spikes above 2%, we have a prompt regression.
- **User Rejection Rate**: How often does the user click "Reject" on the `PlannerDiff`? If this is high, the AI is producing structurally valid but logically useless itineraries.

## Health Endpoints
- `/health/liveness`: Indicates if the NestJS pod is running.
- `/health/readiness`: Indicates if the database and Redis connections are established.
