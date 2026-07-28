# 04. Prompt System

Prompts are treated as versioned codebase artifacts, not scattered strings.

## Prompt Modules
- `TripGenerationPrompt`: Creates a new trip from scratch.
- `TripEditingPrompt`: Modifies an existing trip based on a command ("Swap day 1 with day 3").
- `RecommendationPrompt`: Explains *why* a Knowledge Engine result is good.
- `ConflictResolutionPrompt`: Fixes invalid user requests ("I want to ski in Paris in July").

## Versioning
Prompts must be tracked. E.g., `prompts/trip-generation.v2.txt`. This allows us to run A/B telemetry against prompt variations.
