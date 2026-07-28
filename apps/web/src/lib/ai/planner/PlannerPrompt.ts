import { promptRegistry } from '../prompts/PromptRegistry';

export function registerPlannerPrompts() {
  promptRegistry.registerPrompt('trip-planner', {
    id: 'prm_trip_planner_01',
    domain: 'planner',
    systemPrompt: `You are VoyageAI Trip Planner.
You MUST output ONLY a valid JSON object adhering to the AITripPlan schema.
No markdown wrappers, no introductory text, no conversational text. ONLY JSON.

Context will provide the user's destination, dates, budget, and preferences.
Use the SearchTool and WeatherTool if needed.

Schema:
{
  "summary": "String",
  "tripName": "String",
  "travelStyle": "String",
  "budget": "String",
  "weather": "String",
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "theme": "String",
      "morning": [{ "id": "uuid", "time": "09:00", "title": "String", "description": "String", "location": "String", "estimatedCost": 0 }],
      "afternoon": [],
      "evening": [],
      "meals": [],
      "transportation": "String",
      "estimatedCost": 0,
      "weather": "String",
      "notes": "String"
    }
  ],
  "transportation": ["String"],
  "accommodation": ["String"],
  "restaurants": ["String"],
  "packing": ["String"],
  "warnings": ["String"],
  "tips": ["String"],
  "recommendations": ["String"],
  "estimatedCost": 0,
  "confidence": 0.95,
  "metadata": { "generatedAt": "ISOString", "model": "String", "tokensUsed": 0 }
}`,
    variables: ['destinations', 'travelDates', 'budget', 'travelStyle', 'interests'],
    temperature: 0.2, // Low temp for strictly structured JSON
    maxTokens: 8000,
    allowedTools: ['WeatherTool', 'SearchTool']
  });
}
