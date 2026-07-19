import { Injectable, Logger } from '@nestjs/common';
import { AiPlannerService } from '../ai/services/ai-planner.service';
import { PlanTripDto } from '../ai/dto/plan-trip.dto';
import { Itinerary } from '../ai/interfaces/itinerary.interface';
import { BookingOrchestratorService } from './booking-orchestrator.service';
import { TripCompanionService } from '../companion/trip-companion.service';

export enum TripPhase {
  DREAMING = 'DREAMING',
  PLANNING = 'PLANNING',
  BOOKING = 'BOOKING',
  TRAVELING = 'TRAVELING',
  REMEMBERING = 'REMEMBERING'
}

/**
 * TravelOrchestratorService
 * 
 * The central brain of TOS 1.0. 
 * Gemini (via AiPlannerService) is now just a worker node for the PLANNING phase.
 * The Orchestrator routes requests between Live Providers, Booking, and the Knowledge Engine.
 */
@Injectable()
export class TravelOrchestratorService {
  private readonly logger = new Logger(TravelOrchestratorService.name);

  constructor(
    private readonly aiPlanner: AiPlannerService,
    private readonly bookingOrchestrator: BookingOrchestratorService,
    private readonly companionService: TripCompanionService,
  ) {}

  /**
   * Phase: PLANNING
   * Intercepts standard planning requests, could augment with live flight availability before passing to AI.
   */
  async planTrip(dto: PlanTripDto): Promise<Itinerary> {
    this.logger.log(`[Orchestrator] Initiating Trip Planning Phase for ${dto.destination}`);
    const itinerary = await this.aiPlanner.planTrip(dto);
    this.logger.log(`[Orchestrator] Trip Planning Complete.`);
    return itinerary;
  }

  /**
   * Phase: BOOKING
   */
  async bookTrip(itineraryId: string): Promise<any> {
    this.logger.log(`[Orchestrator] Transitioning to BOOKING phase for itinerary ${itineraryId}`);
    return this.bookingOrchestrator.executeBookings(itineraryId);
  }

  /**
   * Phase: TRAVELING (Trip Execution)
   */
  async startTrip(itineraryId: string): Promise<any> {
    this.logger.log(`[Orchestrator] Transitioning to TRAVELING phase for itinerary ${itineraryId}`);
    return this.companionService.initializeCompanion(itineraryId);
  }
}
