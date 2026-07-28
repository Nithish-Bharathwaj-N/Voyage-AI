# 213 - Provider Integration

## ProviderFactory
Abstracts the underlying LLM logic. Dynamically tests `provider.health()` and falls back sequentially:
1. Requested Provider (e.g., `openai`)
2. `gemini`
3. `anthropic`

## Interface
```typescript
interface AIProvider {
  chat(prompt: string, context?: any): Promise<string>;
  stream(prompt: string, onToken: (token: string) => void): Promise<void>;
  health(): Promise<boolean>;
  modelMetadata(): any;
}
```
