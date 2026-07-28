'use client';

import { useQuery } from '@tanstack/react-query';
import { plannerKeys } from '../queries/plannerQueryKeys';
import { plannerRepository } from '../repository/PlannerRepository';
import type { Destination } from '../types/planner.types';

export function useDestinations(tripId: string) {
  return useQuery<Destination[]>({
    queryKey: plannerKeys.destinationsByTrip(tripId),
    queryFn: () => plannerRepository.getDestinations(tripId),
    staleTime: 1000 * 60 * 10,
    enabled: Boolean(tripId),
  });
}
