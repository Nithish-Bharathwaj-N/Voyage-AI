# 78. Performance

Key optimizations in Sprint 5E:
- **Slice selectors** on the Zustand store (`useSelectedActivityIds`, `useActiveMapActivityId`) ensure components only re-render when the specific slice they care about changes.
- **`getActivitiesWithCoordinates`** prevents `MapCanvas` from attempting to render markers for activities with no GPS data.
- **`useSuspenseQuery`** in `PlannerCanvas` eliminates the need for client-side loading state, as the data is ready before the component renders.
- **`useCallback`** on all event handlers in `MapCanvas` prevents child re-renders on every parent render cycle.
