'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { plannerKeys } from '../queries/plannerQueryKeys';
import { plannerRepository } from '../repository/PlannerRepository';
import type { Trip } from '../types/planner.types';

export function useTrip(tripId: string) {
  return useQuery<Trip>({
    queryKey: plannerKeys.trip(tripId),
    queryFn: () => plannerRepository.getTrip(tripId),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    retry: 2,
  });
}

export function useTripSuspense(tripId: string) {
  return useSuspenseQuery<Trip>({
    queryKey: plannerKeys.trip(tripId),
    queryFn: () => plannerRepository.getTrip(tripId),
    staleTime: 1000 * 60 * 10,
  });
}
