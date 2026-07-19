import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '../services/http.service';
import { ConfigService } from '@nestjs/config';
import { RateLimitException } from '../exceptions/rate-limit.exception';
import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';
import { TimeoutException } from '../exceptions/timeout.exception';
import { ExternalApiException } from '../exceptions/external-api.exception';

describe('HttpService', () => {
  let service: HttpService;
  let originalFetch: unknown;

  const mockConfigService = {
    get: jest.fn().mockReturnValue({
      defaultTimeoutMs: 50,
      maxRetries: 2,
      retryDelayMs: 5,
    }),
  };

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = originalFetch as typeof global.fetch;
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpService, { provide: ConfigService, useValue: mockConfigService }],
    }).compile();

    service = module.get<HttpService>(HttpService);
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('request', () => {
    it('should successfully return parsed response on first attempt', async () => {
      const mockResult = { items: [1, 2] };
      (global.fetch as jest.Mock).mockResolvedValue({
        status: 200,
        ok: true,
        json: jest.fn().mockResolvedValue(mockResult),
        headers: new Headers(),
      });

      const response = await service.get('TestProvider', 'https://api.example.com/data');
      expect(response.data).toEqual(mockResult);
      expect(response.status).toBe(200);
      expect(response.attempts).toBe(1);
    });

    it('should retry on 5xx status codes and eventually succeed if code resolves', async () => {
      const mockResult = { success: true };
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          status: 503,
          ok: false,
          headers: new Headers(),
        })
        .mockResolvedValueOnce({
          status: 200,
          ok: true,
          json: jest.fn().mockResolvedValue(mockResult),
          headers: new Headers(),
        });

      const response = await service.get('TestProvider', 'https://api.example.com/data');
      expect(response.data).toEqual(mockResult);
      expect(response.attempts).toBe(2);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should fail with ProviderUnavailableException after max retries exceed on 5xx', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        status: 500,
        ok: false,
        headers: new Headers(),
      });

      await expect(service.get('TestProvider', 'https://api.example.com/data')).rejects.toThrow(
        ProviderUnavailableException,
      );

      expect(global.fetch).toHaveBeenCalledTimes(3); // 1 original + 2 retries
    });

    it('should fail with RateLimitException immediately without retrying on 429', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        status: 429,
        ok: false,
        headers: new Headers({ 'Retry-After': '10' }),
      });

      await expect(service.get('TestProvider', 'https://api.example.com/data')).rejects.toThrow(
        RateLimitException,
      );

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should fail with ExternalApiException on client errors (4xx) without retrying', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        status: 400,
        ok: false,
        headers: new Headers(),
      });

      await expect(service.get('TestProvider', 'https://api.example.com/data')).rejects.toThrow(
        ExternalApiException,
      );

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw TimeoutException when request times out', async () => {
      (global.fetch as jest.Mock).mockImplementation(() => {
        return new Promise((_, reject) => {
          const err = new Error('The user aborted a request.');
          err.name = 'AbortError';
          setTimeout(() => reject(err), 10);
        });
      });

      await expect(
        service.request('TestProvider', 'https://api.example.com/data', { timeoutMs: 5 }),
      ).rejects.toThrow(TimeoutException);
    });
  });
});
