# 156 - Performance Optimizations

- **Framer Motion**: The `CollectionsGrid` uses `<AnimatePresence>` for smooth mounting of collections, staggering the animations by index to prevent jank.
- **Skeletons**: Comprehensive skeletons (`CollectionsGridSkeleton` and `CollectionDetailSkeleton`) map perfectly to the loaded state, avoiding layout shifts.
- **Images**: Next.js `Image` components are used for all cover photos, ensuring WebP compression.
