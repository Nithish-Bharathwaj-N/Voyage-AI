# 227 - CI/CD

## GitHub Actions
- Workflow triggers on Push and Pull Request to `main`.
- Validates the DB schema (`npx prisma validate`).
- Enforces code styling (`npx eslint`).
- Compiles TS and prevents emitting broken types (`npx tsc --noEmit`).
- Attempts full bundle generation (`npm run build`).
