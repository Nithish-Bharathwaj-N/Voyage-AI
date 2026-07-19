/* eslint-disable @typescript-eslint/no-explicit-any */
export const PLANNER_SYSTEM_PROMPT = `You are VoyageAI, a world-class travel planning expert.
Your job is to generate a comprehensive, highly personalized, and structurally valid travel itinerary based on the user's constraints and travel context.

CRITICAL FORMATTING INSTRUCTIONS:
1. You MUST respond with a single, valid JSON object matching the requested schema exactly.
2. Do NOT wrap the JSON inside markdown code blocks (e.g. \`\`\`json ... \`\`\`). Output raw JSON only.
3. Never include conversational text, notes, explanation, or comments outside the JSON structure.
4. Double check all JSON syntax. All strings must be double-quoted. No trailing commas.

ITINERARY RULES:
1. Activities must fit chronological dates.
2. Estimated costs must be realistic. Keep totals strictly within the requested budget limit.
3. Keep the schedule comfortable: budget adequate transit time between activities.
4. Add clear, helpful warnings (safety, reservations, visa warning) where applicable.
5. Suggest local food recommendations suitable to the user's dietary preferences.
6. Provide coordinates for each activity.`;

export const getPlannerUserPrompt = (dto: any, contextSummary: string): string => {
  const ageSummary = dto.travelerAges?.length ? ` (Ages: ${dto.travelerAges.join(', ')})` : '';

  return `Generate a travel itinerary based on the following travel context and inputs:

=== USER INPUTS ===
Destination: ${dto.destination}
Start Date: ${dto.startDate}
End Date: ${dto.endDate}
Budget Limit: ${dto.budget} ${dto.currency || 'USD'}
Traveler Count: ${dto.travelerCount}${ageSummary}
Travel Style: ${dto.travelStyle || 'Not specified'}
Interests: ${dto.interests?.join(', ') || 'General sightseeing'}
Dietary Restrictions: ${dto.foodPreferences?.join(', ') || 'None'}
Accessibility Needs: ${dto.accessibilityNeeds?.join(', ') || 'None'}
Transportation Preferences: ${dto.transportationPreference || 'Public transport'}
Accommodation Style: ${dto.accommodationPreference || 'Standard hotel'}
Working Hours: ${dto.workingHours || '09:00-18:00'}
Visa Citizen Country: ${dto.visaCountry || 'Not specified'}

=== LIVE TRAVEL CONTEXT ===
${contextSummary}

=== ITINERARY JSON SCHEMA ===
{
  "destination": "Paris, France",
  "startDate": "2026-07-10",
  "endDate": "2026-07-12",
  "budgetLimit": 2500,
  "currency": "USD",
  "totalEstimatedCost": 120,
  "days": [
    {
      "dayNumber": 1,
      "date": "2026-07-10",
      "theme": "Introduction to Paris Landmarks",
      "weatherNotes": "Light showers, 19°C. Best to plan indoor activities in the afternoon.",
      "foodSuggestions": [
        "Traditional French Bistro in Le Marais (Vegetarian options available)"
      ],
      "activities": [
        {
          "time": "09:30",
          "location": "Louvre Museum",
          "activity": "Guided tour of the main art galleries",
          "durationMinutes": 180,
          "estimatedCost": 22,
          "currency": "USD",
          "travelTimeMinutes": 15,
          "coordinates": {
            "latitude": 48.8606,
            "longitude": 2.3376
          },
          "reason": "Top interest matches: Art and Architecture. Indoor activity matching afternoon weather forecast.",
          "warnings": [
            "Requires advance ticket booking online."
          ],
          "category": "Culture",
          "imageQuery": "Louvre Museum Paris exterior",
          "bestVisitingTime": "Early morning before 9AM to avoid main crowds",
          "aiNotes": "The Mona Lisa is in the Denon Wing. Go there first.",
          "transportAdvice": "Take Metro Line 1 to Palais Royal Musée du Louvre",
          "accessibility": "Fully wheelchair accessible with priority elevators",
          "nearbyRestaurants": [
            { "name": "Café Marly", "category": "French", "walkingMinutes": 2 }
          ],
          "nearbyAttractions": [
            { "name": "Tuileries Garden", "category": "Park", "walkingMinutes": 5 }
          ]
        }
      ],
      "alternativePlan": "Visit Centre Pompidou if Louvre is too crowded."
    }
  ]
}

Ensure the output is valid JSON matching this schema exactly. Include ALL intelligence fields (bestVisitingTime, aiNotes, transportAdvice, accessibility, nearbyRestaurants, nearbyAttractions) for EVERY activity to act as a world-class travel concierge.`;
};
