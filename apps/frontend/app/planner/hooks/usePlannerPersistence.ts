import * as React from 'react';
import { Itinerary } from '@/types/itinerary';
import { plannerStorageService } from '@/services/planner-storage.service';

export interface UsePlannerPersistenceResult {
  saveTempItinerary: (itinerary: Itinerary) => void;
  getTempItinerary: () => Itinerary | null;
  clearTempItinerary: () => void;
  hasTempItinerary: () => boolean;
}

/**
 * Hook coordinating localStorage operations through PlannerStorageService.
 */
export function usePlannerPersistence(): UsePlannerPersistenceResult {
  const saveTempItinerary = React.useCallback((itinerary: Itinerary) => {
    plannerStorageService.saveDraft(itinerary);
  }, []);

  const getTempItinerary = React.useCallback((): Itinerary | null => {
    return plannerStorageService.restoreDraft();
  }, []);

  const clearTempItinerary = React.useCallback(() => {
    plannerStorageService.clearDraft();
  }, []);

  const hasTempItinerary = React.useCallback((): boolean => {
    return plannerStorageService.hasDraft();
  }, []);

  return {
    saveTempItinerary,
    getTempItinerary,
    clearTempItinerary,
    hasTempItinerary
  };
}
