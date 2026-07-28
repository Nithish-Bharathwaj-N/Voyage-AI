# 224 - Observability

## Structured Logging
- `winston` logs JSON objects to standard output.
- Every request parses through `LoggingInterceptor` emitting `[Incoming Request]` and `[Outgoing Response]`.

## Correlation IDs
- `CorrelationIdMiddleware` assigns a `uuidv4()` to incoming requests if `x-correlation-id` is absent.
- The ID traverses the NestJS application context to track execution latency end-to-end.
