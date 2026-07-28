'use client';

import { useQuery } from '@tanstack/react-query';
import { tripKeys } from '../queries/tripQueryKeys';
import { tripRepository } from '../repository/TripRepository';
import type { TripStatistics } from '../types/trips.types';

export function useTripStatistics() {
  return useQuery<TripStatistics>({
    queryKey: tripKeys.statistics(),
    queryFn: () => tripRepository.getStatistics(),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
}
