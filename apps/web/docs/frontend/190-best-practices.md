# 190 - Best Practices

- **Zero 'any' Policy**: Every provider response, tool parameter, and context object is strictly typed in `lib/ai/types`.
- **Abstraction**: Never import `GeminiProvider` directly into a React component. Always use `useAI()` which uses `AIRepository` which uses `ProviderFactory`.
