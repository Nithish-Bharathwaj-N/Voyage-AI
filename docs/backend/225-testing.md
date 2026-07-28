# 225 - Testing

## Philosophy
VoyageAI enforces test gates at the CI/CD pipeline level. Code does not merge without passing all checks.

## End to End
- `k6` load scripts simulate intense Socket and HTTP traffic up to 1000 concurrent users.

## Build Tests
- `npm run build`, `tsc --noEmit` and `eslint` guarantee structural and type integrity.
