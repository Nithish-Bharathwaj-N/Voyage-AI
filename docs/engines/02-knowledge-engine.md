# 02. Knowledge Engine Architecture

## Responsibility
Acts as the read-heavy graph traversal layer. This engine sits on top of the Database repositories and Redis cache to resolve semantic queries into hard Data Points (`Place` and `Destination`).

## Use Cases
- `FindPlacesNearCoordinateUseCase`
- `ResolveDestinationByNameUseCase`
- `FindSimilarPlacesUseCase`

## Strategies
- **`CacheFirstTraversalStrategy`**: Always attempts to load a `Destination` cluster from `@voyageai/cache` before falling back to PostgreSQL.
- **`GeographicRadiusStrategy`**: Wraps the PostGIS raw SQL query for finding `near` nodes.

## Rules
- **No Hallucinations**: If a Place doesn't exist in the Knowledge Graph, it cannot be returned to the Planner Engine, preventing the AI from routing a user to a fake restaurant.

## Dependency Injection
Requires:
- `DestinationRepository`
- `CacheClient` (Infrastructure)
