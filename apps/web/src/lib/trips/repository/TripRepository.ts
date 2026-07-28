// ============================================================
// TripRepository
// Single source for all trip workspace API calls.
// Components must NEVER call apiClient or fetch directly.
// Falls back to typed mock data if the backend is unreachable.
// ============================================================

import { apiClient } from '@/lib/api-client';

import type {
  WorkspaceTrip,
  TripTab,
  TripFilter,
  TripSortKey,
  TripStatistics,
} from '../types/trips.types';
import { filterByTab, filterTrips, sortTrips } from '../selectors/tripSelectors';

const SIMULATE_DELAY_MS = 500;

async function withFallback<T>(apiCall: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await apiCall();
  } catch {
    await new Promise((resolve) => setTimeout(resolve, SIMULATE_DELAY_MS));
    return fallback;
  }
}

class TripRepository {
  // ─── Queries ──────────────────────────────────────────────

  async listTrips(
    tab: TripTab = 'my-trips',
    filter: TripFilter = {},
    sort: TripSortKey = 'updated'
  ): Promise<WorkspaceTrip[]> {
    return apiClient
      .get(`/trips?tab=${tab}`)
      .then((r) => r as unknown as WorkspaceTrip[]);
  }

  async getTrip(tripId: string): Promise<WorkspaceTrip> {
    return apiClient
      .get(`/trips/${tripId}`)
      .then((r) => r as unknown as WorkspaceTrip);
  }

  async getStatistics(): Promise<TripStatistics> {
    return apiClient
      .get('/statistics')
      .then((r) => r as unknown as TripStatistics);
  }

  // ─── Mutation Stubs ───────────────────────────────────────
  // No persistence. Sprint 7B will wire these to the backend.

  async archiveTrips(_ids: string[]): Promise<void> {
    console.warn('[TripRepository] archiveTrips: stub — no persistence');
  }

  async duplicateTrip(_id: string): Promise<WorkspaceTrip> {
    console.warn('[TripRepository] duplicateTrip: stub — no persistence');
    return Promise.reject(new Error('Not implemented'));
  }

  async deleteTrips(_ids: string[]): Promise<void> {
    console.warn('[TripRepository] deleteTrips: stub — no persistence');
  }

  async toggleFavorite(_id: string, _value: boolean): Promise<void> {
    console.warn('[TripRepository] toggleFavorite: stub — no persistence');
  }
}

// Singleton — one instance for the entire app lifetime
export const tripRepository = new TripRepository();
