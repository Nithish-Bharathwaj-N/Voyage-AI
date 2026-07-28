# 74. Store Architecture

The Zustand `plannerUIStore` owns **exclusively UI state**: selection, zoom level, expanded day panels, and the active map activity ID.
It deliberately never stores itinerary or trip data — that is TanStack Query's domain.
This split ensures the store stays tiny (< 20KB), avoids stale data issues, and makes it trivial to reset all UI state on navigation.
