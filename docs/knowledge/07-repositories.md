# 07. Repositories

The Knowledge Engine must store its own persistent nodes in PostgreSQL to reduce API costs and improve speed.

## Implementations
- `DestinationRepository`
- `PlaceRepository`
- `WeatherRepository`
- `RouteRepository`

## Constraint
These repositories belong to `packages/db`. They execute raw SQL if necessary (e.g. PostGIS operations). The Knowledge Engine imports these interfaces but never references `PrismaClient` directly.
