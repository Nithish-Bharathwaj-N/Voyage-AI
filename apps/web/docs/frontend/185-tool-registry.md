# 185 - Tool Registry

The `ToolRegistry` defines what the AI can *do*.
For example, `SearchTool` describes its parameters to the LLM. 
When the LLM requests a tool call, the Orchestrator validates the arguments against the Registry and executes the function locally, appending the result as a 'Tool' message before resuming the LLM stream.
