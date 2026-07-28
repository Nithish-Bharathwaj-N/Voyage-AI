# 40. Dashboard Best Practices

1. **No Application State in Widgets**: Widgets like `TripCard` must remain pure presentational components. They accept a `trip: Trip` prop and render it. They do not fetch their own data.
2. **Handling Empty States**: `RecentTrips` handles its own empty state gracefully, rendering a dashed-border call-to-action box if the user has no trips, preventing a broken layout.
