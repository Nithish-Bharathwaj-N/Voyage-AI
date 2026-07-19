import { Module } from '@nestjs/common';
import { TripCollaborationService } from './trip-collaboration.service';

@Module({
  providers: [TripCollaborationService],
  exports: [TripCollaborationService],
})
export class CollaborationModule {}
