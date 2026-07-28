# 208 - Performance Optimizations

- **MessageReducer**: Caps the array slice before JSON stringification to protect browser heap and LLM tokens.
- **Scroll Management**: The `page.tsx` uses `scrollIntoView` gracefully rather than forcing full DOM repaints on every stream chunk.
- **Session Caching**: `AssistantRepository` holds sessions in a memory map so routing away and back does not destroy the chat.
