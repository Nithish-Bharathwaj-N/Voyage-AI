# 59. Rendering Strategy

The `PlannerCanvas` operates as an async Server Component. It fetches the `timelineService.getItinerary()` data on the server, ensuring that the initial load of the timeline requires zero client-side fetching.
We utilize Next.js `Suspense` boundaries with a `TimelineSkeleton` fallback to provide immediate visual feedback during the mock network latency.
