export abstract class AppError extends Error {
  public readonly code: string;
  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND');
  }
}

export class ConcurrencyError extends AppError {
  constructor(message: string = 'The resource was modified by another transaction') {
    super(message, 'CONCURRENCY_CONFLICT');
  }
}
