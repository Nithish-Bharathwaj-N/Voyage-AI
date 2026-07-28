# 10. Model Context Protocol (MCP) Roadmap

AI Agents (like Claude or future Gemini versions) will eventually need to read and write to the VoyageAI platform to act on behalf of the user.

## Exposing the Platform to Agents
Instead of agents interacting with our raw database or trying to guess REST endpoints, we will build an `apps/mcp-server`.
Because our core logic is isolated in `@voyageai/planner-engine` and `@voyageai/knowledge-engine`, the MCP server will simply map MCP Tools directly to our Application Layer commands.

- **MCP Tool `search_destination`** -> Calls `SearchDestinationQuery`
- **MCP Tool `add_activity`** -> Calls `ModifyTripCommand`

This ensures Agents respect the exact same business rules and budget constraints as a human using the frontend.
