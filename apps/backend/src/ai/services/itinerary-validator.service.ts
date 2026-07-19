import { Injectable } from '@nestjs/common';
import { Itinerary, DayPlan, ActivityItem } from '../interfaces/itinerary.interface';
import { RouteOptimizerService } from './route-optimizer.service';

export type ValidationErrorType =
  | 'schema'
  | 'date_range'
  | 'time_conflict'
  | 'budget_overflow'
  | 'duplicate_activity'
  | 'closed_attraction'
  | 'missing_coordinates'
  | 'placeholder_detected'
  | 'insufficient_activities'
  | 'inefficient_route';

export interface ValidationError {
  type: ValidationErrorType;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Forbidden generic labels — any activity whose name contains these strings
 * indicates the LLM generated placeholder content instead of real places.
 */
const FORBIDDEN_LABELS = [
  'arrival',
  'check in',
  'check out',
  'check-in',
  'check-out',
  'airport transfer',
  'free time',
  'leisure time',
  'rest at hotel',
  'relax at hotel',
  'visit a museum',
  'explore the city',
  'hotel',
  'transfer',
];

/**
 * ItineraryValidatorService (Phase 3 upgrade)
 *
 * Phase 2: Schema, date range, time conflicts, budget overflow, duplicates.
 * Phase 3: Added:
 *   - missing_coordinates: coordinates === 0 or undefined
 *   - placeholder_detected: generic labels indicating LLM did not use real places
 *   - insufficient_activities: < 4 activities per day
 */
@Injectable()
export class ItineraryValidatorService {
  constructor(private readonly routeOptimizer: RouteOptimizerService) {}

  validate(itinerary: Itinerary): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!itinerary) {
      errors.push({ type: 'schema', message: 'Itinerary payload is empty or invalid JSON.' });
      return errors;
    }

    // 1. Basic schema checks
    if (!itinerary.destination) {
      errors.push({ type: 'schema', message: 'Missing property "destination".' });
    }
    if (!itinerary.startDate || !itinerary.endDate) {
      errors.push({ type: 'schema', message: 'Missing properties "startDate" or "endDate".' });
    }
    if (!Array.isArray(itinerary.days)) {
      errors.push({ type: 'schema', message: 'Property "days" must be an array.' });
      return errors;
    }

    const tripStart = new Date(itinerary.startDate);
    const tripEnd = new Date(itinerary.endDate);
    let calculatedCost = 0;
    const seenActivities = new Set<string>();

    itinerary.days.forEach((day: DayPlan, idx: number) => {
      const dayNum = day.dayNumber || idx + 1;
      const dateStr = day.date;

      // 2. Date range check
      if (dateStr) {
        const dayDate = new Date(dateStr);
        if (dayDate < tripStart || dayDate > tripEnd) {
          errors.push({
            type: 'date_range',
            message: `Day ${dayNum} date (${dateStr}) is outside trip dates.`,
            details: { dayNum, dateStr },
          });
        }
      }

      if (!Array.isArray(day.activities)) return;

      // 3. Insufficient activities check (Phase 3)
      if (day.activities.length < 4) {
        errors.push({
          type: 'insufficient_activities',
          message: `Day ${dayNum} has only ${day.activities.length} activities. Minimum 4 required.`,
          details: { dayNum, count: day.activities.length },
        });
      }

      const activitySchedules: { start: number; end: number; name: string }[] = [];

      day.activities.forEach((activity: ActivityItem) => {
        if (!activity.activity) {
          errors.push({
            type: 'schema',
            message: `Activity on Day ${dayNum} is missing "activity".`,
          });
          return;
        }

        const activityName = activity.activity;
        const lowerName = activityName.toLowerCase();
        const locationName = (activity.location || '').toLowerCase();

        // 4. Placeholder detection (Phase 3)
        const isForbidden = FORBIDDEN_LABELS.some(
          (label) => lowerName.includes(label) || locationName.includes(label),
        );
        if (isForbidden) {
          errors.push({
            type: 'placeholder_detected',
            message: `Day ${dayNum}: Activity "${activityName}" at "${activity.location}" is a placeholder label. LLM must use specific real place names.`,
            details: { dayNum, activityName, location: activity.location },
          });
        }

        // 5. Missing coordinates check (Phase 3)
        const lat = activity.coordinates?.latitude;
        const lng = activity.coordinates?.longitude;
        if (!lat || !lng || lat === 0 || lng === 0) {
          errors.push({
            type: 'missing_coordinates',
            message: `Day ${dayNum}: Activity "${activityName}" has missing or zero coordinates.`,
            details: { dayNum, activityName, coordinates: activity.coordinates },
          });
        }

        // 6. Duplicate activity check
        if (seenActivities.has(lowerName)) {
          errors.push({
            type: 'duplicate_activity',
            message: `Duplicate activity "${activityName}" detected on Day ${dayNum}.`,
            details: { dayNum, activityName },
          });
        }
        seenActivities.add(lowerName);

        // Accumulate cost
        calculatedCost += activity.estimatedCost || 0;

        // 7. Time conflict check
        if (activity.time) {
          const timeParts = activity.time.split(':');
          if (timeParts.length >= 2) {
            const startMinutes = parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);
            const duration = activity.durationMinutes || 60;
            const endMinutes = startMinutes + duration;
            activitySchedules.push({ start: startMinutes, end: endMinutes, name: activityName });
          }
        }
      });

      // Check overlapping time intervals
      activitySchedules.sort((a, b) => a.start - b.start);
      for (let i = 0; i < activitySchedules.length - 1; i++) {
        const current = activitySchedules[i];
        const next = activitySchedules[i + 1];
        if (current.end > next.start) {
          errors.push({
            type: 'time_conflict',
            message: `Day ${dayNum}: Time overlap between "${current.name}" and "${next.name}".`,
            details: { dayNum, activityA: current.name, activityB: next.name },
          });
        }
      }

      // 8. Route Efficiency check (Phase 6)
      if (!this.routeOptimizer.validateRouteEfficiency(day.activities)) {
         errors.push({
            type: 'inefficient_route',
            message: `Day ${dayNum}: Activities are geographically scattered resulting in excessive driving distances. Optimize the route to cluster nearby places.`,
            details: { dayNum }
         });
      }
    });

    // 8. Budget overflow check
    if (itinerary.budgetLimit && calculatedCost > itinerary.budgetLimit * 1.1) {
      // Allow 10% over-budget before flagging
      errors.push({
        type: 'budget_overflow',
        message: `Total estimated cost (${calculatedCost} ${itinerary.currency}) exceeds budget limit (${itinerary.budgetLimit} ${itinerary.currency}) by more than 10%.`,
        details: { totalEstimatedCost: calculatedCost, budgetLimit: itinerary.budgetLimit },
      });
    }

    return errors;
  }
}
