# 189 - Performance Optimizations

1. **Memoization**: `usePrompt` memoizes the template.
2. **Optimistic Updates**: The UI instantly shows the User message and a Typing Indicator before the network request begins.
3. **Decoupled State**: The streaming chunks bypass React state in the global store and are handled via localized chunk accumulators to prevent excessive re-renders of the entire layout.
