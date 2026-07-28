# 120 — Trips Best Practices

## DO
- Import from `TripCardDispatcher` — never individual card files directly
- Use `useTrips()` hook — never call `tripRepository` in components
- Keep workspace state in `TripsWorkspace` only
- Use `tripSelectors` for any derived data
- Add `React.memo` to every new card or list item component
- Use `useCallback` for all event handlers passed to cards

## DON'T
- Don't filter/sort in component render — use selectors
- Don't call `tripRepository` directly from components
- Don't add trip state to Zustand — TanStack Query is the cache
- Don't create inline date formatting — use the fmtDate helpers in TripCards
- Don't define new TripStatus values — extend trips.types.ts instead

## Adding a New Card Variant
1. Create `NewCard.tsx` in `components/trips/cards/`
2. Add `'new-variant'` to `TripCardVariant` union in `trips.types.ts`
3. Add case to `TripCardDispatcher`
4. Update `resolveVariant()` in `TripsWorkspace` if needed
