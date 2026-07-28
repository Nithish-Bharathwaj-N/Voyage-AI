// ============================================================
// PlannerRepository
// Single source for all planner API calls.
// Components must NEVER call apiClient or fetch directly.
// Falls back to typed mock data if the backend is unreachable.
// ============================================================

import { apiClient } from '../../api-client';

import type {
  Trip,
  Itinerary,
  PlannerActivity,
  Destination,
  CreateActivityPayload,
  MoveActivityPayload,
  DeleteActivityPayload,
  DuplicateActivityPayload,
} from '../types/planner.types';

const SIMULATE_DELAY_MS = 600;

async function withFallback<T>(
  apiCall: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await apiCall();
  } catch {
    // Backend unreachable — return typed placeholder
    await new Promise((resolve) => setTimeout(resolve, SIMULATE_DELAY_MS));
    return fallback;
  }
}

class PlannerRepository {
  async getTrip(tripId: string): Promise<Trip> {
    if (tripId === 't-1') {
      return { 
        id: 't-1', 
        title: 'New Trip', 
        destination: 'Unknown', 
        startDate: new Date().toISOString(), 
        endDate: new Date().toISOString(), 
        status: 'draft' 
      };
    }
    return apiClient
      .get(`/planner/${tripId}`)
      .then((r) => r as unknown as Trip);
  }

  async getItinerary(tripId: string): Promise<Itinerary> {
    if (tripId === 't-1') {
      return { id: 'itinerary-t-1', tripId: 't-1', days: [] };
    }
    return apiClient
      .get(`/planner/${tripId}`)
      .then((r: any) => {
        // Map backend response to Itinerary shape
        return {
          id: `itinerary-${tripId}`,
          tripId,
          days: r.dayPlans.map((dp: any) => ({
            id: dp.id,
            tripId,
            date: dp.date,
            dayIndex: dp.orderIndex,
            sections: [
              {
                id: `sec-${dp.id}-main`,
                dayId: dp.id,
                timeOfDay: 'all-day',
                activities: dp.activities || []
              }
            ]
          }))
        };
      });
  }

  async getActivities(dayId: string): Promise<PlannerActivity[]> {
    // Usually frontend states manage this
    return [];
  }

  async getDestinations(tripId: string): Promise<Destination[]> {
    return [];
  }

  // ─── Mutation Stubs ─────────────────────────────────────────
  // These are structural stubs only. No persistence occurs.
  // Sprint 5F / 5G will wire these to the Zustand optimistic mutations.

  async createActivity(payload: CreateActivityPayload): Promise<PlannerActivity> {
    return apiClient.post(`/planner/${payload.tripId}/activities`, payload)
      .then(r => r as unknown as PlannerActivity);
  }

  async moveActivity(payload: MoveActivityPayload): Promise<void> {
    return apiClient.patch(`/planner/${payload.tripId}/activities/${payload.activityId}`, {
      dayPlanId: payload.targetSectionId, // In our NestJS we can update dayPlanId or...
      orderIndex: payload.targetIndex
    });
  }

  async deleteActivity(payload: DeleteActivityPayload): Promise<void> {
    return apiClient.delete(`/planner/${payload.tripId}/activities/${payload.activityId}`);
  }

  async duplicateActivity(payload: DuplicateActivityPayload): Promise<PlannerActivity> {
    // Actually we don't have a duplicate endpoint, so just GET and POST it
    // Or we just call POST with same data
    console.warn('[PlannerRepository] duplicateActivity: Not fully implemented');
    return Promise.reject(new Error('Not implemented'));
  }
}

// Singleton export — one instance for the entire app lifetime
export const plannerRepository = new PlannerRepository();
