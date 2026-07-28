import { BaseAIService } from './BaseAIService';
import { plannerValidator } from '../planner/PlannerValidator';
import { plannerMapper } from '../planner/PlannerMapper';
import type { PromptDomain } from '../types/prompt.types';
import type { PlannerInputData, AITripPlan } from '../planner/types';

export class PlannerAIService extends BaseAIService<Partial<PlannerInputData>, AITripPlan> {
  protected get domain(): PromptDomain {
    return 'trip-planner';
  }

  protected validate(input: Partial<PlannerInputData>): boolean {
    return plannerValidator.validate(input);
  }

  protected mapResponse(rawOutput: string): AITripPlan {
    return plannerMapper.parseFinal(rawOutput);
  }

  protected override mapStreamChunk(rawChunk: string): Partial<AITripPlan> | null {
    return plannerMapper.parsePartialStream(rawChunk);
  }
}

export const plannerAIService = new PlannerAIService();
