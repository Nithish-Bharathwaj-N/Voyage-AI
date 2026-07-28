# 04. Map Synchronization

The map uses `react-map-gl` and is treated as a presentation layer of `usePlannerStore`.

## Synchronization Flow
- **Hover Activity in Timeline**: Dispatch `setHoveredActivityId(id)`. The Map component renders a `<Popup>` or increases marker size at the activity's coordinates.
- **Click Map Marker**: Dispatch `setSelectedActivityId(id)`. The Timeline component uses `Element.scrollIntoView()` to automatically scroll to the card.

## Route Animations
The active day's activities are connected by a GeoJSON `LineString`. We use Framer Motion or CSS transitions to animate the line drawing.
