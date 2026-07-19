import { Test, TestingModule } from '@nestjs/testing';
import { DistanceMatrixService } from '../services/distance-matrix.service';
import { HttpService } from '../services/http.service';
import { CacheService } from '../services/cache.service';
import { ConfigService } from '@nestjs/config';
import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';
import { TransportMode } from '../dto/maps.dto';

describe('DistanceMatrixService', () => {
  let service: DistanceMatrixService;

  const mockHttpService = { get: jest.fn() };
  const mockCacheService = { get: jest.fn(), set: jest.fn() };
  const mockConfigService = { get: jest.fn().mockReturnValue('mock-mapbox-key') };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistanceMatrixService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: CacheService, useValue: mockCacheService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<DistanceMatrixService>(DistanceMatrixService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate distance matrix', async () => {
    const mockResponse = {
      code: 'Ok',
      distances: [[1000]],
      durations: [[300]],
    };
    mockCacheService.get.mockResolvedValue(null);
    mockHttpService.get.mockResolvedValue({ data: mockResponse });

    const matrix = await service.calculateDistanceMatrix(
      [{ latitude: 0, longitude: 0 }],
      [{ latitude: 1, longitude: 1 }],
      TransportMode.DRIVING,
    );

    expect(matrix.rows[0][0].distanceMeters).toBe(1000);
    expect(matrix.rows[0][0].durationSeconds).toBe(300);
    expect(mockHttpService.get).toHaveBeenCalled();
  });

  it('should throw exception if no API key is set', async () => {
    const localConfig = { get: jest.fn().mockReturnValue(null) };
    const keylessService = new DistanceMatrixService(
      mockHttpService as unknown as HttpService,
      mockCacheService as unknown as CacheService,
      localConfig as unknown as ConfigService,
    );

    await expect(
      keylessService.calculateDistanceMatrix(
        [{ latitude: 0, longitude: 0 }],
        [{ latitude: 1, longitude: 1 }],
        TransportMode.DRIVING,
      ),
    ).rejects.toThrow(ProviderUnavailableException);
  });
});
