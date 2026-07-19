import { Injectable, Logger } from '@nestjs/common';
import { PlanTripDto } from '../dto/plan-trip.dto';
import { PlannerContextOrchestrator } from './planner-context.service';
import { PlannerPromptBuilder } from './planner-prompt-builder.service';
import { AiProviderManager } from './ai-provider-manager.service';
import { ItineraryValidatorService } from './itinerary-validator.service';
import { ItineraryRepairService } from './itinerary-repair.service';
import { ItineraryEnricher } from './itinerary-enricher.service';
import { CacheService } from '../../integrations/services/cache.service';
import { Itinerary } from '../interfaces/itinerary.interface';
import { getCopilotEditPrompt } from '../prompts/optimization.prompts';

@Injectable()
export class AiPlannerService {
  private readonly logger = new Logger(AiPlannerService.name);

  constructor(
    private readonly contextOrchestrator: PlannerContextOrchestrator,
    private readonly promptBuilder: PlannerPromptBuilder,
    private readonly aiManager: AiProviderManager,
    private readonly validator: ItineraryValidatorService,
    private readonly repairService: ItineraryRepairService,
    private readonly enricher: ItineraryEnricher,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Main entry point — runs the full 6-stage planner pipeline:
   * 1. Cache check
   * 2. Parallel context orchestration
   * 3. Prompt construction
   * 4. LLM generation
   * 5. Validation + repair
   * 6. Image enrichment
   */
  async planTrip(
    dto: PlanTripDto,
    providerName?: string,
    userId: string = 'sandbox-user-id',
  ): Promise<Itinerary> {
    const startTimestamp = Date.now();
    this.logger.log(`[Pipeline Start] destination=${dto.destination} userId=${userId}`);

    // ── Stage 0: Cache check ──
    const cacheKey = CacheService.buildKey(
      'ai',
      'plan',
      encodeURIComponent(dto.destination),
      dto.startDate,
      dto.endDate,
      String(dto.budget),
      dto.currency || 'USD',
    );

    const cached = await this.cacheService.get<Itinerary>(cacheKey);
    if (cached) {
      this.logger.log(`[Cache HIT] Returning cached itinerary for ${dto.destination} (DISABLED for RCA)`);
      // return cached; // CACHE DISABLED FOR ROOT CAUSE ANALYSIS
    }

    // ── Stage 1: Parallel Context Orchestration ──
    const context = await this.contextOrchestrator.buildContext(dto);

    // ── Stage 2: Prompt Construction ──
    const { systemPrompt, userPrompt } = this.promptBuilder.build(dto, context);

    // ── Stage 3: LLM Generation ──
    const rawText = await this.aiManager.generateText(
      'complex-itinerary',
      userPrompt,
      systemPrompt,
      { model: providerName, temperature: 0.7 },
    );

    // ── Stage 4: Parse ──
    let itinerary: Itinerary;
    try {
      const cleanedText = this.cleanMarkdownWrap(rawText);
      itinerary = JSON.parse(cleanedText) as Itinerary;
    } catch (parseError) {
      this.logger.error(`JSON parse failed. Attempting repair. Raw length: ${rawText.length}`);
      // Force repair pipeline on parse failure
      const errors = [{ type: 'schema' as const, message: 'JSON parse failed' }];
      itinerary = await this.repairService.repair({} as Itinerary, errors, providerName);
    }

    // ── Stage 5: Validate + Repair ──
    const errors = this.validator.validate(itinerary);
    if (errors.length > 0) {
      this.logger.warn(`Validation: ${errors.length} error(s). Triggering repair pipeline.`);
      itinerary = await this.repairService.repair(itinerary, errors, providerName);
    }

    // ── Stage 6: Image & Metadata Enrichment ──
    itinerary = await this.enricher.enrich(itinerary, context);

    // ── Stage 7: Cache & History ──
    await this.cacheService.set(cacheKey, itinerary, 86400); // 24h

    const historyKey = CacheService.buildKey('ai', 'history', userId);
    const existingHistory = (await this.cacheService.get<unknown[]>(historyKey)) || [];
    existingHistory.unshift({
      timestamp: new Date().toISOString(),
      latencyMs: Date.now() - startTimestamp,
      destination: dto.destination,
    });
    await this.cacheService.set(historyKey, existingHistory.slice(0, 50), 604800);

    const totalMs = Date.now() - startTimestamp;
    this.logger.log(`[Pipeline Complete] destination=${dto.destination} latency=${totalMs}ms`);

    return itinerary;
  }

  async editTrip(itinerary: Itinerary, prompt: string, provider?: string): Promise<Itinerary> {
    const editPrompt = getCopilotEditPrompt(itinerary, prompt);
    const raw = await this.aiManager.generateText('complex-itinerary', editPrompt, undefined, {
      model: provider,
    });

    const parsedJson = JSON.parse(this.cleanMarkdownWrap(raw)) as Itinerary;
    const mockContext = { destination: parsedJson.destination || 'Unknown' };
    return this.enricher.enrich(
      parsedJson,
      mockContext as unknown as import('../dto/planner-context.dto').PlannerContext,
    );
  }

  async *streamPlanTrip(
    dto: PlanTripDto,
    providerName?: string,
    userId: string = 'sandbox-user-id',
  ): AsyncGenerator<string, void, unknown> {
    const startTimestamp = Date.now();
    
    yield JSON.stringify({ type: 'progress', step: 0, text: 'Understanding your request...' });

    const cacheKey = CacheService.buildKey(
      'ai', 'plan', encodeURIComponent(dto.destination), dto.startDate, dto.endDate, String(dto.budget), dto.currency || 'USD'
    );

    const cached = await this.cacheService.get<Itinerary>(cacheKey);
    if (cached) {
      // yield JSON.stringify({ type: 'progress', step: 5, text: 'Found cached trip...' });
      // yield JSON.stringify({ type: 'result', itinerary: cached });
      // return;
    }

    yield JSON.stringify({ type: 'progress', step: 1, text: 'Searching destinations & checking weather...' });
    const context = await this.contextOrchestrator.buildContext(dto);

    yield JSON.stringify({ type: 'progress', step: 2, text: 'Optimizing routes & finding places...' });
    const { systemPrompt, userPrompt } = this.promptBuilder.build(dto, context);

    const rawText = await this.aiManager.generateText(
      'complex-itinerary',
      userPrompt,
      systemPrompt,
      { model: providerName, temperature: 0.7 },
    );

    yield JSON.stringify({ type: 'progress', step: 3, text: 'Calculating budget...' });
    let itinerary: Itinerary;
    try {
      const cleanedText = this.cleanMarkdownWrap(rawText);
      itinerary = JSON.parse(cleanedText) as Itinerary;
    } catch (parseError) {
      const errors = [{ type: 'schema' as const, message: 'JSON parse failed' }];
      itinerary = await this.repairService.repair({} as Itinerary, errors, providerName);
    }

    const errors = this.validator.validate(itinerary);
    if (errors.length > 0) {
      itinerary = await this.repairService.repair(itinerary, errors, providerName);
    }

    yield JSON.stringify({ type: 'progress', step: 4, text: 'Finalizing your trip...' });
    itinerary = await this.enricher.enrich(itinerary, context);

    await this.cacheService.set(cacheKey, itinerary, 86400);

    const historyKey = CacheService.buildKey('ai', 'history', userId);
    const existingHistory = (await this.cacheService.get<unknown[]>(historyKey)) || [];
    existingHistory.unshift({
      timestamp: new Date().toISOString(),
      latencyMs: Date.now() - startTimestamp,
      destination: dto.destination,
    });
    await this.cacheService.set(historyKey, existingHistory.slice(0, 50), 604800);

    yield JSON.stringify({ type: 'progress', step: 5, text: 'Done' });
    yield JSON.stringify({ type: 'result', itinerary });
  }

  private cleanMarkdownWrap(raw: string): string {
    let text = raw.trim();
    if (text.startsWith('```')) {
      const startIdx = text.indexOf('\n');
      const endIdx = text.lastIndexOf('```');
      if (startIdx !== -1 && endIdx !== -1) {
        text = text.substring(startIdx + 1, endIdx).trim();
      }
    }
    return text;
  }
}
