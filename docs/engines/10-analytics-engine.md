# 10. Analytics Engine Architecture

## Responsibility
Processes system-wide events to identify trends (e.g., "Tokyo is trending this week").

## Use Cases
- `AggregateDestinationTrendsUseCase`
- `TrackSearchQueryUseCase`

## Dependency Injection
Requires:
- `EventSubscriber` (Listens for `SearchExecutedEvent` and `TripCreatedEvent`).
- `CacheClient` (To store cached trending arrays).
