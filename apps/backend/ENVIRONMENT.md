# Environment Variables Guide — VoyageAI Backend

This document details every environmental setting, validation constraint, and description required by VoyageAI's backend application.

---

## 1. Variable Directory Registry

These settings are strictly validated at bootstrap using a Joi schema inside `src/config/validation.ts`. If any variable is missing or malformed, the bootstrapper aborts and prevents execution.

| Variable Name | Required | Default | Format | Description |
|---|---|---|---|---|
| `NODE_ENV` | Yes | `development` | String (`development`, `production`, `test`) | Defines the runtime mode context. Exposes stack traces in development/test. |
| `PORT` | Yes | `3000` | Number | Port number the NestJS HTTP application listens on. |
| `DATABASE_URL` | Yes | — | URI | PostgreSQL connection string. Format: `postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public` |
| `SUPABASE_URL` | Yes | — | URL | Instance address of your Supabase project. |
| `SUPABASE_ANON_KEY` | Yes | — | String | Client API key used to initialize anonymous sessions. |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | — | String (Secret) | High-privilege API key used for admin actions (user management, auth overrides). |
| `SUPABASE_JWT_SECRET` | Yes | — | String (Secret) | JWT secret key to cryptographically verify bearer token signatures. |
| `REDIS_URL` | Yes | — | URI | Connection string for Redis cache instance. Format: `redis://HOST:PORT` |

---

## 2. Validation & Config Injection

- **Code Validation**: Handled by Joi schema mapping in `src/config/validation.ts`.
- **Config Service Access**: Access variables strictly through NestJS `ConfigService` mapping configs in `src/config/configuration.ts`.
  ```typescript
  const dbUrl = this.configService.get<string>('database.url');
  ```
