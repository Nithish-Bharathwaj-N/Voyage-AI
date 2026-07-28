# Performance Optimizations (97)

Details image optimizations, React rendering strategies, and lazy loading configurations.

## Image Optimizations
- **Next.js Image**: All card images use `<Image fill sizes="..." />` to prevent layout shifts (CLS) and ensure optimized responsive sizes are downloaded based on screen width.
- **Priority Loading**: Hero banner images in active viewports use `priority` flag to speed up Largest Contentful Paint (LCP) times.

## Render Optimizations
- **Debounced Input**: Search keystrokes are debounced for 400ms to prevent duplicate repository requests on every character typed.
- **Memoized Callbacks**: Main page uses `useCallback` for `fetchDestinations` to prevent unnecessary component refetches.
