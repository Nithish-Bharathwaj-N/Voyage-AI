# 136 - Performance

- **Caching**: `useTrip` has a `staleTime` of 5 minutes. Navigating back and forth from the Workspace to the Details page is instant.
- **Skeletons**: `TripDetailsSkeleton` mimics the complex grid exactly, preventing layout shift while the data loads.
- **Images**: `TripHero` uses `next/image` with `priority=true` to load the LCP cover image as fast as possible.
