import type { AITripPlan } from './types';

export class PlannerCache {
  private cache: Map<string, AITripPlan> = new Map();

  setPlan(sessionId: string, plan: AITripPlan): void {
    this.cache.set(sessionId, plan);
  }

  getPlan(sessionId: string): AITripPlan | undefined {
    return this.cache.get(sessionId);
  }

  clearPlan(sessionId: string): void {
    this.cache.delete(sessionId);
  }
}

export const plannerCache = new PlannerCache();
