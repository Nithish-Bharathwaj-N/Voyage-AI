# 12. Future AI Integration

Once the Knowledge Engine is completely stable and deterministic, it becomes the ultimate tool for the LLM.

## Model Context Protocol (MCP)
In the future, we will expose the Knowledge Engine's Use Cases as MCP tools:
- `mcp_search_places(destination_id, category, context)`
- `mcp_get_weather(destination_id)`

The AI (Gemini) will act as an orchestrator, reasoning over user prompts ("I want a quiet, romantic dinner in Paris") by invoking the Knowledge Engine, and passing the resulting deterministic graph nodes back to the User Interface. The AI itself holds NO travel knowledge.
