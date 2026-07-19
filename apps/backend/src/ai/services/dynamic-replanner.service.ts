import { Injectable, Logger } from '@nestjs/common';
import { AiProviderManager } from './ai-provider-manager.service';
import { PlannerContextOrchestrator } from './planner-context.service';
import { PlannerPromptBuilder } from './planner-prompt-builder.service';
import { PlanTripDto } from '../dto/plan-trip.dto';
import { Itinerary } from '../interfaces/itinerary.interface';

import { AiTaskType } from './ai-router.service';

@Injectable()
export class DynamicReplannerService {
  private readonly logger = new Logger(DynamicReplannerService.name);

  constructor(
    private readonly providerManager: AiProviderManager,
    private readonly contextOrchestrator: PlannerContextOrchestrator,
    private readonly promptBuilder: PlannerPromptBuilder,
  ) {}

  /**
   * Dynamically regenerates parts of an itinerary based on user changes (e.g. Budget changed, or "It will rain on day 2").
   * Instructs the LLM to preserve the unmodified days to ensure fast replanning and consistency.
   */
  async replanTrip(
    dto: PlanTripDto, 
    existingItinerary: Itinerary, 
    changeInstruction: string,
    providerName = 'google'
  ): Promise<Itinerary> {
    this.logger.log(`Dynamic Replanning triggered for ${dto.destination}: "${changeInstruction}"`);
    
    const context = await this.contextOrchestrator.buildContext(dto);
    const basePrompts = this.promptBuilder.build(dto, context);

    const replanPrompt = `
You are performing DYNAMIC REPLANNING.
The user already has an existing itinerary, but they have requested a change:
"${changeInstruction}"

EXISTING ITINERARY:
${JSON.stringify(existingItinerary, null, 2)}

INSTRUCTIONS:
1. Identify which days or activities are affected by the user's change.
2. ONLY modify those specific days/activities.
3. Keep the rest of the itinerary exactly as it was. Do not rewrite unaffected days.
4. Output the FULL updated JSON itinerary matching the required schema.
`;

    const resultStr = await this.providerManager.generateText('ROUTING' as any, replanPrompt, basePrompts.systemPrompt, { temperature: 0.2 });
    
    try {
      const parsed = JSON.parse(resultStr);
      return parsed;
    } catch (e) {
      this.logger.error("Failed to parse replanned JSON", e);
      throw e;
    }
  }
}
