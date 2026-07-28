# 11. Performance Analysis

The Knowledge Engine must return search results to the Planner in <100ms.

## Bottlenecks & Solutions
1. **External API Latency**: A Google Places API call can take 300ms.
   - *Solution*: Proactively fetch and cache destinations when a trip is created.
2. **Spatial Query CPU Load**: PostGIS `ST_DWithin` can be slow on massive datasets.
   - *Solution*: Ensure GiST indexes are applied to all `geometry` columns in PostgreSQL.
3. **Network Payload Size**: Sending a graph of 500 places to the frontend will freeze the UI.
   - *Solution*: The Engine MUST implement aggressive pagination and cursor-based loading for all arrays.
