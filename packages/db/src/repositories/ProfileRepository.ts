import { PrismaClient } from '@prisma/client';
import { UserId, TravelStyle } from '@voyageai/types';

// Let's define the Profile interface here since we didn't explicitly check if it's in @voyageai/types
export interface Profile {
  id: string;
  userId: UserId;
  displayName: string;
  avatarUrl: string | null;
  preferredCurrency: string;
  defaultTravelStyle: TravelStyle;
}

export interface ProfileRepository {
  findByUserId(userId: UserId): Promise<Profile | null>;
  upsert(userId: UserId, profile: Partial<Omit<Profile, 'id' | 'userId'>>): Promise<Profile>;
}

export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByUserId(userId: UserId): Promise<Profile | null> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    if (!profile) return null;
    return this.mapToDomain(profile);
  }

  async upsert(userId: UserId, data: Partial<Omit<Profile, 'id' | 'userId'>>): Promise<Profile> {
    const profile = await this.prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        displayName: data.displayName || 'Traveler',
        avatarUrl: data.avatarUrl,
        preferredCurrency: data.preferredCurrency || 'USD',
        defaultTravelStyle: (data.defaultTravelStyle as string) || 'COMFORT',
      },
      update: {
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
        preferredCurrency: data.preferredCurrency,
        defaultTravelStyle: data.defaultTravelStyle as string,
      },
    });
    return this.mapToDomain(profile);
  }

  private mapToDomain(prismaProfile: any): Profile {
    return {
      id: prismaProfile.id,
      userId: prismaProfile.userId as UserId,
      displayName: prismaProfile.displayName,
      avatarUrl: prismaProfile.avatarUrl,
      preferredCurrency: prismaProfile.preferredCurrency,
      defaultTravelStyle: prismaProfile.defaultTravelStyle as TravelStyle,
    };
  }
}
