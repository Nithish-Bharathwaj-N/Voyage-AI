# 08. AI Domain

The AI in VoyageAI is strictly confined to a specific domain boundary. It acts as an Orchestrator and Reasoner, but it **never owns the truth**.

## AI Entities

- **ConversationMemory**
  - *Purpose:* Stores the chat history (User <-> System) within a specific PlannerSession.
  - *Constraints:* Must be pruned or summarized if context windows exceed limits.

- **ExtractedIntent**
  - *Purpose:* The structured JSON output of the LLM analyzing user text.
  - *Attributes:* `action` (e.g., CreateTrip, ModifyBudget, AddRestaurant), `confidenceScore`.

- **ExtractedEntity**
  - *Purpose:* Parameters pulled from text.
  - *Attributes:* `targetDestination`, `budgetLevel`, `partySize`.

- **PlannerAction**
  - *Purpose:* The deterministic command generated after Intent validation. E.g., if `ExtractedIntent` is valid, emit a `PlannerAction.SearchGraph(destination="Paris")`.

- **AIReasoningResult**
  - *Purpose:* The final payload assembled by Gemini after it reviews the Knowledge Graph data. This payload is typed strictly to match the UI state.

## AI Workflow (The Orchestration Loop)

1. **Input:** User sends a natural language message.
2. **Intent Extraction:** LLM parses intent (e.g., "Add a vegan place for lunch").
3. **Graph Query:** System queries Knowledge Graph for vegan restaurants near the morning activity.
4. **Synthesis:** System gives LLM the graph results. LLM picks the best one logically and returns a structured `AIReasoningResult`.
5. **Validation:** System runs Zod schemas against the result. If valid, UI updates. If invalid, System auto-prompts LLM to fix the schema.

*This isolates the non-deterministic nature of AI behind strict deterministic API boundaries.*
