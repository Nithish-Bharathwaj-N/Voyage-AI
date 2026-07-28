# 75. Selectors

Selectors in `plannerSelectors.ts` are pure functions that take raw query data and return derived views.
They are called with `useMemo()` in components to avoid re-computing on every render.
Key selectors: `getActivitiesByDay`, `getActivitiesWithCoordinates` (used by MapCanvas to render only geocoded markers), `getTripSummary`, `getBudgetSummary`.
