import { Controller, Post, Get, Body, UseGuards, Query, Sse, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../../auth/guards/supabase-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ValidatedUser } from '../../auth/strategies/supabase.strategy';
import { AiPlannerService } from '../services/ai-planner.service';
import { AiProviderManager } from '../services/ai-provider-manager.service';
import { ItineraryValidatorService } from '../services/itinerary-validator.service';
import { TripOptimizerService } from '../services/trip-optimizer.service';
import { CacheService } from '../../integrations/services/cache.service';
import { PlanTripDto } from '../dto/plan-trip.dto';
import { RegenerateTripDto } from '../dto/regenerate-trip.dto';
import { OptimizeTripDto } from '../dto/optimize-trip.dto';
import { ValidateTripDto } from '../dto/validate-trip.dto';
import { EditTripDto } from '../dto/edit-trip.dto';
import { AiChatService } from '../services/ai-chat.service';

import { Itinerary, DayPlan } from '../interfaces/itinerary.interface';
import { ValidationError } from '../services/itinerary-validator.service';
import { getRegenerationPrompt, getOptimizationPrompt } from '../prompts/optimization.prompts';

@ApiTags('AI Planner')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('ai')
export class AiController {
  constructor(
    private readonly plannerService: AiPlannerService,
    private readonly aiManager: AiProviderManager,
    private readonly validatorService: ItineraryValidatorService,
    private readonly optimizerService: TripOptimizerService,
    private readonly cacheService: CacheService,
    private readonly chatService: AiChatService,
  ) {}

  @Post('plan')
  @ApiOperation({ summary: 'Generate a new travel itinerary plan based on parameters' })
  @ApiResponse({ status: 201, description: 'Travel itinerary generated successfully' })
  async planTrip(
    @CurrentUser() user: ValidatedUser,
    @Body() dto: PlanTripDto,
    @Query('provider') provider?: string,
  ): Promise<Itinerary> {
    return this.plannerService.planTrip(dto, provider, user.id);
  }

  @Post('plan/stream')
  @Sse()
  @ApiOperation({ summary: 'Generate a new travel itinerary plan with live progress' })
  streamPlanTrip(
    @CurrentUser() user: ValidatedUser,
    @Body() dto: PlanTripDto,
    @Query('provider') provider?: string,
  ): Observable<MessageEvent> {
    return new Observable((subscriber) => {
      (async () => {
        try {
          const generator = this.plannerService.streamPlanTrip(dto, provider, user.id);
          for await (const chunk of generator) {
            subscriber.next({ data: chunk } as MessageEvent);
          }
          subscriber.complete();
        } catch (e) {
          subscriber.error(e);
        }
      })();
    });
  }

  @Post('regenerate')
  @ApiOperation({ summary: 'Regenerate a specific day or activity in an existing itinerary' })
  @ApiResponse({ status: 200, description: 'Itinerary component regenerated successfully' })
  async regenerateTrip(
    @Body() dto: RegenerateTripDto,
    @Query('provider') provider?: string,
  ): Promise<Itinerary> {
    const prompt = getRegenerationPrompt(
      dto.dayNumber,
      dto.activityName,
      dto.itinerary,
      dto.context,
    );
    const raw = await this.aiManager.generateText('complex-itinerary', prompt, undefined, {
      model: provider,
    });
    // Parse cleaned output
    let text = raw.trim();
    if (text.startsWith('```')) {
      const startIdx = text.indexOf('\n');
      const endIdx = text.lastIndexOf('```');
      if (startIdx !== -1 && endIdx !== -1) {
        text = text.substring(startIdx + 1, endIdx).trim();
      }
    }
    return JSON.parse(text) as Itinerary;
  }

  @Post('optimize')
  @ApiOperation({ summary: 'Optimize activity sequence in an itinerary' })
  @ApiResponse({ status: 200, description: 'Itinerary optimized successfully' })
  async optimizeTrip(
    @Body() dto: OptimizeTripDto,
    @Query('provider') provider?: string,
  ): Promise<Itinerary> {
    const itinerary = dto.itinerary;
    if (dto.targets?.includes('Distance') && Array.isArray(itinerary.days)) {
      itinerary.days.forEach((day: DayPlan) => {
        if (Array.isArray(day.activities)) {
          day.activities = this.optimizerService.optimizeResequencing(day.activities);
        }
      });
      return itinerary;
    }

    const prompt = getOptimizationPrompt(itinerary, dto.targets || ['Distance']);
    const raw = await this.aiManager.generateText('complex-itinerary', prompt, undefined, {
      model: provider,
    });
    let text = raw.trim();
    if (text.startsWith('```')) {
      const startIdx = text.indexOf('\n');
      const endIdx = text.lastIndexOf('```');
      if (startIdx !== -1 && endIdx !== -1) {
        text = text.substring(startIdx + 1, endIdx).trim();
      }
    }
    return JSON.parse(text) as Itinerary;
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validate itinerary parameters and time overlap rules' })
  @ApiResponse({ status: 200, description: 'Validation audit report compiled' })
  async validateTrip(
    @Body() dto: ValidateTripDto,
  ): Promise<{ valid: boolean; errors: ValidationError[] }> {
    const errors = this.validatorService.validate(dto.itinerary);
    return {
      valid: errors.length === 0,
      errors,
    };
  }

  @Post('edit')
  @ApiOperation({ summary: 'Natural language live editing of an existing itinerary' })
  @ApiResponse({ status: 200, description: 'Itinerary edited successfully' })
  async editTrip(
    @Body() dto: EditTripDto,
    @Query('provider') provider?: string,
  ): Promise<Itinerary> {
    return this.plannerService.editTrip(dto.itinerary, dto.prompt, provider);
  }

  @Post('chat')
  @ApiOperation({ summary: 'Conversational chat for itinerary planning and editing' })
  @ApiResponse({ status: 200, description: 'Chat response generated' })
  async handleChat(
    @Body() dto: { messages: { role: string; content: string }[]; itinerary?: Itinerary },
    @Query('provider') provider?: string,
  ): Promise<any> {
    return this.chatService.handleChat(dto.messages, dto.itinerary, provider);
  }

  @Post('chat/stream')
  @Sse()
  @ApiOperation({ summary: 'Stream conversational chat' })
  streamChat(
    @Body() dto: { messages: { role: string; content: string }[]; itinerary?: Itinerary },
    @Query('provider') provider?: string,
  ): Observable<MessageEvent> {
    return new Observable((subscriber) => {
      (async () => {
        try {
          const generator = this.chatService.streamChat(dto.messages, dto.itinerary, provider);
          for await (const chunk of generator) {
            subscriber.next({ data: { data: chunk } } as MessageEvent);
          }
          subscriber.complete();
        } catch (e) {
          subscriber.error(e);
        }
      })();
    });
  }


  @Get('history')
  @ApiOperation({ summary: 'Retrieve historical list of user planning requests' })
  @ApiResponse({ status: 200, description: 'History logs fetched successfully' })
  async getHistory(@CurrentUser() user: ValidatedUser): Promise<unknown[]> {
    const historyKey = CacheService.buildKey('ai', 'history', user.id);
    const history = await this.cacheService.get<unknown[]>(historyKey);
    return history || [];
  }
}
