# 07. Performance Review

*Auditor: Chief Software Architect*
*Objective: Predict bottlenecks and mandate optimization strategies.*

## Database (PostgreSQL) Bottlenecks
- **Risk:** Heavy read load on the Knowledge Graph for popular destinations (e.g., querying Paris attractions).
- **Mandate:** 
  1. Implement Redis caching for all immutable Knowledge Graph reads. A query for `GET /api/knowledge/destinations/paris/places` should hit Redis first.
  2. Mapbox vector tiles require fast geographic lookups. Ensure `Coordinates` use PostGIS `GEOMETRY` or `GEOGRAPHY` types with spatial indices (GiST).

## Frontend Map Rendering
- **Risk:** Rendering thousands of markers on Mapbox will cause the React thread to drop frames, feeling sluggish.
- **Mandate:** Do NOT render standard React DOM nodes for thousands of places. Use Mapbox's native WebGL `SymbolLayer` with GeoJSON sources for high-performance rendering.

## AI Generation Latency
- **Risk:** Waiting 15 seconds for a trip generation will cause user abandonment.
- **Mandate:** The `PlannerEngine` must yield Server-Sent Events (SSE). The frontend UI must use a skeleton layout that fills in block-by-block as the LLM streams the itinerary.

## Asset Delivery (Images)
- **Risk:** Fetching massive unsplash images will crush mobile bandwidth.
- **Mandate:** All `ImageReference` objects must resolve through an image CDN (e.g., Cloudinary or Next/Image) with strict size, quality, and WebP format enforcement.
