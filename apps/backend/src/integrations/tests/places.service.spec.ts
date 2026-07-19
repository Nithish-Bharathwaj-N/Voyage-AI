import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';
import { Test, TestingModule } from '@nestjs/testing';
import { PlacesService } from '../services/places.service';
import { HttpService } from '../services/http.service';
import { CacheService } from '../services/cache.service';
import { ConfigService } from '@nestjs/config';

describe('PlacesService', () => {
  let service: PlacesService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === 'integrations.googlePlacesApiKey') return 'mock-key';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlacesService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: CacheService, useValue: mockCacheService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<PlacesService>(PlacesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchNearby', () => {
    it('should query Google Places API and cache/return results', async () => {
      const mockResult = {
        results: [
          {
            place_id: 'place-1',
            name: 'Eiffel Tower',
            formatted_address: 'Champ de Mars, Paris',
            geometry: { location: { lat: 48.8584, lng: 2.2945 } },
            rating: 4.7,
            types: ['tourist_attraction'],
            opening_hours: { open_now: true },
            price_level: 2,
          },
        ],
        status: 'OK',
      };

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: mockResult });

      const result = await service.searchNearby({
        latitude: 48.8584,
        longitude: 2.2945,
        radiusMeters: 1000,
        keyword: 'Eiffel',
      });

      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Eiffel Tower');
      expect(mockHttpService.get).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalled();
    });

    it('should operate in fallback mode and throw exception if API keys are absent', async () => {
      const localConfig = {
        get: jest.fn().mockReturnValue(null),
      };
      const keylessService = new PlacesService(
        mockHttpService as unknown as HttpService,
        mockCacheService as unknown as CacheService,
        localConfig as unknown as ConfigService,
      );

      await expect(
        keylessService.searchNearby({ latitude: 10, longitude: 10, radiusMeters: 5000 }),
      ).rejects.toThrow(ProviderUnavailableException);
    });
  });

  describe('searchByText', () => {
    it('should text search places using Google Places API', async () => {
      const mockResult = {
        results: [
          {
            place_id: 'place-2',
            name: 'Louvre Museum',
            geometry: { location: { lat: 48.8606, lng: 2.3376 } },
          },
        ],
        status: 'OK',
      };

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: mockResult });

      const result = await service.searchByText('Louvre');
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Louvre Museum');
    });
  });

  describe('getPlaceDetails', () => {
    it('should query details for single placeId', async () => {
      const mockResult = {
        result: {
          place_id: 'place-3',
          name: 'Notre Dame',
          geometry: { location: { lat: 48.853, lng: 2.3499 } },
        },
        status: 'OK',
      };

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: mockResult });

      const result = await service.getPlaceDetails('place-3');
      expect(result.name).toBe('Notre Dame');
    });
  });
});
