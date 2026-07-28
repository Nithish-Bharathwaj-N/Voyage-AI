# 146 - Performance Optimizations

- **Static Caching**: `useDestination` caches for 1 hour.
- **Skeletons**: `DestinationSkeleton` is heavily tailored to match the complex grid layout perfectly to prevent Cumulative Layout Shift (CLS).
- **Images**: `next/image` is used exclusively. The Hero image is marked with `priority=true` for LCP optimization, while gallery images are naturally lazy-loaded.
