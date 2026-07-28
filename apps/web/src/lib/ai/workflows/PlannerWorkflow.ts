import { plannerAIService } from '../services/PlannerAIService';
import { plannerCache } from '../planner/PlannerCache';
import type { PlannerInputData, AITripPlan } from '../planner/types';
import type { AIWorkflow, WorkflowState, PlannerContext } from './types';

export class PlannerWorkflow implements AIWorkflow<Partial<PlannerInputData>, AITripPlan> {
  
  async execute(
    sessionId: string,
    input: Partial<PlannerInputData>,
    onStateChange?: (state: WorkflowState) => void,
    onStreamUpdate?: (partialPlan: Partial<AITripPlan> | null) => void
  ): Promise<AITripPlan> {
    
    try {
      const emit = (state: WorkflowState) => {
        if (onStateChange) onStateChange(state);
      };

      // 1. Validate trip
      emit('VALIDATING');
      if (!input.destinations || input.destinations.length === 0) {
        throw new Error('Destinations are required to plan a trip.');
      }

      // 2. Build Domain Context
      emit('LOADING_CONTEXT');
      const context: PlannerContext<Partial<PlannerInputData>> = {
        input,
        profile: { mock: true }, // Load profile
        collections: [],         // Load collections
        weather: { mock: true }  // Load weather
      };

      // 3. Execute AI
      emit('EXECUTING_AI');
      const finalPlan = await plannerAIService.execute(
        sessionId,
        context.input, // Just passing the input for now, but context is ready
        (partial) => {
          emit('STREAMING');
          if (onStreamUpdate) onStreamUpdate(partial);
        }
      );

      // 4. Validate output
      emit('VALIDATING_OUTPUT');
      if (!finalPlan || !finalPlan.days || finalPlan.days.length === 0) {
        throw new Error('AI Service returned an invalid or empty trip plan.');
      }

      // 5. Save draft
      emit('SAVING');
      plannerCache.setPlan(sessionId, finalPlan);

      // 6. Complete
      emit('COMPLETED');
      return finalPlan;

    } catch (err) {
      if (onStateChange) onStateChange('FAILED');
      throw err;
    }
  }
}

export const plannerWorkflow = new PlannerWorkflow();
