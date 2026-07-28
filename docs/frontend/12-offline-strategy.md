# 12. Offline Strategy

Travelers frequently lose service. The frontend must gracefully degrade.

## Implementation
1. **Service Workers**: We will use `next-pwa` to cache the application shell.
2. **Offline Data**: When a user marks a Trip as "Saved for Offline", the JSON payload is dumped into `IndexedDB`.
3. **Map Caching**: Mapbox tiles will be pre-fetched for the Trip's bounding box and stored in cache.
4. **Read-Only Mode**: If `navigator.onLine` is false, the UI blocks mutations (cannot add places) but allows full reading of the itinerary.
