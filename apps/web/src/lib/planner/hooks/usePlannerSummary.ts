'use client';

import { useMemo } from 'react';
import { useTrip } from './useTrip';
import { usePlanner } from './usePlanner';
import type { PlannerSummary } from '../types/planner.types';

export function usePlannerSummary(tripId: string) {
  const { data: trip, isLoading: tripLoading, error: tripError } = useTrip(tripId);
  const { data: itinerary, isLoading: itinLoading, error: itinError } = usePlanner(tripId);

  const summary = useMemo<PlannerSummary | null>(() => {
    if (!trip || !itinerary) return null;

    const allActivities = itinerary.days.flatMap((d) =>
      d.sections.flatMap((s) => s.activities)
    );
    const completed = allActivities.filter((a) => a.completed).length;
    const budgetSpent = itinerary.days.reduce((sum, d) => sum + (d.budget?.spent ?? 0), 0);
    const budgetAllocated = itinerary.days.reduce((sum, d) => sum + (d.budget?.allocated ?? 0), 0);

    return {
      trip,
      itinerary,
      totalDays: itinerary.days.length,
      totalActivities: allActivities.length,
      completedActivities: completed,
      budgetSpent,
      budgetAllocated,
    };
  }, [trip, itinerary]);

  return {
    summary,
    isLoading: tripLoading || itinLoading,
    error: tripError ?? itinError,
  };
}
