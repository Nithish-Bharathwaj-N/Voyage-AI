import { ExternalApiException } from './external-api.exception';

/**
 * Thrown when a provider responds with HTTP 429 Too Many Requests.
 * Includes the retry-after hint when available.
 */
export class RateLimitException extends ExternalApiException {
  public readonly retryAfterSeconds?: number;

  constructor(provider: string, retryAfterSeconds?: number, correlationId?: string) {
    super(
      provider,
      `Rate limit exceeded for provider "${provider}". ${retryAfterSeconds ? `Retry after ${retryAfterSeconds}s.` : ''}`,
      429,
      429,
      correlationId,
    );
    this.name = 'RateLimitException';
    this.retryAfterSeconds = retryAfterSeconds;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
