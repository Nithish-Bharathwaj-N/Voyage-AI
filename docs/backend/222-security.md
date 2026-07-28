# 222 - Security

## Environment Validations
- Handled via `Joi` inside NestJS ConfigModule. Prevents boot if missing.

## Helmets & CORS
- `@nestjs/helmet` prevents XSS and sets strict headers.
- CORS is regex-matched to production domains, blocking spoofed requests.

## Rate Limiting
- `ThrottlerGuard` is registered globally.
- Standard limit: 100 requests per IP per minute.

## Tokens & JWTs
- Secret strings are stripped by Winston logger before hitting stdout to prevent leaking in SIEMs.
