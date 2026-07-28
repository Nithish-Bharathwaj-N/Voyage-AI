# 111 — Trips Architecture

## Overview
The My Trips workspace lives at `/trips` inside the authenticated shell.
It follows the **repository → hooks → selectors → components** layered pattern
established in the Planner module. No component owns trip data.

## Layer Diagram
```
TripRepository (singleton)
   └── withFallback() → API call || typed mock
TripQueryKeys (stable cache keys)
   └── TanStack Query hooks (useTrips, useTripStatistics)
        └── tripSelectors (pure fns — filterByTab, filterTrips, sortTrips, searchTrips)
             └── TripsWorkspace (orchestrator — all state lives here)
                  └── UI components (prop-driven, no internal data fetch)
```

## Key Files
| Path | Role |
|---|---|
| lib/trips/types/trips.types.ts | Canonical types |
| lib/trips/services/tripsMock.ts | 12 mock WorkspaceTrips |
| lib/trips/repository/TripRepository.ts | Singleton API facade |
| lib/trips/queries/tripQueryKeys.ts | TanStack Query key factory |
| lib/trips/hooks/useTrips.ts | List hook |
| lib/trips/hooks/useTripStatistics.ts | Stats hook |
| lib/trips/hooks/useTripsSelection.ts | Selection model |
| lib/trips/selectors/tripSelectors.ts | Pure filter/sort/search fns |
| components/trips/TripsWorkspace.tsx | Orchestrator |
| app/(app)/trips/page.tsx | Route |
