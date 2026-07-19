import { Module } from '@nestjs/common';
import { TripCompanionService } from './trip-companion.service';
import { SmartNotificationService } from './smart-notification.service';

@Module({
  providers: [TripCompanionService, SmartNotificationService],
  exports: [TripCompanionService],
})
export class CompanionModule {}
