import type { AssistantResponse, AssistantAction } from './types';
import type { AITripPlan } from '../planner/types';

export class ResponseComposer {
  public compose(
    rawMessage: string,
    actions: AssistantAction[],
    followUps: string[],
    updatedPlan?: AITripPlan
  ): AssistantResponse {
    return {
      message: rawMessage,
      actions,
      followUps,
      updatedTripPlan: updatedPlan,
      metadata: {
        timestamp: new Date().toISOString(),
      }
    };
  }
}

export const responseComposer = new ResponseComposer();
