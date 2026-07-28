# 01. Migration & Seeding Strategy

## Migrations
We use Prisma Migrate strictly for schema evolution.
1. **Local Development:** Developers use `pnpm db:push` to rapidly prototype schema changes against local Postgres.
2. **Production:** `prisma migrate dev --name <migration-name>` is used to generate deterministic SQL migration files. These files are committed to source control.
3. **CI/CD:** During Vercel/Railway deployments, `prisma migrate deploy` is executed to safely run pending SQL scripts against the production database.

## Seeding
The database requires initial geographic and categorical data to function (The Knowledge Graph).
Seeding is broken into environments:
- **`seed/dev.ts`:** Loads a tiny subset of Kaggle Tourism Data (e.g., 50 places in Paris) for fast local testing.
- **`seed/test.ts`:** Ephemeral data that is injected and wiped entirely between test suites.
- **`seed/prod.ts`:** Bootstraps critical platform enumerations and base Destination nodes. Will eventually pull from a stable JSON dump in `datasets/`.
