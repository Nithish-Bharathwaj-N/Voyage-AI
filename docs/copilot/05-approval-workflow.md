# 05. Approval Workflow

The most critical UX pattern in VoyageAI.

## The State Machine
1. `IDLE`: User is typing.
2. `STREAMING_REASONING`: The UI is appending markdown text.
3. `AWAITING_APPROVAL`: The UI pauses. The `PlannerDiff` overlay covers the chat. Two buttons appear: **Approve Changes** (Primary) or **Reject & Explain** (Secondary).
4. `EXECUTING`: If approved, the commands are serialized and dispatched to `usePlannerStore`.
5. `IDLE`: The chat resumes, and the AI acknowledges the successful execution.

If the user clicks **Reject**, an automatic prompt is sent: `"User rejected the command. Please provide alternatives."`
