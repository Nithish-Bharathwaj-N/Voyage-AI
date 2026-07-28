# 27. Security

- **No client-side secrets**: We never expose the Supabase `SERVICE_ROLE_KEY`. We only expose the `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **HTTP-Only Cookies**: Server components read the session exclusively from secure cookies set by the Middleware.
- **CSRF**: Next.js App Router actions and middleware inherently provide strong CSRF protections.
