# Platform Infrastructure Capabilities

The VoyageAI V2 Monorepo contains 10 isolated infrastructure packages. These packages form the base platform layer. 
**Crucial Rule:** NO business logic is allowed in these packages. They are strictly abstract, reusable utilities designed via interfaces.

## Dependency Tree
```text
Business Services (NestJS / NextJS)
 ├── @voyageai/cache         (Redis Interface)
 ├── @voyageai/queue         (BullMQ Interface)
 ├── @voyageai/logger        (Pino JSON Logging)
 ├── @voyageai/events        (Pub/Sub Event Bus)
 ├── @voyageai/http          (Axios + Retries)
 ├── @voyageai/storage       (Cloudinary / S3)
 ├── @voyageai/observability (Prometheus/Health)
 ├── @voyageai/security      (Bcrypt / JWT)
 └── @voyageai/feature-flags (Toggle SDK)
```

## How to Consume (Dependency Inversion)
Modules should NEVER hardcode implementations. They should rely on the interfaces.
For example, inside a NestJS service:

**❌ BAD:**
```typescript
import { PinoLogger } from '@voyageai/logger';
const logger = new PinoLogger();
logger.info('Starting');
```

**✅ GOOD:**
```typescript
import { Logger } from '@voyageai/logger';
constructor(private readonly logger: Logger) {}
```
By relying on the `Logger` interface, the top-level application (e.g., `apps/api`) can inject `PinoLogger` in production, but inject a `MockLogger` during unit tests without modifying the business code.

## Package Breakdowns

### 1. `@voyageai/logger`
- Uses `pino` for high-performance JSON logging.
- Requires `LOG_LEVEL` environment variable.

### 2. `@voyageai/cache`
- Exposes `CacheClient`.
- Implements `ttlSeconds` and tag-based invalidation (crucial for purging destination data when the Knowledge Graph updates).

### 3. `@voyageai/queue`
- Exposes `QueueClient` with priority and backoff options.
- The default implementation is currently `InMemoryQueueClient` for prototyping, which will be swapped for BullMQ when Redis is connected.

### 4. `@voyageai/events`
- A typed `DomainEvent` Pub/Sub bus.
- **Extension Point:** Can be wired to Apache Kafka or AWS EventBridge in the future by simply implementing the `EventPublisher` interface.

### 5. `@voyageai/observability`
- Handles standard K8s Liveness/Readiness probes via `HealthCheckResult`.
- Standardizes metrics (`incrementCounter`, `recordHistogram`) for Datadog integration.

### 6. `@voyageai/http`
- Standardizes all outbound 3rd-party requests (e.g. OpenAI, Google Maps).
- **Extension Point:** Add `axios-retry` logic to the implementation to gracefully handle 429 Too Many Requests errors.

### 7. `@voyageai/storage`
- Abstraction over file uploads.
- Currently returns mock URLs, easily replaceable with `@cloudinary/url-gen`.

### 8. `@voyageai/security`
- Provides `PasswordHelper` (bcrypt) and `TokenHelper` (jsonwebtoken) to decouple the heavy crypto libraries from the rest of the app.

### 9. `@voyageai/feature-flags`
- Dynamic toggles for rolling out features safely (`ENABLE_AI_STREAMING`).
