import { Itinerary } from '../interfaces/itinerary.interface';
import { PlanTripDto } from '../dto/plan-trip.dto';

export const getOptimizationPrompt = (itinerary: Itinerary, targets: string[]): string => {
  return `Optimize the following travel itinerary with focus on: ${targets.join(', ')}.
Maintain the exact dates, destination, and core activities, but resequence, alter schedules, or replace activities where required to:
- Minimize transit times and travel distances (group nearby locations).
- Avoid conflicts with closing/opening hours.
- Keep total cost below the budget limit.

ITINERARY:
${JSON.stringify(itinerary, null, 2)}

Respond with the updated, optimized itinerary in the exact same JSON format.`;
};

export const getRegenerationPrompt = (
  dayNumber: number,
  activityName: string | undefined,
  itinerary: Itinerary,
  dto: PlanTripDto,
): string => {
  const target = activityName
    ? `activity "${activityName}" on Day ${dayNumber}`
    : `entire Day ${dayNumber}`;

  return `Regenerate the ${target} in the following itinerary.
Keep the rest of the itinerary unchanged, but replace the targeted component with a fresh, highly engaging alternative that matches the user style (${dto.travelStyle || 'General'}) and interests (${dto.interests?.join(', ') || 'Sightseeing'}).

ITINERARY:
${JSON.stringify(itinerary, null, 2)}

Respond with the updated itinerary in the exact same JSON format.`;
};

export const getCopilotEditPrompt = (itinerary: Itinerary, prompt: string): string => {
  return `You are VoyageAI Copilot, an expert AI travel planner.
The user has provided a natural language edit request to modify their existing itinerary.

USER REQUEST: "${prompt}"

CURRENT ITINERARY:
${JSON.stringify(itinerary, null, 2)}

INSTRUCTIONS:
1. Analyze the user's request and determine which days and activities need to be modified, added, removed, or moved.
2. Leave all unaffected days and activities COMPLETELY INTACT and EXACTLY AS THEY WERE.
3. For any activity you ADD or MODIFY, you MUST include a \`copilotReasoning\` string field (e.g. "Swapped museum for shopping per user request, reducing budget by $20").
4. Return the fully updated itinerary matching the exact same JSON schema as the input.
5. Do NOT include any markdown formatting, conversational text, or \`\`\`json blocks. Output ONLY valid JSON.
`;
};
