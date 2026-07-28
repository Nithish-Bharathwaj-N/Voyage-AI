# 04. Error Model

## Global Exception Filter
A single NestJS `GlobalExceptionFilter` intercepts ALL thrown exceptions and returned `AppError` failures from the Result Monad.

## HTTP Mapping
- `NotFoundError` -> `404 Not Found`
- `ValidationError` -> `400 Bad Request`
- `ConcurrencyError` -> `409 Conflict` (Optimistic locking failed)
- `UnauthorizedError` -> `401 Unauthorized`
- `ForbiddenError` -> `403 Forbidden`
- Unhandled Exception -> `500 Internal Server Error` (Logs trace, but scrubs message from client).

## Standard Error Response
```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Invalid date range.",
    "details": [...]
  },
  "meta": {
    "requestId": "uuid-1234"
  }
}
```
