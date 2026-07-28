# 116 — Performance

## Techniques Applied
| Technique | Component |
|---|---|
| React.memo | All card variants, TripStatusBadge, TripProgressBar |
| useCallback | handleFilterChange, handleClearFilter, handleClearAll, handleQuickAction |
| useMemo | displayedTrips (search result), tabCounts (badge counts) |
| TanStack Query stale/gc | 10min stale / 60min gc for list and statistics |
| next/image lazy loading | All cover images |
| AnimatePresence lazy mount | BulkActionBar, content area transitions |
| Virtualization-ready | Grid uses flat array — swap to @tanstack/virtual |

## Date Formatting
Uses native `Intl.DateTimeFormat` instead of date-fns to keep bundle small.
No new dependencies added in this sprint.
