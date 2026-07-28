import type { PlannerInputData } from './types';

export class PlannerValidator {
  validate(data: Partial<PlannerInputData>): boolean {
    if (!data.destinations || data.destinations.length === 0) return false;
    if (!data.travelDates || !data.travelDates.start || !data.travelDates.end) return false;
    if (!data.budget) return false;
    return true;
  }
}

export const plannerValidator = new PlannerValidator();
