# 07. Security

## Global Protections
1. **Helmet**: `app.use(helmet())` is enabled by default to secure HTTP headers.
2. **CORS**: Configured strictly to allow only the Vercel frontend domains.
3. **Rate Limiting**: `@nestjs/throttler` limits generic endpoints to 100 req/min. AI Generation endpoints are strictly limited to 5 req/min per user.
4. **Data Sanitization**: The Zod Validation pipes automatically strip any unknown fields (`strip: true`) before they reach the controllers, preventing prototype pollution and mass assignment attacks.
