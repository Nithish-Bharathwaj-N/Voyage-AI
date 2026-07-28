# 01. Planner Engine Architecture

## Responsibility
The Planner Engine is the heart of VoyageAI. It translates a user's intent into a physical `TripDraft` without directly fetching data from the database. It delegates data resolution to the Knowledge Engine and reasoning to the AI Provider.

## Use Cases
- `CreateTripDraftUseCase`
- `ModifyTripDraftUseCase`
- `ResolveIntentUseCase`

## Policies
- **`MaxActivitiesPerDayPolicy`**: Ensures no more than X activities are scheduled based on duration.
- **`PacingPolicy`**: Checks that travel times between activities in a DayPlan are realistic.

## AI Orchestration Rules
1. **Never Trust AI Directly**: AI output is strictly validated against the `@voyageai/validation` Zod schemas before returning.
2. **Context Slicing**: If a user says "Remove lunch on Day 2", the Planner Engine only passes the Day 2 slice of the Trip JSON to the LLM to save tokens and latency.

## Dependency Injection
Requires:
- `KnowledgeEngine`
- `AIService` (Infrastructure layer wrapper for Gemini)
