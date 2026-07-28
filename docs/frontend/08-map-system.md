# 08. Map System (Mapbox GL)

The map is not a small widget; it is the primary canvas of the application.

## Integration
- **Library**: `react-map-gl` (Mapbox GL JS wrapper).
- **State**: The map's viewport (zoom, lat, lng) is synchronized with the `usePlannerStore`.

## Features
- **Marker Clustering**: Handled natively by Mapbox sources when viewing dense cities.
- **Route Animations**: Displaying the `RoutingEngine`'s TSP solution using animated GeoJSON LineStrings.
- **Synchronization**: Hovering an item in the `Timeline` list will trigger the Map to fly to that coordinate and bounce the marker.
