import apiClient from './apiClient';
import { Itinerary } from '@/types/itinerary';

export interface PlanTripDto {
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  currency?: string;
  travelerCount: number;
  travelStyle: string;
  interests?: string[];
  foodPreferences?: string[];
}

export interface RegenerateTripDto {
  dayNumber: number;
  activityName: string;
  context: Record<string, unknown>;
  itinerary: Itinerary;
}

export interface OptimizeTripDto {
  itinerary: Itinerary;
  targets?: string[];
}

export const aiService = {
  planTrip: async (dto: PlanTripDto, provider?: string): Promise<Itinerary> => {
    const url = provider ? `/ai/plan?provider=${provider}` : '/ai/plan';
    const response = await apiClient.post(url, dto) as any;
    return response?.data ?? response;
  },

  regenerateTrip: async (dto: RegenerateTripDto, provider?: string): Promise<Itinerary> => {
    const url = provider ? `/ai/regenerate?provider=${provider}` : '/ai/regenerate';
    const response = await apiClient.post(url, dto) as any;
    return response?.data ?? response;
  },

  optimizeTrip: async (dto: OptimizeTripDto, provider?: string): Promise<Itinerary> => {
    const url = provider ? `/ai/optimize?provider=${provider}` : '/ai/optimize';
    const response = await apiClient.post(url, dto) as any;
    return response?.data ?? response;
  },

  validateTrip: async (itinerary: Itinerary): Promise<{ valid: boolean; errors: unknown[] }> => {
    const response = await apiClient.post('/ai/validate', { itinerary }) as any;
    return response?.data ?? response;
  },

  getHistory: async (): Promise<unknown[]> => {
    const response = await apiClient.get('/ai/history') as any;
    return response?.data ?? response ?? [];
  },

  saveToTrip: async (payload: {
    itinerary: Itinerary;
    startDate: string;
    endDate: string;
    currency?: string;
    estimatedBudget?: number;
  }): Promise<{ id: string; title: string }> => {
    const response = await apiClient.post('/trips/from-itinerary', payload) as any;
    return response?.data ?? response;
  },
};
