import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from '../services/exchange.service';
import { HttpService } from '../services/http.service';
import { CacheService } from '../services/cache.service';
import { ConfigService } from '@nestjs/config';

describe('ExchangeService', () => {
  let service: ExchangeService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === 'integrations.openExchangeRatesAppId') return 'mock-app-id';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: CacheService, useValue: mockCacheService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRates', () => {
    it('should query OER API, convert non-USD base, and cache result', async () => {
      const mockResult = {
        timestamp: 1719482400,
        base: 'USD',
        rates: {
          USD: 1.0,
          EUR: 0.93,
          GBP: 0.79,
        },
      };

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: mockResult });

      const result = await service.getRates('EUR');
      expect(result.base).toBe('EUR');
      expect(result.rates.USD).toBeCloseTo(1 / 0.93);
      expect(result.rates.GBP).toBeCloseTo(0.79 / 0.93);
      expect(mockHttpService.get).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalled();
    });
  });

  describe('convert', () => {
    it('should convert amounts between currencies using latest rates', async () => {
      const mockResult = {
        timestamp: 1719482400,
        base: 'USD',
        rates: {
          USD: 1.0,
          EUR: 0.8,
          GBP: 0.5,
        },
      };

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: mockResult });

      const converted = await service.convert(100, 'EUR', 'GBP');
      // 100 EUR = 100 / 0.8 USD = 125 USD = 125 * 0.5 GBP = 62.5 GBP
      expect(converted).toBe(62.5);
    });
  });
});
