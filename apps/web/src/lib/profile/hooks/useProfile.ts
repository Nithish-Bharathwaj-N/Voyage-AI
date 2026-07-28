import { useQuery } from '@tanstack/react-query';
import { profileRepository } from '../repository/ProfileRepository';
import { profileKeys } from '../queries/profileKeys';
import type { UserProfile, ProfileStats, TravelPreference, ActivityTimelineEvent } from '../types/profile.types';

export function useProfile() {
  return useQuery<UserProfile>({
    queryKey: profileKeys.detail(),
    queryFn: () => profileRepository.getProfile(),
  });
}

export function useProfileStats() {
  return useQuery<ProfileStats>({
    queryKey: profileKeys.stats(),
    queryFn: () => profileRepository.getProfileStats(),
  });
}

export function useTravelPreferences() {
  return useQuery<TravelPreference[]>({
    queryKey: profileKeys.preferences(),
    queryFn: () => profileRepository.getPreferences(),
  });
}

export function useActivityTimeline() {
  return useQuery<ActivityTimelineEvent[]>({
    queryKey: profileKeys.timeline(),
    queryFn: () => profileRepository.getActivityTimeline(),
  });
}
