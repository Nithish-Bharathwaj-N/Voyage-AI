# 08. Error Handling

AI generation is inherently flaky. The UX must elegantly recover from failures.

## Scenarios
- **Stream Interruption**: If the POST request drops, the UI displays a "Connection lost. Retry?" button attached to the last message.
- **Validation Failure**: If the AI attempts to violate a budget rule, the backend intercepts it. The stream outputs: "I attempted to add that, but it exceeds your daily budget constraint. Would you like me to find a cheaper alternative?"
- **Model Unavailable**: Global error toast with a graceful degradation suggesting manual planner edits.
