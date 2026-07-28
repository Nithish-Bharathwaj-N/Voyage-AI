# 86. Performance Audit

Optimizations applied in Sprint 5F:

| Component | Optimization |
|---|---|
| `DaySection` | Wrapped in `React.memo` — no re-renders when sibling cards are selected |
| `ActivityCardRenderer` | Wrapped in `React.memo` — stable identity preserves virtual DOM |
| `TimeOfDaySection` | Wrapped in `React.memo` |
| `MapCanvas` marker handlers | `useCallback` on `handleMarkerClick` and `handlePopupClose` |
| Command Palette results | `useMemo` on filtered results and grouped display |
| Zustand subscriptions | Slice selectors (`useSelectedActivityIds`) only trigger re-renders on their specific slice |

**Remaining work**: Virtualization of the timeline for itineraries > 100 activities (Sprint 5G). Recommended library: `@tanstack/react-virtual`.
