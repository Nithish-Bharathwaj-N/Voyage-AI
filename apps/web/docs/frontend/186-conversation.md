# 186 - Conversation Architecture

Conversations are managed by `ConversationManager` and cached in `ConversationCache`.
A `Conversation` contains an array of `AIMessage` objects.

Message statuses flow through:
`idle` -> `thinking` -> `calling_tools` -> `streaming` -> `completed`
