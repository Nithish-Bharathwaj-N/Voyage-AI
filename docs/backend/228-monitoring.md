# 228 - Monitoring

## Prometheus / Grafana
- Extensible logging configuration allows forwarding Winston to standard log aggregators like Datadog, ELK, or Grafana Loki.

## Terminus
- Readiness (`/health/ready`) indicates API capability to accept traffic.
- Liveness (`/health/live`) evaluates memory limits (heap < 150MB).
