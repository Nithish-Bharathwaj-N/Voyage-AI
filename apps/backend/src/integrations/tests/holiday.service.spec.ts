import { Test, TestingModule } from '@nestjs/testing';
import { HolidayService } from '../services/holiday.service';
import { HttpService } from '../services/http.service';
import { CacheService } from '../services/cache.service';

describe('HolidayService', () => {
  let service: HolidayService;

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
        HolidayService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: CacheService, useValue: mockCacheService },
      ],
    }).compile();

    service = module.get<HolidayService>(HolidayService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHolidays', () => {
    it('should query Nager.Date API and return list of holidays', async () => {
      const mockRaw = [
        {
          date: '2026-07-14',
          localName: 'Fête nationale',
          name: 'Bastille Day',
          countryCode: 'FR',
          fixed: true,
          global: true,
          counties: null,
          launchYear: null,
          types: ['Public'],
        },
      ];

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: mockRaw });

      const results = await service.getHolidays('FR', 2026);
      expect(results.length).toBe(1);
      expect(results[0].name).toBe('Bastille Day');
      expect(mockHttpService.get).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalled();
    });
  });

  describe('isHoliday', () => {
    it('should verify if date is holiday in country', async () => {
      const mockResult = [
        {
          date: '2026-07-14',
          name: 'Bastille Day',
          localName: 'Fête nationale',
          countryCode: 'FR',
          fixed: true,
          global: true,
          types: ['Public'],
        },
      ];

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: mockResult });

      const yes = await service.isHoliday('FR', '2026-07-14T00:00:00.000Z');
      expect(yes).toBe(true);

      const no = await service.isHoliday('FR', '2026-07-15T00:00:00.000Z');
      expect(no).toBe(false);
    });
  });
});
