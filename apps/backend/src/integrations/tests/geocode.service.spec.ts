import { Test, TestingModule } from '@nestjs/testing';
import { GeocodeService } from '../services/geocode.service';
import { HttpService } from '../services/http.service';
import { CacheService } from '../services/cache.service';
import { ConfigService } from '@nestjs/config';

describe('GeocodeService', () => {
  let service: GeocodeService;

  const mockHttpService = {
    get: jest.fn(),
  };

  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('mock-mapbox-key'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeocodeService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: CacheService, useValue: mockCacheService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<GeocodeService>(GeocodeService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('geocode', () => {
    it('should query Mapbox API and cache results', async () => {
      const mockResult = {
        features: [
          {
            id: 'place.123',
            place_name: 'Paris, France',
            center: [2.3522, 48.8566],
            context: [
              { id: 'country.456', text: 'France', short_code: 'fr' },
              { id: 'place.789', text: 'Paris' },
            ],
          },
        ],
      };

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: mockResult });

      const result = await service.geocode('Paris');
      expect(result.length).toBe(1);
      expect(result[0].latitude).toBe(48.8566);
      expect(result[0].city).toBe('Paris');
      expect(mockHttpService.get).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalled();
    });

    it('should fallback to Nominatim if Mapbox fails', async () => {
      const mockNominatimResult = [
        {
          place_id: '12345',
          display_name: 'Paris, Ile-de-France, FR',
          lat: '48.8566',
          lon: '2.3522',
          address: {
            country: 'France',
            country_code: 'fr',
            city: 'Paris',
          },
        },
      ];

      mockCacheService.get.mockResolvedValue(null);
      // First call throws (Mapbox), second succeeds (Nominatim)
      mockHttpService.get
        .mockRejectedValueOnce(new Error('Mapbox API Error'))
        .mockResolvedValueOnce({ data: mockNominatimResult });

      const result = await service.geocode('Paris');
      expect(result.length).toBe(1);
      expect(result[0].latitude).toBe(48.8566);
      expect(mockHttpService.get).toHaveBeenCalledTimes(2);
    });
  });

  describe('reverseGeocode', () => {
    it('should reverse geocode lat/lng using Mapbox', async () => {
      const mockResult = {
        features: [
          {
            id: 'poi.123',
            place_name: 'Eiffel Tower, Paris',
            center: [2.2945, 48.8584],
            context: [{ id: 'country.456', text: 'France', short_code: 'fr' }],
          },
        ],
      };

      mockCacheService.get.mockResolvedValue(null);
      mockHttpService.get.mockResolvedValue({ data: mockResult });

      const result = await service.reverseGeocode(48.8584, 2.2945);
      expect(result.formattedAddress).toBe('Eiffel Tower, Paris');
      expect(mockHttpService.get).toHaveBeenCalled();
    });
  });
});
