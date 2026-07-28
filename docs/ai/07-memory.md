# 07. Memory

The Orchestrator maintains state across the conversation.

## Scopes
- **Trip Scope**: Memory is strictly bound to `tripId`. The AI cannot remember a conversation from a different trip.
- **Short-term**: The actual chat messages (persisted in Redis/PostgreSQL).
- **Long-term**: The `PreferenceEngine` persists implicit user traits learned during chat (e.g. "I prefer luxury hotels") into the `User` profile.

## Summarization
To prevent blowing out the LLM context limit on long planning sessions, the memory module periodically summarizes older messages into a dense context block.
