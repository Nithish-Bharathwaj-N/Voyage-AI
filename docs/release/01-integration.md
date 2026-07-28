# 01. Integration Strategy

The VoyageAI V2 platform is a distributed monorepo. Integration relies on strict boundary enforcement between workspaces.

## The Pipeline
1. **Frontend (Next.js)**: Handles UI state via Zustand and data fetching via TanStack Query.
2. **API Layer (NestJS)**: The only layer authorized to expose HTTP endpoints. It acts as a lightweight router.
3. **Application Core**: `PlannerEngine` and `KnowledgeEngine` contain pure business logic.
4. **AI Orchestrator**: The translator sidecar. 
5. **Database (Prisma/PostGIS)**: The ultimate source of truth.

If the AI Orchestrator attempts to bypass the Planner Engine to hit Prisma directly, the architectural test suite will fail.
