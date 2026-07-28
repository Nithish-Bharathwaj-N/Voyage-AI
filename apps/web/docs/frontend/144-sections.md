# 144 - Feature Sections

Destinations contain several lists of point-of-interest (POI) data.
- `AttractionsList`
- `HotelsList`
- `RestaurantsList`

Each section operates on a similar architectural pattern: 
1. Check if the array exists on `destination` and is not empty. If empty, return `null`.
2. Display a section header with an anchor ID matching the sticky tab.
3. Render a grid of stylized cards.
