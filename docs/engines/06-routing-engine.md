# 06. Routing Engine Architecture

## Responsibility
Solves the Traveling Salesperson Problem (TSP) for daily itineraries. Ensures users are not zig-zagging across a city to hit three attractions.

## Use Cases
- `OptimizeDayRouteUseCase`
- `CalculateTransitTimeUseCase`

## Strategies
- **`WalkingDistanceStrategy`**: Used if distance < 2km.
- **`TransitStrategy`**: Default for urban destinations (Paris, Tokyo).

## Rules
- The `PlannerEngine` generates the places for a day. The `RoutingEngine` receives those places, rearranges their `orderIndex`, and injects transit `Activity` nodes between them.

## Dependency Injection
Requires:
- `HttpClient` (to hit Mapbox / Google Maps Distance Matrix API).
- `CacheClient` (to cache matrix results and save API costs).
