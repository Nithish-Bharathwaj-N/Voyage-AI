import { Injectable, Logger } from '@nestjs/common';
import { PlanTripDto } from '../dto/plan-trip.dto';
import { PlannerContext } from '../dto/planner-context.dto';
import { PlaceResult } from '../../integrations/interfaces/place.interface';

const MAX_ATTRACTIONS_IN_PROMPT = 15;
const MAX_RESTAURANTS_IN_PROMPT = 8;
const MAX_MUSEUMS_IN_PROMPT = 6;
const MAX_HOLIDAYS_IN_PROMPT = 5;

export interface BuiltPrompt {
  systemPrompt: string;
  userPrompt: string;
}

function formatPlace(p: PlaceResult): string {
  const parts: string[] = [p.name];
  if (p.rating) parts.push(`★${p.rating}`);
  if (p.types && p.types.length > 0) parts.push(`[${p.types[0].replace(/_/g, ' ')}]`);
  if (p.address) parts.push(p.address.split(',')[0]);
  return parts.join(' · ');
}

/**
 * PlannerPromptBuilder (Phase 3 — Complete Rewrite)
 *
 * This is the core intelligence layer of VoyageAI.
 * Produces the most detailed, context-grounded travel planning prompt possible.
 *
 * Key upgrades from Phase 2:
 * - 6 expert consultant roles in system prompt
 * - Strict time-of-day scheduling (Morning / Lunch / Afternoon / Sunset / Dinner / Night)
 * - Zero tolerance for generic labels ("Arrival", "Check in", "Hotel", "Free time")
 * - Per-activity requirement for: bestVisitingTime, aiNotes, nearbyRestaurants, nearbyAttractions, transportAdvice, alternativeActivity
 * - Injected real place data in 3 categories (attractions, restaurants, museums)
 * - Expanded JSON schema example with all new fields
 */
@Injectable()
export class PlannerPromptBuilder {
  private readonly logger = new Logger(PlannerPromptBuilder.name);

  buildSystemPrompt(): string {
    return `You are VoyageAI — an elite travel intelligence system powered by the combined expertise of:

1. SENIOR TRAVEL CONSULTANT (15 years experience): You know every destination intimately. You recommend hidden gems alongside iconic landmarks. You build itineraries that flow naturally and feel lived-in.

2. PROFESSIONAL LOCAL GUIDE: You know each neighbourhood's character. You know which spots to visit before 9AM, which to avoid on weekends, where locals actually eat, and which tourist traps to skip.

3. TRIP OPTIMIZER: You sequence activities geographically to minimise transit time. You never schedule two activities on opposite sides of the city back-to-back. You cluster nearby attractions together.

4. BUDGET PLANNER: You know exact local pricing. Entry fees, meal costs, transport fares — all are accurate for the destination and currency. You never invent costs. You stay strictly within the user's budget.

5. WEATHER ADVISOR: You factor live weather into every day. You move outdoor activities to the morning if afternoon rain is forecast. You suggest indoor alternatives when conditions are poor.

6. TRANSPORTATION EXPERT: You specify the exact transport method between every activity. You know which subway lines, bus routes, or tuk-tuks connect each place. You include realistic travel times.

═══════════════════════════════════════════════════════════════
CRITICAL INSTRUCTIONS — VIOLATIONS WILL CAUSE REJECTION
═══════════════════════════════════════════════════════════════

RULE 1 — KNOWLEDGE ENGINE STRICT ADHERENCE:
You are the reasoning engine, NOT the knowledge provider.
You MUST construct the itinerary using EXCLUSIVELY the provided "VOYAGEAI KNOWLEDGE ENGINE DATA" and "VERIFIED REAL PLACES" below.
Use the demographic data, travel warnings, local etiquette, drone regulations, scam warnings, and hidden gems provided in the Knowledge Engine Data to construct personalized reasoning.
NEVER invent places. NEVER hallucinate facts. If it is not in the context, do not suggest it.

RULE 2 — FORBIDDEN ACTIVITY LABELS (instant rejection):
The following activity names will cause automatic rejection:
- "Arrival", "Check in", "Check out", "Hotel", "Airport transfer"
- "Free time", "Leisure time", "Rest", "Relax at hotel"
- "Visit a museum" (must name the specific museum)
- "Explore the city" (must specify the neighbourhood/street/landmark)
- Any activity without a specific named location

RULE 3 — TIME-OF-DAY STRUCTURE (every day must follow this):
- 08:00–09:00: MORNING — Early visit (temple, market, viewpoint — before crowds)
- 09:30–11:30: MID-MORNING — Primary landmark or cultural site
- 12:00–13:30: LUNCH — Named local restaurant (from verified list if possible)
- 14:00–16:30: AFTERNOON — Secondary attraction or neighbourhood walk
- 17:00–18:30: SUNSET — Viewpoint, park, or scenic spot at golden hour
- 19:30–21:00: DINNER — Named restaurant with cuisine type and price range
- 21:30+: NIGHT — Optional: night market, bar street, evening show (if appropriate)

RULE 4 — EVERY ACTIVITY MUST INCLUDE:
- time, location (specific place name), activity (specific description)
- durationMinutes, estimatedCost, currency, travelTimeMinutes
- coordinates (exact latitude/longitude — NEVER 0.0)
- category: one of [Sightseeing, Dining, Culture, Nature, Shopping, Nightlife, Transport]
- imageQuery: a precise English phrase for image search (e.g. "Fushimi Inari gates Kyoto Japan")
- bestVisitingTime: specific time advice (e.g. "Visit before 8AM for empty paths")
- aiNotes: 1-2 sentence expert tip that surprises and delights
- alternativeActivity: specific named alternative if this place is closed or crowded
- transportAdvice: exact transport method from previous activity
- nearbyRestaurants: exactly 2 nearby options (name + cuisine + walkingMinutes)
- nearbyAttractions: exactly 2 nearby options (name + category + walkingMinutes)
- explainableReasoning: Start with "Recommended because..." and list bullet points (✓ Matches budget, ✓ Low crowd).
- warnings: any relevant safety, booking, or visa warnings

RULE 5 — QUALITY BAR:
Each day must have 5-7 activities covering the full time-of-day arc.
Each day must have: theme, weatherNotes, budgetForDay, transportSummary, morningNote, eveningNote.
totalEstimatedCost must equal the exact sum of all activity estimatedCost values.

FORMATTING:
- Respond with a SINGLE valid JSON object. No markdown. No explanation. No comments.
- All strings double-quoted. No trailing commas. Valid JSON only.`;
  }

  buildUserPrompt(dto: PlanTripDto, context: PlannerContext): string {
    const ageSummary = dto.travelerAges?.length ? ` (Ages: ${dto.travelerAges.join(', ')})` : '';
    const currency = dto.currency || 'USD';

    // ── Weather context ──
    const weatherSection = context.weather
      ? `Temperature: ${context.weather.temperature}°C | Condition: ${context.weather.condition} | Humidity: ${context.weather.humidity ?? 'N/A'}%${context.weather.forecastText ? ` | ${context.weather.forecastText}` : ''}`
      : 'Weather data unavailable — plan for typical seasonal conditions';

    // ── Location context ──
    const locationSection = context.geocode
      ? `${context.geocode.formattedAddress} (${context.geocode.latitude.toFixed(4)}, ${context.geocode.longitude.toFixed(4)})`
      : dto.destination;

    // ── Country / timezone ──
    const countrySection = context.country
      ? `${context.country.name} | Capital: ${context.country.capital ?? 'N/A'} | Languages: ${context.country.languages.slice(0, 3).join(', ')} | Currency: ${context.country.currencies?.[0] ?? currency}`
      : dto.destination;

    const timezoneSection = context.timezone
      ? `${context.timezone.timezoneId} (UTC${context.timezone.offsetHours >= 0 ? '+' : ''}${context.timezone.offsetHours})`
      : 'UTC';

    const exchangeSection =
      context.exchangeRate && currency !== 'USD' && context.exchangeRate.rates[currency]
        ? `1 USD = ${context.exchangeRate.rates[currency]} ${currency}`
        : `Currency is ${currency}`;

    // ── Holidays ──
    const holidaySection =
      context.holidays.length > 0
        ? context.holidays
            .slice(0, MAX_HOLIDAYS_IN_PROMPT)
            .map((h) => `  • ${h.date}: ${h.name}`)
            .join('\n')
        : '  • No public holidays during trip window';

    // ── Place sections ──
    const attractionsSection =
      context.attractions.length > 0
        ? context.attractions
            .slice(0, MAX_ATTRACTIONS_IN_PROMPT)
            .map(
              (p, i) =>
                `  ${i + 1}. ${formatPlace(p)} [${p.latitude.toFixed(4)}, ${p.longitude.toFixed(4)}]`,
            )
            .join('\n')
        : '  • Use globally known landmarks for this destination';

    const restaurantsSection =
      context.restaurants.length > 0
        ? context.restaurants
            .slice(0, MAX_RESTAURANTS_IN_PROMPT)
            .map(
              (p, i) =>
                `  ${i + 1}. ${formatPlace(p)} [${p.latitude.toFixed(4)}, ${p.longitude.toFixed(4)}]`,
            )
            .join('\n')
        : '  • Use well-known local restaurants';

    const museumsSection =
      context.museums.length > 0
        ? context.museums
            .slice(0, MAX_MUSEUMS_IN_PROMPT)
            .map(
              (p, i) =>
                `  ${i + 1}. ${formatPlace(p)} [${p.latitude.toFixed(4)}, ${p.longitude.toFixed(4)}]`,
            )
            .join('\n')
        : '  • Use well-known museums for this destination';

    // ── Build example activity for schema reference ──
    const exampleLat = context.geocode?.latitude.toFixed(6) ?? '35.6762';
    const exampleLng = context.geocode?.longitude.toFixed(6) ?? '139.6503';
    const exampleRestaurant1 = context.restaurants[0]?.name ?? 'Local Restaurant Name';
    const exampleRestaurant2 = context.restaurants[1]?.name ?? 'Another Restaurant Name';
    const exampleAttraction1 = context.attractions[1]?.name ?? 'Nearby Landmark';
    const exampleAttraction2 = context.attractions[2]?.name ?? 'Another Attraction';

    const prompt = `Plan a premium, expertly crafted travel itinerary for the following trip:

╔══════════════════════════════════════════════════════════════╗
║ TRIP PARAMETERS                                              ║
╚══════════════════════════════════════════════════════════════╝
Destination:        ${dto.destination}
Dates:              ${dto.startDate} to ${dto.endDate}
Budget:             ${dto.budget} ${currency} (total for entire trip)
Travellers:         ${dto.travelerCount}${ageSummary}
Travel Style:       ${dto.travelStyle || 'Cultural & Immersive'}
Interests:          ${dto.interests?.join(', ') || 'History, food, local culture, architecture'}
Dietary Needs:      ${dto.foodPreferences?.join(', ') || 'None'}
Accessibility:      ${dto.accessibilityNeeds?.join(', ') || 'None'}
Transport Pref:     ${dto.transportationPreference || 'Public transport + walking'}
Accommodation:      ${dto.accommodationPreference || 'Central mid-range hotel'}
Active Hours:       ${dto.workingHours || '08:00–22:00'}

╔══════════════════════════════════════════════════════════════╗
║ LIVE DESTINATION INTELLIGENCE                                ║
╚══════════════════════════════════════════════════════════════╝
Location:           ${locationSection}
Country:            ${countrySection}
Timezone:           ${timezoneSection}
Exchange:           ${exchangeSection}
Weather Now:        ${weatherSection}

PUBLIC HOLIDAYS DURING TRIP:
${holidaySection}

╔══════════════════════════════════════════════════════════════╗
║ VOYAGEAI KNOWLEDGE ENGINE DATA                               ║
╚══════════════════════════════════════════════════════════════╝
${context.staticKnowledge ? JSON.stringify(context.staticKnowledge, null, 2) : 'No deep knowledge found. Rely on verified places below.'}

SEASONAL INTELLIGENCE INSIGHTS:
${context.seasonalInsights?.length ? context.seasonalInsights.join('\n') : 'No seasonal insights available.'}

NEARBY HIDDEN GEMS TO CONSIDER IN ROUTING:
${context.nearbyHiddenGems?.length ? JSON.stringify(context.nearbyHiddenGems, null, 2) : 'None found.'}

╔══════════════════════════════════════════════════════════════╗
║ VERIFIED REAL PLACES — USE THESE                            ║
╚══════════════════════════════════════════════════════════════╝

TOURIST ATTRACTIONS (prioritise these for sightseeing activities):
${attractionsSection}

RESTAURANTS (use these for Lunch and Dinner activities):
${restaurantsSection}

MUSEUMS (use these for Culture activities):
${museumsSection}

╔══════════════════════════════════════════════════════════════╗
║ REQUIRED JSON OUTPUT SCHEMA                                 ║
╚══════════════════════════════════════════════════════════════╝
{
  "destination": "${dto.destination}",
  "startDate": "${dto.startDate}",
  "endDate": "${dto.endDate}",
  "budgetLimit": ${dto.budget},
  "currency": "${currency}",
  "totalEstimatedCost": 0,
  "country": "${context.country?.name ?? dto.destination}",
  "timezone": "${context.timezone?.timezoneId ?? 'UTC'}",
  "coordinates": {
    "latitude": ${context.geocode?.latitude ?? 0},
    "longitude": ${context.geocode?.longitude ?? 0}
  },
  "days": [
    {
      "dayNumber": 1,
      "date": "${dto.startDate}",
      "theme": "Evocative theme title for the day",
      "weatherNotes": "Specific weather guidance affecting today's schedule",
      "foodSuggestions": ["Specific dish name at Specific Restaurant"],
      "travelInsights": ["Specific advice like 'This route gets crowded after 11AM' or 'Carry cash for the local market'"],
      "alternativePlans": {
         "budget": "Cheaper alternative day flow",
         "luxury": "Premium alternative day flow",
         "rain": "Indoor alternative day flow"
      },
      "hotelRecommendations": [
         { "name": "Best Match Hotel", "type": "Best" },
         { "name": "Cheaper Hotel", "type": "Budget" },
         { "name": "Eco Stay Name", "type": "Eco Stay" }
      ],
      "budgetForDay": 150,
      "totalWalkingKm": 6.5,
      "transportSummary": "Subway Line 1 + walking (approx 45 min transit total)",
      "morningNote": "Today opens with a peaceful temple visit at dawn before the crowds",
      "eveningNote": "End the day watching the neon skyline from the rooftop bar",
      "activities": [
        {
          "time": "08:00",
          "location": "Exact Named Place from Verified List",
          "activity": "Specific descriptive title of what you do here",
          "imageQuery": "Exact Place Name ${dto.destination} morning",
          "category": "Sightseeing",
          "durationMinutes": 90,
          "estimatedCost": 0,
          "currency": "${currency}",
          "travelTimeMinutes": 0,
          "coordinates": { "latitude": ${exampleLat}, "longitude": ${exampleLng} },
          "bestVisitingTime": "Arrive before 8:30AM for empty paths and best photos",
          "aiNotes": "Expert tip that reveals something surprising and local — not found in guidebooks",
          "alternativeActivity": "Specific named alternative if this place is crowded",
          "transportAdvice": "Walk 10 min from hotel, or take Bus 101 from Central Station (¥200)",
          "admissionNote": "Free entry. No booking required.",
          "accessibility": "Wheelchair accessible main paths. Stairs to upper shrine.",
          "explainableReasoning": "Recommended because: ✓ Matches ₹12,000 budget ✓ 3-hour drive ✓ Excellent wildlife photography",
          "warnings": ["Remove shoes before entering inner shrine"],
          "nearbyRestaurants": [
            { "name": "${exampleRestaurant1}", "category": "Traditional Japanese", "walkingMinutes": 5, "rating": 4.5, "priceLevel": 2 },
            { "name": "${exampleRestaurant2}", "category": "Street Food", "walkingMinutes": 8, "rating": 4.2, "priceLevel": 1 }
          ],
          "nearbyAttractions": [
            { "name": "${exampleAttraction1}", "category": "Landmark", "walkingMinutes": 7 },
            { "name": "${exampleAttraction2}", "category": "Market", "walkingMinutes": 12 }
          ]
        }
      ]
    }
  ]
}

Generate ${this.countDays(dto.startDate, dto.endDate)} days. Each day must have 5-7 activities.
Set totalEstimatedCost to the exact sum of all estimatedCost values.
Output ONLY the JSON. No markdown. No explanation.`;

    this.logger.debug(
      `[PromptBuilder] Prompt length: ${prompt.length} chars | Attractions: ${context.attractions.length} | Restaurants: ${context.restaurants.length} | Museums: ${context.museums.length}`,
    );

    return prompt;
  }

  build(dto: PlanTripDto, context: PlannerContext): BuiltPrompt {
    return {
      systemPrompt: this.buildSystemPrompt(),
      userPrompt: this.buildUserPrompt(dto, context),
    };
  }

  private countDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end.getTime() - start.getTime();
    return Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);
  }
}
