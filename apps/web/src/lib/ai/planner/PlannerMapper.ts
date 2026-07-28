import type { AITripPlan } from './types';

export class PlannerMapper {
  /**
   * Attempts to parse a potentially incomplete JSON string into a partial AITripPlan.
   * Useful for progressive rendering during streaming.
   */
  parsePartialStream(rawStream: string): Partial<AITripPlan> | null {
    try {
      // In a real scenario, this would use a library like 'json-parse-even-better-errors' 
      // or a custom stream parser to handle incomplete trailing braces.
      // For the mock, we wait until it's valid JSON or return null.
      const cleaned = rawStream.replace(/```json\n?/, '').replace(/```\n?$/, '').trim();
      return JSON.parse(cleaned) as AITripPlan;
    } catch {
      return null; // Stream not yet valid JSON
    }
  }

  parseFinal(rawString: string): AITripPlan {
    const cleaned = rawString.replace(/```json\n?/, '').replace(/```\n?$/, '').trim();
    return JSON.parse(cleaned) as AITripPlan;
  }
}

export const plannerMapper = new PlannerMapper();
