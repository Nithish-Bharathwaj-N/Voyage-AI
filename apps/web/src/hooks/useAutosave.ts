import { useEffect, useMemo } from 'react';
import { usePlannerStore } from '../stores/usePlannerStore';
import debounce from 'lodash.debounce';

export function useAutosave(tripId: string) {
  const debouncedSave = useMemo(() => {
    return debounce((tripData: unknown) => {
      console.log('Autosaving trip to backend...', tripData, 'for trip', tripId);
    }, 2000);
  }, [tripId]);

  useEffect(() => {
    // Subscribe to Zustand store changes
    const unsubscribe = usePlannerStore.subscribe((state) => {
      if (state.trip) {
        debouncedSave(state.trip);
      }
    });

    return () => {
      unsubscribe();
      debouncedSave.cancel();
    };
  }, [debouncedSave]);
}
