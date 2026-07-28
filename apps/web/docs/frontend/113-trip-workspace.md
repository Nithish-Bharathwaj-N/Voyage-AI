# 113 — Trip Workspace

## TripsWorkspace State
All workspace state lives exclusively in `TripsWorkspace`. Child components
receive it via props. No prop drilling beyond one level.

| State | Type | Description |
|---|---|---|
| activeTab | TripTab | Currently visible tab |
| viewMode | TripViewMode | Grid / List / Timeline |
| sort | TripSortKey | Sort order |
| filter | TripFilter | Applied attribute filters |
| searchQuery | string | Inline text filter |
| selection | TripsSelectionState | From useTripsSelection hook |

## Layout
1. TripToolbar — title + search + import + create
2. StatisticsBar — 4 animated stat cards
3. TripsTabBar — spring-underline tab nav
4. FilterBar — inline search, status chips, sort, view toggle, active filters
5. Content area — AnimatePresence grid/list/timeline
6. BulkActionBar — fixed bottom spring-in overlay (when selection > 0)
