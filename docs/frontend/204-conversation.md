# 204 - Conversation Lifecycle

The lifecycle follows strict Workflow events emitted to the UI:
1. `VALIDATING`
2. `LOADING_CONTEXT`
3. `EXECUTING_AI`
4. `STREAMING`
5. `VALIDATING_OUTPUT`
6. `SAVING`
7. `COMPLETED`
8. `FAILED`

The UI maps `COMPLETED` and `FAILED` to free the input box, and intermediate states trigger the `TypingIndicator`.
