import { Itinerary } from '@/types/itinerary';

const STORAGE_KEY = 'temp_itinerary';

/**
 * Service driving localStorage backups, caching draft itineraries, and reloading guest parameters upon return.
 */
export class PlannerStorageService {
  /**
   * Caches active generated itinerary in local storage.
   */
  saveDraft(itinerary: Itinerary): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itinerary));
    } catch (e) {
      console.error('[PlannerStorageService] Failed to cache draft itinerary:', e);
    }
  }

  /**
   * Restores cached draft itinerary from local storage.
   */
  restoreDraft(): Itinerary | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('[PlannerStorageService] Failed to restore draft itinerary:', e);
      return null;
    }
  }

  /**
   * Wipes cached draft itinerary from local storage.
   */
  clearDraft(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Checks if a cached draft itinerary exists in local storage.
   */
  hasDraft(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }
}

export const plannerStorageService = new PlannerStorageService();
