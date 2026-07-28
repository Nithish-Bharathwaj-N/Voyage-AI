import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { GetUserProfileQuery, UpdatePreferencesCommand } from '@voyageai/application';
import { PrismaUserRepository, PrismaProfileRepository } from '@voyageai/db';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userRepository = new PrismaUserRepository(prisma);
const profileRepository = new PrismaProfileRepository(prisma);

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: GetUserProfileQuery,
      useFactory: () => {
        return new GetUserProfileQuery(userRepository, profileRepository);
      }
    },
    {
      provide: UpdatePreferencesCommand,
      useFactory: () => {
        return new UpdatePreferencesCommand(profileRepository);
      }
    }
  ]
})
export class UserModule {}
