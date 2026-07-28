'use client';

import { useQuery } from '@tanstack/react-query';
import { tripKeys } from '../queries/tripQueryKeys';
import { tripRepository } from '../repository/TripRepository';
import type { TripFilter, TripSortKey, TripTab, WorkspaceTrip } from '../types/trips.types';

export function useTrips(
  tab: TripTab = 'my-trips',
  filter: TripFilter = {},
  sort: TripSortKey = 'updated'
) {
  return useQuery<WorkspaceTrip[]>({
    queryKey: tripKeys.list(tab, filter, sort),
    queryFn: () => tripRepository.listTrips(tab, filter, sort),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
    retry: 2,
  });
}
