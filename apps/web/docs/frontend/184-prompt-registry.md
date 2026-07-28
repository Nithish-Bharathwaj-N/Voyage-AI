# 184 - Prompt Registry

Instead of hardcoding system prompts in components, they are registered in the `PromptRegistry`.
Domains: `planner`, `destination`, `budget`, `general`, etc.

Each prompt defines:
- `systemPrompt` (The base instructions)
- `variables` (What the ContextBuilder needs to inject)
- `allowedTools` (e.g. `['SearchTool', 'WeatherTool']`)
