import { useQuery } from '@tanstack/react-query';
import { destinationRepository } from '../repository/DestinationRepository';
import { destinationKeys } from '../queries/destinationKeys';
import type { DetailedDestination } from '../types/destination.types';

export function useDestination(id: string) {
  return useQuery<DetailedDestination>({
    queryKey: destinationKeys.detail(id),
    queryFn: () => destinationRepository.getDestination(id),
    staleTime: 1000 * 60 * 60, // 1 hour for destination data (mostly static)
  });
}
