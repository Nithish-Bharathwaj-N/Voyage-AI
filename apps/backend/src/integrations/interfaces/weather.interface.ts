import { WeatherIntelligenceDto } from '../dto/weather.dto';

/**
 * Represents weather conditions for a location.
 */
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherProvider {
  getWeatherIntelligence(lat: number, lng: number, days?: number): Promise<WeatherIntelligenceDto>;

  // AI Helper Methods
  recommendBestTravelTime(weather: WeatherIntelligenceDto): string[];
  recommendIndoorActivities(weather: WeatherIntelligenceDto): boolean;
  recommendOutdoorActivities(weather: WeatherIntelligenceDto): boolean;
  calculateWeatherRisk(weather: WeatherIntelligenceDto): 'LOW' | 'MEDIUM' | 'HIGH';
  detectExtremeConditions(weather: WeatherIntelligenceDto): string[];
  estimatePhotographyConditions(weather: WeatherIntelligenceDto): string[];
}

export const WEATHER_PROVIDER = Symbol('IWeatherProvider');
