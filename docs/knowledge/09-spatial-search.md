# 09. Spatial Search

The Knowledge Engine relies on PostGIS (via `@voyageai/db`) to perform complex spatial queries.

## Capabilities
1. **Radius Search**: `ST_DWithin(geom, ST_MakePoint(lng, lat)::geography, radius)`
2. **Bounding Box**: Used for Map-driven queries (e.g. "Search this area").
3. **Distance Calculation**: `ST_Distance` is used to rank results by proximity.

## Boundary Enforcement
No raw SQL exists in the Knowledge Engine. It calls `DestinationRepository.findPlacesWithinPolygon(polygon)`. The Database Layer executes the PostGIS magic.
