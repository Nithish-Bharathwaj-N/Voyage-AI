export type Result<T, E = Error> = Success<T, E> | Failure<T, E>;

export class Success<T, E> {
  readonly isSuccess: true = true;
  readonly isFailure: false = false;
  constructor(public readonly value: T) {}
}

export class Failure<T, E> {
  readonly isSuccess: false = false;
  readonly isFailure: true = true;
  constructor(public readonly error: E) {}
}

export const ok = <T, E>(value: T): Result<T, E> => new Success(value);
export const fail = <T, E>(error: E): Result<T, E> => new Failure(error);

export const success = ok;
export const failure = fail;
