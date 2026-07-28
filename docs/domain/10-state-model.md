# 10. Frontend State Model

The frontend state must be strictly modeled independent of React. We design it as a series of centralized stores.

## PlannerState (Transient)
- **Role:** Holds the live, un-saved data while the user builds a trip.
- **Fields:**
  - `sessionId`: uuid
  - `status`: 'idle' | 'generating' | 'error' | 'success'
  - `chatHistory`: Array of `Message`
  - `tripDraft`: Partial `Trip` object
  - `activeModals`: Map of open overlays

## MapState
- **Role:** Controls the Mapbox GL instance entirely decoupled from the Trip.
- **Fields:**
  - `viewport`: { latitude, longitude, zoom, pitch }
  - `markers`: Array of `GeoJSON` points (derived from `PlannerState` or `TripState`)
  - `activeMarkerId`: string | null (hover sync)
  - `routes`: Array of `GeoJSON` LineStrings

## UserState
- **Role:** Caches the authenticated user.
- **Fields:**
  - `isAuthenticated`: boolean
  - `tokens`: { access, refresh }
  - `profile`: `Profile` object

## ExploreState
- **Role:** Caches Knowledge Graph responses for fast browsing.
- **Fields:**
  - `currentDestination`: `Destination` object
  - `recommendedPlaces`: Array of `Place`
  - `weatherSnapshot`: `Weather` object
