import apiClient, { ApiResponse } from './apiClient';

export interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  defaultCurrency: string;
  language: string;
  travelStyle: string;
  interests: string[];
  foodPreferences: string[];
  accessibilityRequirements?: string[];
  preferredTransport?: string;
  budgetRange?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  bio?: string;
}

export interface UpdatePreferencesDto {
  defaultCurrency?: string;
  language?: string;
  travelStyle?: string;
  interests?: string[];
  foodPreferences?: string[];
  accessibilityRequirements?: string[];
}

export const profileService = {
  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    return apiClient.get('/profile');
  },

  updateProfile: async (dto: UpdateProfileDto): Promise<ApiResponse<UserProfile>> => {
    return apiClient.patch('/profile', dto);
  },

  uploadAvatar: async (file: File): Promise<ApiResponse<{ avatarUrl: string }>> => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteAvatar: async (): Promise<ApiResponse<void>> => {
    return apiClient.delete('/profile/avatar');
  },

  getPreferences: async (): Promise<ApiResponse<UserPreferences>> => {
    return apiClient.get('/profile/preferences');
  },

  updatePreferences: async (dto: UpdatePreferencesDto): Promise<ApiResponse<UserPreferences>> => {
    return apiClient.patch('/profile/preferences', dto);
  },
};
