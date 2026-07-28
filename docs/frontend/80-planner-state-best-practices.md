# 80. Planner State Best Practices

1. **Never import mock data in components.** All mock fallbacks live exclusively in `plannerMock.ts`, accessed only via `PlannerRepository`.
2. **Never duplicate server data in Zustand.** If it came from an API, it lives in TanStack Query cache. If it's transient UI preference, it lives in the Zustand store.
3. **Use slice selectors.** Always prefer `useActiveMapActivityId()` over `usePlannerUIStore((s) => s)`. Selecting the full store causes unnecessary re-renders.
