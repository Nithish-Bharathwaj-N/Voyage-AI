# 196 - Tool Execution

The `trip-planner` prompt explicitly allows the `WeatherTool` and `SearchTool`.
The `ToolPlanner` in the AI Execution Pipeline parses this allowed list and fetches their schemas from the `ToolRegistry`, sending them as part of the tool array to the `MockProvider`.
