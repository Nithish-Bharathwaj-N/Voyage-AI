import { ExternalApiException } from './external-api.exception';

/**
 * Thrown when a provider is unreachable (DNS failure, connection refused, 5xx).
 * Signals that the provider is temporarily unavailable.
 */
export class ProviderUnavailableException extends ExternalApiException {
  constructor(provider: string, cause?: string, correlationId?: string) {
    super(
      provider,
      `Provider "${provider}" is currently unavailable${cause ? `: ${cause}` : '.'}`,
      503,
      undefined,
      correlationId,
    );
    this.name = 'ProviderUnavailableException';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
