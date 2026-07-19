import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TripController } from './controllers/trip.controller';
import { DestinationController } from './controllers/destination.controller';
import { ActivityController } from './controllers/activity.controller';
import { TripService } from './services/trip.service';
import { DestinationService } from './services/destination.service';
import { ActivityService } from './services/activity.service';

@Module({
  imports: [PrismaModule],
  controllers: [TripController, DestinationController, ActivityController],
  providers: [TripService, DestinationService, ActivityService],
  exports: [TripService],
})
export class TripModule {}
