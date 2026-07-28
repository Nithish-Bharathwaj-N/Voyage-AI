# 205 - Version History (Undo / Redo)

Instead of mutating a single `AITripPlan`, the `AssistantSession` maintains:
- `planHistory: AITripPlan[]`
- `historyIndex: number`

When `ActionDispatcher` yields a new plan:
- Any forward history (from previous undo steps) is truncated.
- The new plan is pushed.
- The `historyIndex` is incremented.

This enables deep time-travel within the conversational session.
