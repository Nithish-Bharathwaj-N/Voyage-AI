# 06. Validation

Never trust the AI. Every output must be rigorously validated before it touches the Planner.

## Validation Layers
1. **Schema Validation**: (Using Zod). Does the JSON match the expected Command schema?
2. **Entity Validation**: Does `placeId: "123"` actually exist in the Knowledge Engine? If not, the AI hallucinated it. Reject the command.
3. **Logic Validation**: Did the AI schedule two activities at exactly 14:00? The Planner Engine rejects overlap conflicts.

## Fallback
If validation fails, the Orchestrator automatically re-prompts the LLM with the validation errors up to 2 times before giving up and returning a graceful error to the user.
