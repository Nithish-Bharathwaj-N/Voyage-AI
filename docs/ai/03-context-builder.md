# 03. Context Builder

The LLM is stateless. The `ContextBuilder` is responsible for injecting the absolute truth into the prompt.

## Context Layers
1. **Trip State**: The current day-by-day JSON payload.
2. **Knowledge Data**: "Available places: [A, B, C]" (Sourced from the Knowledge Engine).
3. **Preferences**: "User hates rain, budget is $1000".
4. **Conversation History**: The last 10 messages of the session.

## Compression
Because context windows are finite and expensive, the ContextBuilder strips unnecessary UI fields (like image URLs or lengthy descriptions) before injecting the JSON into the prompt context.
