# 77. Error Handling

Errors are handled at three levels:
1. **Repository**: `withFallback()` catches network errors and returns mocked data silently.
2. **Query**: TanStack Query retries 2 times before setting `isError: true`.
3. **React**: `PlannerErrorBoundary` (a class component) catches render errors and displays a user-friendly "Try Again" screen.

The Suspense fallback (`TimelineSkeleton`) handles the loading state, so no manual `isLoading` checks are needed in `PlannerCanvas`.
