import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IWeatherProvider } from '../interfaces/weather.interface';
import { HttpService } from './http.service';
import { CacheService } from './cache.service';
import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';
import {
  WeatherIntelligenceDto,
  CurrentWeatherDto,
  HourlyForecastDto,
  DailyForecastDto,
  WeatherAlertDto,
} from '../dto/weather.dto';

const PROVIDER = 'WeatherService';
const OWM_ONECALL_BASE = 'https://api.openweathermap.org/data/3.0';
const CURRENT_TTL = 1800; // 30 minutes

interface OneCallResponse {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    visibility: number;
    clouds: number;
    uvi: number;
    weather: Array<{ main: string; icon: string }>;
    sunrise: number;
    sunset: number;
  };
  hourly: Array<{
    dt: number;
    temp: number;
    pop: number;
    weather: Array<{ main: string; icon: string }>;
  }>;
  daily: Array<{
    dt: number;
    temp: { min: number; max: number };
    pop: number;
    weather: Array<{ main: string; icon: string }>;
    moon_phase: number;
    sunset: number;
  }>;
  alerts?: Array<{
    event: string;
    description: string;
    start: number;
    end: number;
  }>;
}

/**
 * Weather Intelligence Provider backed by OpenWeatherMap API (One Call 3.0) and Tomorrow.io.
 */
@Injectable()
export class WeatherService implements IWeatherProvider {
  private readonly logger = new Logger(PROVIDER);
  private readonly apiKey: string | undefined;

  constructor(
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('integrations.openWeatherApiKey');
    if (!this.apiKey) {
      this.logger.warn('OPENWEATHER_API_KEY not configured — WeatherService will be unavailable');
    }
  }

  async getWeatherIntelligence(
    lat: number,
    lng: number,
    days = 7,
  ): Promise<WeatherIntelligenceDto> {
    if (!this.apiKey) {
      throw new ProviderUnavailableException(PROVIDER, 'OPENWEATHER_API_KEY is not configured');
    }

    const cacheKey = CacheService.buildKey(
      'weather',
      'intelligence',
      String(lat),
      String(lng),
      String(days),
    );
    const cached = await this.cacheService.get<WeatherIntelligenceDto>(cacheKey);
    if (cached) return cached;

    // Use OneCall API which provides current, minutely, hourly, daily, and alerts
    const url = `${OWM_ONECALL_BASE}/onecall?lat=${lat}&lon=${lng}&exclude=minutely&appid=${this.apiKey}&units=metric`;

    try {
      const response = await this.httpService.get<OneCallResponse>(PROVIDER, url);
      const data = response.data;

      const current: CurrentWeatherDto = {
        temperature: data.current.temp,
        feelsLike: data.current.feels_like,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed * 3.6, // m/s to km/h
        visibility: data.current.visibility || 10000,
        cloudCover: data.current.clouds,
        uvIndex: data.current.uvi,
        condition: data.current.weather[0]?.main || 'Clear',
        icon: data.current.weather[0]?.icon || '01d',
        sunrise: new Date(data.current.sunrise * 1000).toISOString(),
        sunset: new Date(data.current.sunset * 1000).toISOString(),
      };

      const hourly: HourlyForecastDto[] = (data.hourly || []).slice(0, 24).map((h) => ({
        timestamp: new Date(h.dt * 1000).toISOString(),
        temperature: h.temp,
        rainProbability: Math.round((h.pop || 0) * 100),
        condition: h.weather[0]?.main || 'Clear',
        icon: h.weather[0]?.icon || '01d',
      }));

      const daily: DailyForecastDto[] = (data.daily || []).slice(0, days).map((d) => ({
        date: new Date(d.dt * 1000).toISOString(),
        minTemp: d.temp.min,
        maxTemp: d.temp.max,
        rainProbability: Math.round((d.pop || 0) * 100),
        condition: d.weather[0]?.main || 'Clear',
        icon: d.weather[0]?.icon || '01d',
        moonPhase: this.getMoonPhase(d.moon_phase),
        goldenHour: new Date((d.sunset - 3600) * 1000).toISOString(), // Roughly 1h before sunset
        blueHour: new Date((d.sunset + 1800) * 1000).toISOString(), // Roughly 30m after sunset
      }));

      const alerts: WeatherAlertDto[] = (data.alerts || []).map((a) => ({
        event: a.event,
        description: a.description,
        start: new Date(a.start * 1000).toISOString(),
        end: new Date(a.end * 1000).toISOString(),
      }));

      const intelligence: WeatherIntelligenceDto = {
        current,
        hourly,
        daily,
        alerts: alerts.length > 0 ? alerts : undefined,
      };

      await this.cacheService.set(cacheKey, intelligence, CURRENT_TTL);
      return intelligence;
    } catch (error: unknown) {
      this.logger.error(
        `Failed to fetch weather: ${error instanceof Error ? error.message : String(error)}`,
      );
      // Implement Tomorrow.io fallback here if needed
      throw new ProviderUnavailableException(PROVIDER, 'Failed to fetch weather data');
    }
  }

  // --- AI Helper Methods --- //

  recommendBestTravelTime(weather: WeatherIntelligenceDto): string[] {
    const recommendations: string[] = [];
    weather.daily.forEach((day) => {
      if (day.rainProbability < 20 && day.maxTemp > 18 && day.maxTemp < 30) {
        recommendations.push(day.date);
      }
    });
    return recommendations;
  }

  recommendIndoorActivities(weather: WeatherIntelligenceDto): boolean {
    const rainProb = weather.hourly[0]?.rainProbability || 0;
    return rainProb > 50 || weather.current.temperature > 35 || weather.current.temperature < 5;
  }

  recommendOutdoorActivities(weather: WeatherIntelligenceDto): boolean {
    return !this.recommendIndoorActivities(weather);
  }

  calculateWeatherRisk(weather: WeatherIntelligenceDto): 'LOW' | 'MEDIUM' | 'HIGH' {
    if (weather.alerts && weather.alerts.length > 0) return 'HIGH';
    if (weather.current.windSpeed > 50 || weather.current.temperature > 40) return 'HIGH';
    if (weather.current.windSpeed > 30 || weather.daily.some((d) => d.rainProbability > 70))
      return 'MEDIUM';
    return 'LOW';
  }

  detectExtremeConditions(weather: WeatherIntelligenceDto): string[] {
    const conditions: string[] = [];
    if (weather.current.uvIndex > 8) conditions.push('EXTREME_UV');
    if (weather.current.temperature > 35) conditions.push('EXTREME_HEAT');
    if (weather.current.temperature < 0) conditions.push('FREEZING');
    if (weather.current.windSpeed > 40) conditions.push('HIGH_WIND');
    return conditions;
  }

  estimatePhotographyConditions(weather: WeatherIntelligenceDto): string[] {
    const times: string[] = [];
    if (weather.current.cloudCover > 20 && weather.current.cloudCover < 60) {
      if (weather.daily[0]?.goldenHour) times.push(weather.daily[0].goldenHour);
    }
    return times;
  }

  private getMoonPhase(phase: number): string {
    if (phase === 0 || phase === 1) return 'New Moon';
    if (phase > 0 && phase < 0.25) return 'Waxing Crescent';
    if (phase === 0.25) return 'First Quarter';
    if (phase > 0.25 && phase < 0.5) return 'Waxing Gibbous';
    if (phase === 0.5) return 'Full Moon';
    if (phase > 0.5 && phase < 0.75) return 'Waning Gibbous';
    if (phase === 0.75) return 'Last Quarter';
    return 'Waning Crescent';
  }
}
