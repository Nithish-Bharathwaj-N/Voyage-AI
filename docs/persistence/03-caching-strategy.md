# 03. Caching Strategy (Redis)

To protect the PostgreSQL database from the heavy load of LLM context-gathering and rapid UI rendering, we implement strict caching boundaries using Redis.

## 1. Session Cache
- **Scope:** Transient UI states (`PlannerState`).
- **TTL:** 24 Hours.
- **Rationale:** When a user is building a trip and adjusting the prompt, we don't save to Postgres until they hit "Save Draft". The transient JSON state lives entirely in Redis.

## 2. Knowledge Cache
- **Scope:** Frequently accessed Destination and Place data (e.g., `GET /destinations/paris`).
- **TTL:** 7 Days (Invalidated explicitly via `DomainEvent` if data changes).
- **Rationale:** Travel data is highly static. Caching it reduces latency from 150ms (DB) to <5ms (Redis).

## 3. External API Cache (Weather)
- **Scope:** Third-party weather forecasts.
- **TTL:** 1 Hour.
- **Rationale:** Prevents blowing past third-party API rate limits if multiple users search for the same destination.

## 4. Rate Limiting
- **Scope:** API Gateways (specifically `/api/planner/generate`).
- **TTL:** 1 Minute rolling window.
- **Rationale:** Prevents financial abuse of the LLM endpoints.
