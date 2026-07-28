# 212 - API Design

## REST Controllers
- `POST /v1/ai/planner/generate`: Kicks off synchronous generation.
- `POST /v1/ai/assistant/chat`: Processes an assistant message statefully.

## WebSockets
- **Namespace**: `/ai`
- **Events (Listen)**: `generate_plan`, `assistant_chat`
- **Events (Emit)**: `workflow_event`, `stream_token`, `plan_completed`, `chat_completed`, `workflow_error`
