import { Module } from '@nestjs/common';
import { TravelOrchestratorService } from './travel-orchestrator.service';
import { BookingOrchestratorService } from './booking-orchestrator.service';
import { AiModule } from '../ai/ai.module';
import { CompanionModule } from '../companion/companion.module';

@Module({
  imports: [AiModule, CompanionModule],
  providers: [TravelOrchestratorService, BookingOrchestratorService],
  exports: [TravelOrchestratorService],
})
export class OrchestratorModule {}
