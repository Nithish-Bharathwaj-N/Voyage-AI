import { Test, TestingModule } from '@nestjs/testing';
import { TimezoneService } from '../services/timezone.service';
import { HttpService } from '../services/http.service';
import { CacheService } from '../services/cache.service';
import { ConfigService } from '@nestjs/config';

describe('TimezoneService', () => {
  let service: TimezoneService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === 'integrations.timezoneApiKey') return 'mock-tz-key';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimezoneService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: CacheService, useValue: mockCacheService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<TimezoneService>(TimezoneService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTimezone', () => {
    it('should query TimezoneDB API and cache timezone details', async () => {
      const mockRaw = {
        status: 'OK',
        zoneName: 'Europe/Paris',
        abbreviation: 'CEST',
        gmtOffset: 7200,
        dst: '1',
        timestamp: 1719482400,
        countryCode: 'FR',
        countryName: 'France',
      };

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: mockRaw });

      const result = await service.getTimezone(48.8566, 2.3522);
      expect(result.timezoneId).toBe('Europe/Paris');
      expect(result.gmtOffset).toBe(7200);
      expect(mockHttpService.get).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalled();
    });

    it('should degrade to UTC fallback if API key is missing', async () => {
      const localConfig = {
        get: jest.fn().mockReturnValue(null),
      };
      const fallbackService = new TimezoneService(
        mockHttpService as unknown as HttpService,
        mockCacheService as unknown as CacheService,
        localConfig as unknown as ConfigService,
      );

      mockCacheService.get.mockResolvedValue(null);

      const result = await fallbackService.getTimezone(48.8566, 2.3522);
      expect(result.timezoneId).toBe('UTC');
      expect(mockHttpService.get).not.toHaveBeenCalled();
    });
  });

  describe('getTimezoneById', () => {
    it('should lookup timezone by id string', async () => {
      const mockRaw = {
        status: 'OK',
        zoneName: 'Europe/Paris',
        abbreviation: 'CEST',
        gmtOffset: 7200,
        dst: '1',
        timestamp: 1719482400,
      };

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: mockRaw });

      const result = await service.getTimezoneById('Europe/Paris');
      expect(result.timezoneId).toBe('Europe/Paris');
    });
  });
});
