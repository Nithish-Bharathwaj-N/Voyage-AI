/**
 * Base exception for all external API failures.
 * All provider errors are normalized into this hierarchy.
 */
export class ExternalApiException extends Error {
  public readonly provider: string;
  public readonly statusCode: number;
  public readonly upstreamStatus?: number;
  public readonly correlationId?: string;

  constructor(
    provider: string,
    message: string,
    statusCode: number = 502,
    upstreamStatus?: number,
    correlationId?: string,
  ) {
    super(message);
    this.name = 'ExternalApiException';
    this.provider = provider;
    this.statusCode = statusCode;
    this.upstreamStatus = upstreamStatus;
    this.correlationId = correlationId;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON(): Record<string, unknown> {
    return {
      error: this.name,
      provider: this.provider,
      message: this.message,
      statusCode: this.statusCode,
      upstreamStatus: this.upstreamStatus,
      correlationId: this.correlationId,
    };
  }
}
