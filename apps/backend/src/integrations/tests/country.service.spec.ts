import { Test, TestingModule } from '@nestjs/testing';
import { CountryService } from '../services/country.service';
import { HttpService } from '../services/http.service';
import { CacheService } from '../services/cache.service';

describe('CountryService', () => {
  let service: CountryService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: CacheService, useValue: mockCacheService },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCountryByCode', () => {
    it('should query RestCountries API and return country info', async () => {
      const mockRaw = {
        name: { common: 'France', official: 'French Republic' },
        cca2: 'FR',
        cca3: 'FRA',
        ccn3: '250',
        capital: ['Paris'],
        region: 'Europe',
        subregion: 'Western Europe',
        population: 67000000,
        currencies: { EUR: {} },
        languages: { fra: 'French' },
        timezones: ['UTC+01:00'],
        latlng: [46.0, 2.0],
        flag: '🇫🇷',
        idd: { root: '+33', suffixes: [''] },
      };

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: [mockRaw] });

      const result = await service.getCountryByCode('FR');
      expect(result.name).toBe('France');
      expect(result.code).toBe('FR');
      expect(result.currencies).toEqual(['EUR']);
      expect(mockHttpService.get).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalled();
    });
  });

  describe('searchCountries', () => {
    it('should search countries by term', async () => {
      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: [] });

      const results = await service.searchCountries('Fra');
      expect(results).toEqual([]);
    });
  });

  describe('getAllCountries', () => {
    it('should retrieve list of all countries', async () => {
      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: [] });

      const results = await service.getAllCountries();
      expect(results).toEqual([]);
    });
  });
});
