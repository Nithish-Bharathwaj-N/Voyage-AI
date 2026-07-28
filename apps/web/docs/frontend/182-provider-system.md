# 182 - Provider System

The `AIProvider` interface abstracts away the underlying LLM API. 

Capabilities defined:
- `supportsStreaming`
- `supportsVision`
- `supportsTools`
- `maxTokens`

In Sprint 11A, we use `MockProvider` which simulates network latency, artificial typing delays, and streams a predefined Markdown string in chunks to test the orchestrator and UI layers without incurring API costs.
