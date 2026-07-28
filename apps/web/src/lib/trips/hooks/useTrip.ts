import { useQuery } from '@tanstack/react-query';
import { tripKeys } from '../queries/tripQueryKeys';
import { tripRepository } from '../repository/TripRepository';
import type { WorkspaceTrip } from '../types/trips.types';

export function useTrip(tripId: string) {
  return useQuery<WorkspaceTrip, Error>({
    queryKey: tripKeys.detail(tripId),
    queryFn: () => tripRepository.getTrip(tripId),
    enabled: !!tripId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
