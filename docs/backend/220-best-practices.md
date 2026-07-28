# 220 - Best Practices

- **Zero `any`**: All WebSockets strongly type their payloads.
- **Resilience**: The Factory pattern ensures that if OpenAI goes down, Anthropic takes over.
- **Clean Architecture**: `PlannerAIService` doesn't know about WebSockets; it only takes a `onStreamToken` callback. The Controller/Gateway handles transport.
