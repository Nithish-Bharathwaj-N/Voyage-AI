# 02. API Matrix

All endpoints must be RESTful and authenticated via JWT.

| Domain | Endpoint | Method | Payload | Responsibility |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `/api/auth/session` | GET | None | Retrieves user context |
| **Planner** | `/api/trips/:id` | GET | None | Loads full trip timeline |
| **Planner** | `/api/trips/:id/commands` | POST | `Command[]` | Executes AI or User commands |
| **Knowledge** | `/api/knowledge/search` | POST | `SearchQuery` | PostGIS spatial queries |
| **Copilot** | `/api/copilot/stream` | POST | `TripState`, `Msg` | Returns `ReadableStream` |
