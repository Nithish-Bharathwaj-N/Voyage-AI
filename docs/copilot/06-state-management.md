# 06. State Management

The Copilot introduces ephemeral UI state that must not pollute the global Planner state.

## useCopilotStore
This Zustand store is responsible for:
1. `messages[]`: The active conversation.
2. `isStreaming`: Boolean flag for the markdown stream.
3. `pendingCommands[]`: The JSON commands waiting for approval.
4. `copilotStatus`: `IDLE | STREAMING | AWAITING_APPROVAL | ERROR`.

## Strict Separation
`useCopilotStore` is NOT allowed to import or mutate `usePlannerStore`. 
When the user clicks "Approve", the component layer explicitly calls `usePlannerStore.getState().executeCommands(pendingCommands)` and then calls `useCopilotStore.getState().clearPending()`.
