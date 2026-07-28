export interface PlannerTripState {
  id: string;
  name: string;
  budget: number;
  days: {
    date: string;
    activities: {
      id: string;
      placeName: string;
      startTime: string;
    }[];
  }[];
}

export interface KnowledgeContext {
  availablePlaces: {
    id: string;
    name: string;
    category: string;
    rating: number;
    descriptionSnippet: string;
  }[];
  weatherContext: string;
}

export class ContextBuilder {
  /**
   * Compresses massive database models into the minimal JSON structure 
   * required by the LLM, saving tokens and improving latency.
   */
  static buildPromptContext(
    tripState: PlannerTripState,
    knowledge: KnowledgeContext,
    userMessage: string
  ): string {
    const compressedContext = {
      trip: {
        budget: tripState.budget,
        days: tripState.days.map((d, i) => ({
          day: i,
          date: d.date,
          activities: d.activities.map(a => `${a.startTime}: ${a.placeName} (id: ${a.id})`)
        }))
      },
      knowledge: {
        weather: knowledge.weatherContext,
        places: knowledge.availablePlaces.map(p => ({
          id: p.id,
          name: p.name,
          cat: p.category,
          desc: p.descriptionSnippet
        }))
      }
    };

    return `
USER MESSAGE: 
${userMessage}

CURRENT TRIP STATE:
${JSON.stringify(compressedContext.trip, null, 2)}

KNOWLEDGE ENGINE DATA (You may ONLY suggest places from this list):
${JSON.stringify(compressedContext.knowledge, null, 2)}
    `.trim();
  }
}
