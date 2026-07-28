# 216 - Security Measures

- **JWT Auth**: NestJS Passport module validates Supabase JWTs.
- **Helmet / CORS**: API gateway is protected by `helmet` and strict CORS origins.
- **Rate Limiting**: NestJS Throttler intercepts abusive IP patterns.
- **Secret Management**: `ProviderFactory` isolates API keys (`process.env.OPENAI_API_KEY`). They never leak to the client.
