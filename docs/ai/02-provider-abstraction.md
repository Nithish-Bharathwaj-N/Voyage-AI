# 02. Provider Abstraction

The orchestrator must never couple directly to an LLM SDK (like `@google/genai` or `openai`).

## IModelProvider Interface
We expose an internal interface:
```typescript
interface IModelProvider {
  executePrompt(prompt: string, context: Context, tools: Tool[]): Promise<ModelResponse>;
}
```

## Implementations
- `GeminiProvider`: The primary workhorse.
- `OpenAIProvider`: Fallback/comparison model.
- `ClaudeProvider`: Alternative model.

By abstracting the provider, we can route simple requests to cheap models (e.g. Gemini Flash) and complex reasoning tasks to heavy models (e.g. Gemini Pro).
