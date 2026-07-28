# 226 - Deployment

## Target: ECS / K8s / Cloud Run
The `docker-compose.prod.yml` serves as a blueprint for deployment to robust cloud services.

- `api` is stateless, delegating sessions to Redis.
- Database runs on managed infrastructure (e.g., RDS or Supabase).
- Secrets are injected at runtime by the deployment provider.
