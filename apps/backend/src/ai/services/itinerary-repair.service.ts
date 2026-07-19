import { Injectable, Logger } from '@nestjs/common';
import { ValidationError } from './itinerary-validator.service';
import { AiProviderManager } from './ai-provider-manager.service';
import { Itinerary, DayPlan, ActivityItem } from '../interfaces/itinerary.interface';

@Injectable()
export class ItineraryRepairService {
  private readonly logger = new Logger(ItineraryRepairService.name);

  constructor(private readonly aiManager: AiProviderManager) {}

  /**
   * Attempts self-repair of an invalid itinerary by calling the LLM with error context,
   * falling back to rule-based post-processing if necessary.
   */
  async repair(
    itinerary: Itinerary,
    errors: ValidationError[],
    providerName?: string,
  ): Promise<Itinerary> {
    this.logger.log(`Initiating itinerary repair loop for ${errors.length} validation errors`);

    try {
      const repairPrompt = `The following travel itinerary JSON failed validation check:
${JSON.stringify(itinerary, null, 2)}

Errors detected:
${errors.map((e) => `- [${e.type}]: ${e.message}`).join('\n')}

Please fix these errors. You MUST:
- Eliminate overlapping activity times.
- Ensure total activity cost is strictly within the budget limit (${itinerary.budgetLimit} ${itinerary.currency}).
- Output the corrected itinerary in the exact same JSON format.
- Output RAW JSON only. Do not wrap in markdown tags or include comments.`;

      const repairedRaw = await this.aiManager.generateText(
        'complex-itinerary',
        repairPrompt,
        undefined,
        { model: providerName },
      );
      const cleaned = this.extractJson(repairedRaw);
      return JSON.parse(cleaned) as Itinerary;
    } catch (err) {
      this.logger.warn(
        `LLM self-repair attempt failed: ${(err as Error).message}. Falling back to rule-based recovery.`,
      );
      return this.ruleBasedRepair(itinerary, errors);
    }
  }

  /**
   * Rule-based fallback recovery mechanism.
   * Clamps cost within budget limits and fixes overlapping time ranges.
   */
  private ruleBasedRepair(itinerary: Itinerary, errors: ValidationError[]): Itinerary {
    this.logger.log(
      `Executing rule-based fallback itinerary repair for ${errors.length} validation errors`,
    );
    const repaired = JSON.parse(JSON.stringify(itinerary)) as Itinerary; // deep clone

    // Fix Budget Overflow
    const budgetLimit = repaired.budgetLimit || 1000;
    let totalCost = 0;

    repaired.days.forEach((day: DayPlan) => {
      if (Array.isArray(day.activities)) {
        day.activities.forEach((act: ActivityItem) => {
          totalCost += act.estimatedCost || 0;
        });
      }
    });

    if (totalCost > budgetLimit) {
      this.logger.warn(`Clamping activity costs to respect budget limit: ${budgetLimit}`);
      const reductionFactor = budgetLimit / totalCost;
      repaired.days.forEach((day: DayPlan) => {
        if (Array.isArray(day.activities)) {
          day.activities.forEach((act: ActivityItem) => {
            if (act.estimatedCost) {
              act.estimatedCost = Math.round(act.estimatedCost * reductionFactor * 100) / 100;
            }
          });
        }
      });
    }

    // Fix Time Overlaps (Simple shift)
    repaired.days.forEach((day: DayPlan) => {
      if (Array.isArray(day.activities) && day.activities.length > 0) {
        day.activities.sort((a: ActivityItem, b: ActivityItem) => {
          const timeA = a.time || '00:00';
          const timeB = b.time || '00:00';
          return timeA.localeCompare(timeB);
        });

        for (let i = 0; i < day.activities.length - 1; i++) {
          const current = day.activities[i];
          const next = day.activities[i + 1];

          if (current.time && next.time) {
            const currentParts = current.time.split(':');
            const nextParts = next.time.split(':');

            const currentStart = parseInt(currentParts[0], 10) * 60 + parseInt(currentParts[1], 10);
            const currentEnd = currentStart + (current.durationMinutes || 60);

            const nextStart = parseInt(nextParts[0], 10) * 60 + parseInt(nextParts[1], 10);

            if (currentEnd > nextStart) {
              // Shift next activity start time to current end time
              const shiftedHour = Math.floor(currentEnd / 60) % 24;
              const shiftedMinute = currentEnd % 60;
              next.time = `${String(shiftedHour).padStart(2, '0')}:${String(shiftedMinute).padStart(2, '0')}`;
              this.logger.warn(`Shifted activity "${next.activity}" schedule to avoid overlap.`);
            }
          }
        }
      }
    });

    return repaired;
  }

  private extractJson(raw: string): string {
    let cleaned = raw.trim();
    if (cleaned.startsWith('```')) {
      const firstLineBreak = cleaned.indexOf('\n');
      const lastCodeBlock = cleaned.lastIndexOf('```');
      if (firstLineBreak !== -1 && lastCodeBlock !== -1) {
        cleaned = cleaned.substring(firstLineBreak + 1, lastCodeBlock).trim();
      }
    }
    return cleaned;
  }
}
