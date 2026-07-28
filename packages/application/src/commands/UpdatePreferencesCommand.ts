import { Result, success, failure, NotFoundError } from '@voyageai/shared';
import { UserId, TravelStyle } from '@voyageai/types';
import { ProfileRepository, Profile } from '@voyageai/db';

export interface UpdatePreferencesInput {
  userId: UserId;
  displayName?: string;
  preferredCurrency?: string;
  defaultTravelStyle?: TravelStyle;
}

export class UpdatePreferencesCommand {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(input: UpdatePreferencesInput): Promise<Result<Profile, Error>> {
    try {
      const profile = await this.profileRepository.upsert(input.userId, {
        displayName: input.displayName,
        preferredCurrency: input.preferredCurrency,
        defaultTravelStyle: input.defaultTravelStyle,
      });

      return success(profile);
    } catch (error: any) {
      return failure(error);
    }
  }
}
