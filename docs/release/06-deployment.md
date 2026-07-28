# 06. Deployment

VoyageAI utilizes a containerized infrastructure for seamless scaling.

## Architecture
1. **Frontend**: Vercel (Next.js Edge runtime for streaming).
2. **Backend**: AWS Fargate / Google Cloud Run (Dockerized NestJS apps).
3. **Database**: Managed PostgreSQL (e.g. Supabase, AWS RDS) with PostGIS extension enabled.
4. **Cache**: Redis Cluster (ElastiCache).

## CI/CD Pipeline
- **GitHub Actions**: Runs on every PR.
- **Jobs**: `Lint` -> `Typecheck` -> `Test (Unit)` -> `Test (E2E)`.
- If tests pass, a preview environment is deployed. Merging to `main` deploys to Production.
