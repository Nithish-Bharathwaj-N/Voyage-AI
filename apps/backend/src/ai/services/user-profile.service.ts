import { Injectable, Logger } from '@nestjs/common';

export interface TravelerProfile {
  userId: string;
  preferences: string[];
  dietaryNeeds: string[];
  budgetLevel: string;
  travelStyle: string;
}

@Injectable()
export class UserProfileService {
  private readonly logger = new Logger(UserProfileService.name);
  
  // In-memory mock database for traveler profiles
  private profiles = new Map<string, TravelerProfile>();

  public getProfile(userId: string): TravelerProfile | null {
    return this.profiles.get(userId) || null;
  }

  public updateProfile(userId: string, data: Partial<TravelerProfile>): TravelerProfile {
    const existing = this.profiles.get(userId) || {
       userId,
       preferences: [],
       dietaryNeeds: [],
       budgetLevel: 'medium',
       travelStyle: 'culture'
    };

    const updated = { ...existing, ...data };
    
    // Deduplicate arrays
    if (data.preferences) updated.preferences = [...new Set([...existing.preferences, ...data.preferences])];
    if (data.dietaryNeeds) updated.dietaryNeeds = [...new Set([...existing.dietaryNeeds, ...data.dietaryNeeds])];

    this.profiles.set(userId, updated);
    this.logger.log(`Updated profile for ${userId}. Preferences memory expanded.`);
    return updated;
  }

  /**
   * Intelligently merge DTO data with stored profile data so the AI remembers past preferences
   */
  public mergeWithDTO(userId: string, currentInterests: string[] = []): string[] {
    const profile = this.getProfile(userId);
    if (!profile) return currentInterests;
    return [...new Set([...currentInterests, ...profile.preferences])];
  }
}
