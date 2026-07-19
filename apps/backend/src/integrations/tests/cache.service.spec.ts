import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../services/cache.service';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

jest.mock('ioredis', () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return {
        on: jest.fn(),
        connect: jest.fn().mockResolvedValue(undefined),
        quit: jest.fn().mockResolvedValue(undefined),
        get: jest.fn(),
        setex: jest.fn(),
        del: jest.fn(),
        scan: jest.fn(),
      };
    }),
  };
});

describe('CacheService', () => {
  let service: CacheService;
  let mockRedisInstance: {
    get: jest.Mock;
    setex: jest.Mock;
    del: jest.Mock;
    scan: jest.Mock;
  };

  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string) => {
      if (key === 'redis.url') return 'redis://localhost:6379';
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService, { provide: ConfigService, useValue: mockConfigService }],
    }).compile();

    service = module.get<CacheService>(CacheService);
    service.onModuleInit();
    // Retrieve the mocked Redis client instance
    mockRedisInstance = (
      Redis as unknown as { mock: { results: { value: typeof mockRedisInstance }[] } }
    ).mock.results[0].value;
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await service.onModuleDestroy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return null if cache is not connected', async () => {
      const result = await service.get('key');
      expect(result).toBeNull();
    });

    it('should return parsed cached object if key exists and connected', async () => {
      // Simulate connection
      (service as unknown as { connected: boolean }).connected = true;
      mockRedisInstance.get.mockResolvedValue(JSON.stringify({ value: 'hello' }));

      const result = await service.get<{ value: string }>('test-key');
      expect(result).toEqual({ value: 'hello' });
      expect(mockRedisInstance.get).toHaveBeenCalledWith('test-key');
    });

    it('should return null if key does not exist', async () => {
      (service as unknown as { connected: boolean }).connected = true;
      mockRedisInstance.get.mockResolvedValue(null);

      const result = await service.get('missing-key');
      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should invoke setex with serialised value if connected', async () => {
      (service as unknown as { connected: boolean }).connected = true;
      mockRedisInstance.setex.mockResolvedValue('OK');

      await service.set('test-key', { score: 100 }, 3600);
      expect(mockRedisInstance.setex).toHaveBeenCalledWith(
        'test-key',
        3600,
        JSON.stringify({ score: 100 }),
      );
    });
  });

  describe('del', () => {
    it('should invoke del with key if connected', async () => {
      (service as unknown as { connected: boolean }).connected = true;
      mockRedisInstance.del.mockResolvedValue(1);

      await service.del('test-key');
      expect(mockRedisInstance.del).toHaveBeenCalledWith('test-key');
    });
  });

  describe('delByPattern', () => {
    it('should scan and delete matching keys sequentially', async () => {
      (service as unknown as { connected: boolean }).connected = true;
      // First scan returns keys, second scan terminates with cursor '0'
      mockRedisInstance.scan
        .mockResolvedValueOnce(['4', ['test:1', 'test:2']])
        .mockResolvedValueOnce(['0', []]);
      mockRedisInstance.del.mockResolvedValue(2);

      const deletedCount = await service.delByPattern('test:*');
      expect(deletedCount).toBe(2);
      expect(mockRedisInstance.scan).toHaveBeenCalledTimes(2);
      expect(mockRedisInstance.del).toHaveBeenCalledWith('test:1', 'test:2');
    });
  });

  describe('buildKey', () => {
    it('should format keys separated by colons', () => {
      const key = CacheService.buildKey('a', 'b', 'c');
      expect(key).toBe('a:b:c');
    });
  });
});
