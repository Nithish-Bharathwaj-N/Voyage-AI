# 214 - Streaming Architecture

Instead of Server-Sent Events (SSE) which has limited bidirectional support, we utilize **Socket.IO** (`AIGateway`).

1. Frontend hooks into `socket.on('stream_token')`.
2. Backend calls `orchestrator.executeStream(..., (token) => client.emit('stream_token', token))`.
3. The chunking allows partial JSON parsing on the frontend in the future.
