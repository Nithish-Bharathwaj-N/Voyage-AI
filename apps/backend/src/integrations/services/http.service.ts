import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IntegrationsConfig } from '../../config/configuration';
import { ExternalApiException } from '../exceptions/external-api.exception';
import { RateLimitException } from '../exceptions/rate-limit.exception';
import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';
import { TimeoutException } from '../exceptions/timeout.exception';

export interface HttpRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  /** Override per-request timeout in ms */
  timeoutMs?: number;
  /** Override per-request max retries */
  maxRetries?: number;
  correlationId?: string;
}

export interface HttpResponse<T> {
  data: T;
  status: number;
  latencyMs: number;
  attempts: number;
}

/**
 * Central HTTP wrapper for all outbound provider calls.
 *
 * Features:
 * - Native fetch (Node.js 18+) — no extra dependencies
 * - Configurable timeout via AbortSignal
 * - Exponential backoff with jitter on 5xx / network errors
 * - Structured logging: provider, url, latency, status, retry count
 * - All errors normalized into ExternalApiException hierarchy
 * - Correlation ID propagation
 */
@Injectable()
export class HttpService {
  private readonly logger = new Logger(HttpService.name);
  private readonly defaultTimeoutMs: number;
  private readonly maxRetries: number;
  private readonly retryDelayMs: number;

  constructor(private readonly configService: ConfigService) {
    const cfg = this.configService.get<IntegrationsConfig>('integrations')!;
    this.defaultTimeoutMs = cfg.defaultTimeoutMs;
    this.maxRetries = cfg.maxRetries;
    this.retryDelayMs = cfg.retryDelayMs;
  }

  /**
   * Execute an HTTP request with retry and timeout policies.
   */
  async request<T>(
    provider: string,
    url: string,
    options: HttpRequestOptions = {},
  ): Promise<HttpResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeoutMs = this.defaultTimeoutMs,
      maxRetries = this.maxRetries,
      correlationId,
    } = options;

    let attempts = 0;
    let lastError: Error | undefined;

    while (attempts <= maxRetries) {
      const start = Date.now();
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      try {
        attempts++;
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(correlationId ? { 'X-Correlation-ID': correlationId } : {}),
            ...headers,
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        const latencyMs = Date.now() - start;
        clearTimeout(timer);

        this.logger.log(
          `[${provider}] ${method} ${url} → ${response.status} (${latencyMs}ms, attempt ${attempts})`,
        );

        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          throw new RateLimitException(
            provider,
            retryAfter ? parseInt(retryAfter, 10) : undefined,
            correlationId,
          );
        }

        // Handle server errors — eligible for retry
        if (response.status >= 500) {
          throw new ProviderUnavailableException(
            provider,
            `Upstream responded with ${response.status}`,
            correlationId,
          );
        }

        // Handle client errors — not retried
        if (!response.ok) {
          throw new ExternalApiException(
            provider,
            `Request failed with status ${response.status}`,
            response.status,
            response.status,
            correlationId,
          );
        }

        const data = (await response.json()) as T;
        return { data, status: response.status, latencyMs, attempts };
      } catch (err) {
        clearTimeout(timer);
        const latencyMs = Date.now() - start;

        // Timeout
        if ((err as Error).name === 'AbortError') {
          this.logger.warn(`[${provider}] Timeout after ${timeoutMs}ms (attempt ${attempts})`);
          lastError = new TimeoutException(provider, timeoutMs, correlationId);
        } else if (err instanceof RateLimitException) {
          // Never retry rate limit — propagate immediately
          throw err;
        } else if (err instanceof ExternalApiException && err.statusCode < 500) {
          // Client error (4xx) — propagate immediately without retrying
          throw err;
        } else if (err instanceof ExternalApiException) {
          // 5xx errors — retryable
          lastError = err;
          this.logger.warn(
            `[${provider}] Error on attempt ${attempts}/${maxRetries + 1}: ${err.message} (${latencyMs}ms)`,
          );
        } else {
          // Network failure (DNS etc.)
          lastError = new ProviderUnavailableException(
            provider,
            (err as Error).message,
            correlationId,
          );
          this.logger.warn(
            `[${provider}] Network error on attempt ${attempts}: ${(err as Error).message}`,
          );
        }

        if (attempts > maxRetries) break;

        // Exponential backoff with jitter
        const delay = this.retryDelayMs * Math.pow(2, attempts - 1) + Math.random() * 100;
        await this.sleep(delay);
      }
    }

    this.logger.error(
      `[${provider}] All ${attempts} attempts failed. Last error: ${lastError?.message}`,
    );
    throw (
      lastError ??
      new ExternalApiException(provider, 'Unknown error', 502, undefined, correlationId)
    );
  }

  /**
   * Convenience GET shorthand.
   */
  async get<T>(
    provider: string,
    url: string,
    options?: Omit<HttpRequestOptions, 'method' | 'body'>,
  ): Promise<HttpResponse<T>> {
    return this.request<T>(provider, url, { ...options, method: 'GET' });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
