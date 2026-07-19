import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from '../services/weather.service';
import { HttpService } from '../services/http.service';
import { CacheService } from '../services/cache.service';
import { ConfigService } from '@nestjs/config';
import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';
import { WeatherIntelligenceDto } from '../dto/weather.dto';

describe('WeatherService', () => {
  let service: WeatherService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === 'integrations.openWeatherApiKey') return 'mock-owm-key';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: CacheService, useValue: mockCacheService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWeatherIntelligence', () => {
    it('should query OpenWeatherMap OneCall API and return formatted intelligence', async () => {
      const mockResult = {
        lat: 48.8566,
        lon: 2.3522,
        current: {
          temp: 22.5,
          feels_like: 22.0,
          humidity: 45,
          wind_speed: 3.5, // ~12.6 km/h
          clouds: 10,
          uvi: 6,
          visibility: 10000,
          sunrise: 1719460000,
          sunset: 1719510000,
          weather: [{ main: 'Clear', icon: '01d' }],
        },
        hourly: [
          {
            dt: 1719482400,
            temp: 23,
            pop: 0.1, // 10%
            weather: [{ main: 'Clouds', icon: '02d' }],
          },
        ],
        daily: [
          {
            dt: 1719520000,
            temp: { min: 18, max: 28 },
            pop: 0.5, // 50%
            weather: [{ main: 'Rain', icon: '10d' }],
            sunset: 1719510000,
            moon_phase: 0.5, // Full Moon
          },
        ],
        alerts: [
          {
            event: 'Heat Wave',
            description: 'Expect extreme heat',
            start: 1719500000,
            end: 1719600000,
          },
        ],
      };

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: mockResult });

      const result = await service.getWeatherIntelligence(48.8566, 2.3522);
      expect(result.current.temperature).toBe(22.5);
      expect(result.current.condition).toBe('Clear');
      expect(result.current.windSpeed).toBe(3.5 * 3.6);

      expect(result.hourly.length).toBe(1);
      expect(result.hourly[0].rainProbability).toBe(10);

      expect(result.daily.length).toBe(1);
      expect(result.daily[0].rainProbability).toBe(50);
      expect(result.daily[0].moonPhase).toBe('Full Moon');

      expect(result.alerts).toBeDefined();
      expect(result.alerts?.length).toBe(1);
      expect(result.alerts![0].event).toBe('Heat Wave');

      expect(mockHttpService.get).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalled();
    });

    it('should throw ProviderUnavailableException if API key is missing', async () => {
      const localConfig = {
        get: jest.fn().mockReturnValue(null),
      };
      const keylessService = new WeatherService(
        mockHttpService as unknown as HttpService,
        mockCacheService as unknown as CacheService,
        localConfig as unknown as ConfigService,
      );

      await expect(keylessService.getWeatherIntelligence(48.8566, 2.3522)).rejects.toThrow(
        ProviderUnavailableException,
      );
    });
  });

  describe('AI Helper Methods', () => {
    let mockIntelligence: WeatherIntelligenceDto;

    beforeEach(() => {
      mockIntelligence = {
        current: {
          temperature: 25,
          feelsLike: 25,
          humidity: 50,
          windSpeed: 10,
          visibility: 10000,
          cloudCover: 20,
          uvIndex: 5,
          condition: 'Clear',
          icon: '01d',
          sunrise: '2026-07-15T06:00:00Z',
          sunset: '2026-07-15T20:00:00Z',
        },
        hourly: [
          {
            timestamp: '2026-07-15T12:00:00Z',
            temperature: 26,
            rainProbability: 10,
            condition: 'Clear',
            icon: '01d',
          },
        ],
        daily: [
          {
            date: '2026-07-15T12:00:00Z',
            minTemp: 18,
            maxTemp: 28,
            rainProbability: 10,
            condition: 'Clear',
            icon: '01d',
            moonPhase: 'Full Moon',
            goldenHour: '2026-07-15T19:00:00Z',
            blueHour: '2026-07-15T20:30:00Z',
          },
        ],
      };
    });

    it('should recommend best travel time based on daily forecast', () => {
      const result = service.recommendBestTravelTime(mockIntelligence);
      expect(result.length).toBe(1);
      expect(result[0]).toBe('2026-07-15T12:00:00Z');
    });

    it('should recommend indoor activities if rain probability > 50%', () => {
      mockIntelligence.hourly[0].rainProbability = 60;
      expect(service.recommendIndoorActivities(mockIntelligence)).toBe(true);
      expect(service.recommendOutdoorActivities(mockIntelligence)).toBe(false);
    });

    it('should calculate weather risk correctly', () => {
      expect(service.calculateWeatherRisk(mockIntelligence)).toBe('LOW');

      mockIntelligence.current.windSpeed = 40; // Medium risk
      expect(service.calculateWeatherRisk(mockIntelligence)).toBe('MEDIUM');

      mockIntelligence.current.temperature = 42; // High risk
      expect(service.calculateWeatherRisk(mockIntelligence)).toBe('HIGH');
    });

    it('should detect extreme conditions', () => {
      mockIntelligence.current.uvIndex = 9;
      mockIntelligence.current.temperature = 38;
      const conditions = service.detectExtremeConditions(mockIntelligence);
      expect(conditions).toContain('EXTREME_UV');
      expect(conditions).toContain('EXTREME_HEAT');
    });

    it('should estimate photography conditions during golden hour if partly cloudy', () => {
      mockIntelligence.current.cloudCover = 40;
      const times = service.estimatePhotographyConditions(mockIntelligence);
      expect(times.length).toBe(1);
      expect(times[0]).toBe('2026-07-15T19:00:00Z');
    });
  });
});
