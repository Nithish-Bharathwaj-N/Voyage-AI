# 152 - Card System & Dispatcher

Collections accommodate heterogeneous data (Destinations, Trips, Hotels, etc.).

## CollectionCard
The `CollectionCard` represents a folder/collection itself. It features:
- Privacy Badges (Public, Shared, Private).
- Indicator badges (Pinned, Favorited).
- Item Count overlay.

## SavedItemDispatcher
The `SavedItemDispatcher` is a switchboard component that takes a polymorphic `SavedItem` object and dynamically renders the appropriate sub-component:
- `DestinationItemCard`
- `TripItemCard`
- `HotelItemCard`
- `RestaurantItemCard`
- `ActivityItemCard`

This isolates the UI complexity of rendering a Hotel (with a price level) vs. a Trip (with a date range).
