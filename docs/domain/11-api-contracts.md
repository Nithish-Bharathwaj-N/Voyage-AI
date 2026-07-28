# 11. API Contracts

Contracts define how Bounded Contexts and Client apps interact. By defining the contracts upfront, frontend and backend can be developed in parallel.

## 1. Knowledge Graph API (Backend-Internal & Client-Facing)
- **`GET /api/knowledge/destinations/{id}`**
  - *Returns:* Destination Aggregate.
- **`GET /api/knowledge/destinations/{id}/places?type=Restaurant&vibe=Romantic`**
  - *Returns:* Array of Places.
- **`POST /api/knowledge/resolve`**
  - *Body:* Semantic text (e.g., "The big tower in Paris")
  - *Returns:* Exact matched Knowledge Node (Eiffel Tower).

## 2. Planner Engine API (Client-Facing)
- **`POST /api/planner/generate`**
  - *Body:* User context, dates, budget, natural language prompt.
  - *Returns:* Streamed JSON chunks of `TripDraft`.
- **`POST /api/planner/mutate`**
  - *Body:* Existing `TripDraft`, Instruction (e.g., "Make it cheaper").
  - *Returns:* Streamed JSON of modified `TripDraft`.

## 3. Trips API (Client-Facing)
- **`POST /api/trips`**
  - *Body:* `TripDraft`
  - *Returns:* Persisted `Trip` with Database UUIDs.
- **`PATCH /api/trips/{id}/dayplans/{dayId}/slots`**
  - *Body:* Reordering instructions for drag-and-drop.
  - *Returns:* Updated `DayPlan`.

## 4. Travel Services (Backend-Internal)
- **`GET /api/internal/weather?lat={lat}&lng={lng}&date={date}`**
  - *Returns:* Standardized `WeatherSnapshot`.
