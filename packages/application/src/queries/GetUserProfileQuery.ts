import { Result, success, failure, NotFoundError } from '@voyageai/shared';
import { UserId } from '@voyageai/types';
import { ProfileRepository, Profile, UserRepository } from '@voyageai/db';

export class GetUserProfileQuery {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository
  ) {}

  async execute(userId: UserId): Promise<Result<Profile, Error>> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return failure(new NotFoundError('User not found'));
      }

      let profile = await this.profileRepository.findByUserId(userId);
      
      // If a user exists but no profile, lazily create one (typical for first OAuth login)
      if (!profile) {
        profile = await this.profileRepository.upsert(userId, {
          displayName: user.email.split('@')[0], // Fallback
        });
      }

      return success(profile);
    } catch (error: any) {
      return failure(error);
    }
  }
}
