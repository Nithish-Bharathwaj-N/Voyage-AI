# 201 - Conversational Assistant Architecture

The Conversational AI Travel Assistant extends the existing Domain AI and Workflow layers to allow multi-turn, stateful dialogue that can proactively modify `AITripPlan` objects.

## Core Modules
- **AssistantWorkflow**: The main orchestrator connecting User Inputs -> Context -> Command Parser -> Action Dispatcher -> LLM -> Response Composer.
- **ConversationMemory**: Short-term sliding window of AssistantMessages.
- **MessageReducer**: Compresses or truncates history to prevent blowing out the context window.
- **AssistantSession**: Manages `planHistory` array enabling Undo/Redo operations without regenerating from scratch.

## Data Flow
1. User sends message -> `AssistantChatPage`
2. Message sent to `AssistantWorkflow.execute()`
3. State emits `LOADING_CONTEXT`
4. `CommandParser` extracts intent (e.g. `UpdateBudget`)
5. `ActionDispatcher` mutates current `AITripPlan` and returns actions
6. State emits `EXECUTING_AI`
7. `AssistantAIService` sends payload to `AIOrchestrator`
8. `ResponseComposer` packages raw text, actions, and follow-ups.
