import { GeocodeDto } from '../../integrations/dto/maps.dto';
import { PlaceResult } from '../../integrations/interfaces/place.interface';
import { ImageResult } from '../../integrations/interfaces/images.interface';
import { CountryInfo } from '../../integrations/interfaces/country.interface';
import { TimezoneInfo } from '../../integrations/interfaces/timezone.interface';
import { PublicHoliday } from '../../integrations/interfaces/holiday.interface';
import { ExchangeRates } from '../../integrations/interfaces/exchange.interface';

export interface WeatherSummary {
  temperature: number;
  condition: string;
  humidity?: number;
  windSpeedKmh?: number;
  forecastText?: string;
}

/**
 * Fully typed context object assembled by PlannerContextOrchestrator.
 * Every field is nullable — provider failures degrade gracefully.
 * Phase 3: Added per-category place buckets for richer prompt injection.
 */
export interface PlannerContext {
  /** Resolved geocode for the destination */
  geocode: GeocodeDto | null;
  /** Current weather and short forecast */
  weather: WeatherSummary | null;
  /**
   * @deprecated Use attractions / restaurants / museums instead.
   * Kept for backward-compat with enricher.
   */
  places: PlaceResult[];
  /** Top tourist attractions near destination */
  attractions: PlaceResult[];
  /** Top restaurants near destination */
  restaurants: PlaceResult[];
  /** Top museums near destination */
  museums: PlaceResult[];
  /** Hero image for the destination from Unsplash */
  destinationImage: ImageResult | null;
  /** Country metadata */
  country: CountryInfo | null;
  /** Timezone details */
  timezone: TimezoneInfo | null;
  /** Public holidays that fall within the trip window */
  holidays: PublicHoliday[];
  /** Exchange rate context */
  exchangeRate: ExchangeRates | null;
  /** VoyageAI Static Knowledge Engine Data */
  staticKnowledge?: any;
  /** Nearby Hidden Gems for Network Planning */
  nearbyHiddenGems?: any[];
  /** Seasonal Insights from Seasonal Engine */
  seasonalInsights?: string[];
}
