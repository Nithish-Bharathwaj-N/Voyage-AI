import type { AssistantMessage } from './types';
import type { AITripPlan } from '../planner/types';

export class ConversationContext {
  public activeTripPlan: AITripPlan | null = null;
  public currentDestination: string | null = null;
  public currentIntent: string | null = null;
  public currentBudget: string | null = null;
  public currentPreferences: string[] = [];
  public currentWeather: string | null = null;

  updateFromPlan(plan: AITripPlan) {
    this.activeTripPlan = plan;
    if (plan.budget) this.currentBudget = plan.budget;
    if (plan.weather) this.currentWeather = plan.weather;
  }
}
