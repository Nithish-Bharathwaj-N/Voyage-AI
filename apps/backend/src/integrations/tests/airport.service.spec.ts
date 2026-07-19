import { Test, TestingModule } from '@nestjs/testing';
import { AirportService } from '../services/airport.service';
import { CacheService } from '../services/cache.service';
import { NotFoundException } from '@nestjs/common';

describe('AirportService', () => {
  let service: AirportService;

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirportService, { provide: CacheService, useValue: mockCacheService }],
    }).compile();

    service = module.get<AirportService>(AirportService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAirportByIata', () => {
    it('should return airport info from database if code matches and cache is empty', async () => {
      mockCacheService.get.mockResolvedValue(null);

      const result = await service.getAirportByIata('CDG');
      expect(result.iataCode).toBe('CDG');
      expect(result.name).toContain('Charles de Gaulle');
      expect(mockCacheService.set).toHaveBeenCalled();
    });

    it('should return cached airport info if key exists', async () => {
      const mockCached = {
        iataCode: 'CDG',
        name: 'Cached Airport',
        city: 'Paris',
        country: 'FR',
        countryCode: 'FR',
        latitude: 0,
        longitude: 0,
      };
      mockCacheService.get.mockResolvedValue(mockCached);

      const result = await service.getAirportByIata('CDG');
      expect(result).toEqual(mockCached);
      expect(mockCacheService.set).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException if airport does not exist', async () => {
      mockCacheService.get.mockResolvedValue(null);
      await expect(service.getAirportByIata('XYZ')).rejects.toThrow(NotFoundException);
    });
  });

  describe('searchAirports', () => {
    it('should return matched airports by query', async () => {
      mockCacheService.get.mockResolvedValue(null);

      const results = await service.searchAirports('Tokyo');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].iataCode).toBe('HND');
    });
  });

  describe('getAirportsByCity', () => {
    it('should return all airports located in city matching criteria', async () => {
      mockCacheService.get.mockResolvedValue(null);

      const results = await service.getAirportsByCity('Paris', 'FR');
      expect(results.length).toBe(2); // CDG, ORY
    });
  });
});
