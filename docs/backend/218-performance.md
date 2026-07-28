# 218 - Performance Optimizations

- **WebSocket Re-use**: TCP handshakes are eliminated during rapid Assistant modifications.
- **Redis (Pending Full Rollout)**: Built to cache `ContextBuilder` objects like "User Profile" or "Destinations" so AI Orchestrator doesn't wait on SQL joins.
