# 219 - Deployment Strategy

1. **Dockerized API**: `apps/api` runs on Node 20 / Alpine.
2. **Next.js Vercel**: `apps/web` deploys statically where possible, maintaining zero AI business logic.
3. **Database**: Managed Supabase PostgreSQL with PgBouncer.
