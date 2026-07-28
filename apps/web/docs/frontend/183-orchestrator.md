# 183 - AI Orchestrator

The `AIOrchestrator` handles the complex lifecycle of a message:
1. User submits query.
2. Orchestrator creates a 'User' message in `ConversationManager`.
3. Orchestrator creates a 'Thinking' placeholder 'Assistant' message.
4. It builds context via `ContextBuilder` (fetching user prefs, current trip ID, etc).
5. It triggers `provider.stream()`.
6. As chunks arrive via `StreamManager`, the 'Assistant' message updates its status to 'streaming' and appends content.
7. Upon completion, status becomes 'completed'.
