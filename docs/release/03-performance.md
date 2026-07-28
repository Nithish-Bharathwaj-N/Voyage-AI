# 03. Performance

## Metrics
- **LCP (Largest Contentful Paint)**: < 1.2s for the Planner Workspace.
- **API Latency**: < 50ms for DB reads via Redis caching.
- **AI TTFB (Time to First Byte)**: < 800ms for streaming markdown responses.

## Optimization Strategies
1. **PostGIS Indexing**: GiST indexes on spatial columns to ensure instant nearby location lookups.
2. **Context Compression**: Stripping heavy descriptions out of the Planner State before passing to the AI Orchestrator to save tokens.
3. **Optimistic UI**: TanStack query immediately mutates the frontend timeline when a command is approved, while the backend syncs in the background.
