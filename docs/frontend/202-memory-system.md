# 202 - Memory System

## ConversationMemory
Stores `AssistantMessage` objects in a bounded array.
Provides `getAllMessages()` and `getRecentMessages(limit)` methods.

## ConversationContext
Maintains real-time state:
- `activeTripPlan`
- `currentIntent`
- `currentBudget`
- `currentWeather`

## MessageReducer
Optimizes the payload sent to the LLM by removing unnecessary system tokens, filtering old messages, and eventually token-compressing long exchanges.
