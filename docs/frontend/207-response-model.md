# 207 - Response Model

The `AssistantResponse` ensures the LLM never returns naked markdown.
```typescript
export interface AssistantResponse {
  message: string;
  updatedTripPlan?: Partial<AITripPlan>;
  actions?: AssistantAction[];
  followUps?: string[];
  citations?: string[];
  metadata?: Record<string, unknown>;
}
```
This structured payload ensures the UI can render rich interactive elements.
