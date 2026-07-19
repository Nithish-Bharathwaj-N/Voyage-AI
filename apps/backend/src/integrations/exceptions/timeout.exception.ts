import { ExternalApiException } from './external-api.exception';

/**
 * Thrown when an outbound provider request exceeds the configured timeout.
 * Wraps AbortError / AbortSignal timeouts from native fetch.
 */
export class TimeoutException extends ExternalApiException {
  public readonly timeoutMs: number;

  constructor(provider: string, timeoutMs: number, correlationId?: string) {
    super(
      provider,
      `Request to provider "${provider}" timed out after ${timeoutMs}ms.`,
      504,
      undefined,
      correlationId,
    );
    this.name = 'TimeoutException';
    this.timeoutMs = timeoutMs;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
