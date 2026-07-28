# 140 - Best Practices

- **Dumb Cards**: Never let a card fetch its own data. Always pass `trip: WorkspaceTrip` to ensure synchronous, flicker-free rendering of the whole dashboard.
- **Graceful Fallbacks**: If `trip.coverImageUrl` is missing, the Hero must display a beautiful gradient fallback.
- **Safe Routing**: Handle cases where `tripId` does not exist gracefully. `page.tsx` returns a "Trip Not Found" error state if `!trip`.
