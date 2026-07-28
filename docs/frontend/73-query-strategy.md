# 73. Query Strategy

We use `@tanstack/react-query` with hierarchical key factories (`plannerKeys`).
Suspense-mode hooks (`usePlannerSuspense`) are used inside `<Suspense>` boundaries, replacing the need for manual loading state management.
Data is considered stale after 5 minutes. The cache is retained for 30 minutes (`gcTime`), so navigating away and back doesn't trigger a refetch if data is still fresh.
