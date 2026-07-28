# 215 - Database Design

Prisma (`packages/db`) manages the SQL schema:
- **Conversation**: Ties a user and a trip to an ongoing dialog.
- **Message**: JSON blobs for actions, citations, and the raw markdown.
- **TripVersion**: Optimistic locking history. Every Undo/Redo is tracked here.
- **AIUsage / ProviderMetrics**: Telemetry for latencies and token counts.
