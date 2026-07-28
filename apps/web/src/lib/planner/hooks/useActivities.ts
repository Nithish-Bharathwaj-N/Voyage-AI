'use client';

import { useQuery } from '@tanstack/react-query';
import { plannerKeys } from '../queries/plannerQueryKeys';
import { plannerRepository } from '../repository/PlannerRepository';
import type { PlannerActivity } from '../types/planner.types';

export function useActivities(dayId: string) {
  return useQuery<PlannerActivity[]>({
    queryKey: plannerKeys.activitiesByDay(dayId),
    queryFn: () => plannerRepository.getActivities(dayId),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(dayId),
  });
}
