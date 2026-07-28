# 210 - Best Practices

- **Zero `any`**: Strict TypeScript typings for all actions and contexts.
- **Immutability**: `ActionDispatcher` performs `JSON.parse(JSON.stringify(currentPlan))` to ensure the state history isn't accidentally mutated by reference.
- **Decoupled Business Logic**: `AssistantAIService` handles the pure AI request, while `AssistantWorkflow` orchestrates the DB fetch (mock) and Session updates.
