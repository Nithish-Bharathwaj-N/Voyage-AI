// ============================================================
// usePlanner — Primary hook for the Planner workspace
// Fetches the complete itinerary for a trip.
// Falls back to mock data if backend is unreachable.
// ============================================================

'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { plannerKeys } from '../queries/plannerQueryKeys';
import { plannerRepository } from '../repository/PlannerRepository';
import type { Itinerary } from '../types/planner.types';

interface UsePlannerOptions {
  suspense?: boolean;
}

export function usePlanner(tripId: string, options: UsePlannerOptions = {}) {
  return useQuery({
    queryKey: plannerKeys.itinerary(tripId),
    queryFn: () => plannerRepository.getItinerary(tripId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30,   // 30 minutes cache retention
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

// Suspense variant — use inside <Suspense> boundaries
export function usePlannerSuspense(tripId: string) {
  return useSuspenseQuery<Itinerary>({
    queryKey: plannerKeys.itinerary(tripId),
    queryFn: () => plannerRepository.getItinerary(tripId),
    staleTime: 1000 * 60 * 5,
  });
}
