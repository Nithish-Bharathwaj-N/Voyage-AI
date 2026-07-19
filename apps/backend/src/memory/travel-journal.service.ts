import { Injectable, Logger } from '@nestjs/common';
import { Itinerary } from '../ai/interfaces/itinerary.interface';

export interface TravelMemory {
  itineraryId: string;
  totalDistanceKm: number;
  visitedPlacesCount: number;
  citiesVisited: string[];
  aiTravelStory: string;
  shareableUrl: string;
}

@Injectable()
export class TravelJournalService {
  private readonly logger = new Logger(TravelJournalService.name);

  /**
   * Called when a trip concludes. Generates a lasting memory object.
   */
  public async generateJournal(itinerary: Itinerary): Promise<TravelMemory> {
    this.logger.log(`Generating Travel Memory for ${itinerary.destination}`);

    // In production, we'd use Gemini to write an evocative travel story based on the actual tracked movements
    const story = `Your unforgettable journey through ${itinerary.destination}. You explored hidden gems and experienced local culture across ${itinerary.days.length} beautiful days.`;

    return {
      itineraryId: 'fake-id',
      totalDistanceKm: 420,
      visitedPlacesCount: itinerary.days.reduce((acc, d) => acc + (d.activities?.length || 0), 0),
      citiesVisited: [itinerary.destination],
      aiTravelStory: story,
      shareableUrl: `https://voyageai.com/memory/${itinerary.destination.replace(/\\s+/g, '-').toLowerCase()}-trip`
    };
  }
}
