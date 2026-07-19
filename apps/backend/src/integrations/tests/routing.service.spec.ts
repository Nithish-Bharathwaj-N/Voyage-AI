import { Test, TestingModule } from '@nestjs/testing';
import { RoutingService } from '../services/routing.service';
import { HttpService } from '../services/http.service';
import { CacheService } from '../services/cache.service';
import { ConfigService } from '@nestjs/config';
import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';
import { TransportMode } from '../dto/maps.dto';

describe('RoutingService', () => {
  let service: RoutingService;

  const mockHttpService = { get: jest.fn() };
  const mockCacheService = { get: jest.fn(), set: jest.fn() };
  const mockConfigService = { get: jest.fn().mockReturnValue('mock-mapbox-key') };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoutingService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: CacheService, useValue: mockCacheService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<RoutingService>(RoutingService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate route using mapbox API', async () => {
    const mockResponse = {
      code: 'Ok',
      routes: [
        {
          distance: 1000,
          duration: 300,
          geometry: 'mockpolyline',
          legs: [
            {
              distance: 1000,
              duration: 300,
              summary: 'Fastest route',
              steps: [
                {
                  distance: 1000,
                  duration: 300,
                  maneuver: { instruction: 'Turn left', type: 'turn', location: [0, 0] },
                },
              ],
            },
          ],
        },
      ],
    };
    mockCacheService.get.mockResolvedValue(null);
    mockHttpService.get.mockResolvedValue({ data: mockResponse });

    const route = await service.calculateRoute(
      { latitude: 0, longitude: 0 },
      { latitude: 1, longitude: 1 },
      TransportMode.DRIVING,
    );

    expect(route.totalDistanceMeters).toBe(1000);
    expect(route.geometryPolyline).toBe('mockpolyline');
    expect(route.legs.length).toBe(1);
    expect(mockHttpService.get).toHaveBeenCalled();
  });

  it('should throw exception if no API key is set', async () => {
    const localConfig = { get: jest.fn().mockReturnValue(null) };
    const keylessService = new RoutingService(
      mockHttpService as unknown as HttpService,
      mockCacheService as unknown as CacheService,
      localConfig as unknown as ConfigService,
    );

    await expect(
      keylessService.calculateRoute(
        { latitude: 0, longitude: 0 },
        { latitude: 1, longitude: 1 },
        TransportMode.DRIVING,
      ),
    ).rejects.toThrow(ProviderUnavailableException);
  });
});
