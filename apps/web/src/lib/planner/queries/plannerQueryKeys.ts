// ============================================================
// Planner Query Keys
// Stable, hierarchical key factories for TanStack Query.
// Changing any of these keys triggers automatic cache invalidation.
// ============================================================

export const plannerKeys = {
  all: ['planner'] as const,

  trips: () => [...plannerKeys.all, 'trips'] as const,
  trip: (tripId: string) => [...plannerKeys.trips(), tripId] as const,

  itineraries: () => [...plannerKeys.all, 'itineraries'] as const,
  itinerary: (tripId: string) => [...plannerKeys.itineraries(), tripId] as const,

  activities: () => [...plannerKeys.all, 'activities'] as const,
  activitiesByDay: (dayId: string) => [...plannerKeys.activities(), 'day', dayId] as const,

  destinations: () => [...plannerKeys.all, 'destinations'] as const,
  destinationsByTrip: (tripId: string) => [...plannerKeys.destinations(), tripId] as const,

  summary: (tripId: string) => [...plannerKeys.all, 'summary', tripId] as const,
} as const;
