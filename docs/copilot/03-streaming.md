# 03. Streaming Protocol

VoyageAI utilizes the **Web Streams API** (`ReadableStream`) over standard HTTP POST.

## Why POST Streams instead of SSE?
Server-Sent Events (SSE) via `EventSource` only support HTTP GET requests. Because our `ContextBuilder` requires us to send the entire `PlannerTripState` (which can be huge) to the server for LLM context, we must use POST.

## Payload Parsing
The stream multiplexes two data types:
1. **Text Chunks**: The conversational reasoning (e.g. `{"type": "text", "content": "I found a great hotel..."}`).
2. **Command Payloads**: The final executable JSON (e.g. `{"type": "commands", "data": [{...}]}`).

The frontend uses an async iterator to decode the `Uint8Array` stream, updating `useCopilotStore` in real-time.
