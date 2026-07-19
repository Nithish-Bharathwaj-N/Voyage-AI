import apiClient, { ApiResponse } from './apiClient';
import { Trip, CreateTripDto, UpdateTripDto, Destination, Activity } from '@/types';

export const tripService = {
  getTrips: async (): Promise<ApiResponse<Trip[]>> => {
    return apiClient.get('/trips');
  },

  getTrip: async (id: string): Promise<ApiResponse<Trip>> => {
    return apiClient.get(`/trips/${id}`);
  },

  createTrip: async (dto: CreateTripDto): Promise<ApiResponse<Trip>> => {
    return apiClient.post('/trips', dto);
  },

  updateTrip: async (id: string, dto: UpdateTripDto): Promise<ApiResponse<Trip>> => {
    return apiClient.patch(`/trips/${id}`, dto);
  },

  deleteTrip: async (id: string): Promise<ApiResponse<void>> => {
    return apiClient.delete(`/trips/${id}`);
  },

  archiveTrip: async (id: string): Promise<ApiResponse<Trip>> => {
    return apiClient.post(`/trips/${id}/archive`);
  },

  duplicateTrip: async (id: string): Promise<ApiResponse<Trip>> => {
    return apiClient.post(`/trips/${id}/duplicate`);
  },

  getDestinations: async (tripId: string): Promise<ApiResponse<Destination[]>> => {
    return apiClient.get(`/trips/${tripId}/destinations`);
  },

  getActivities: async (destinationId: string): Promise<ApiResponse<Activity[]>> => {
    return apiClient.get(`/destinations/${destinationId}/activities`);
  },

  getUpcomingActivities: async (): Promise<ApiResponse<Activity[]>> => {
    return apiClient.get('/trips/upcoming-activities');
  }
};
