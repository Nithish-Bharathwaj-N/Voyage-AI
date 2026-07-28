# 25. OAuth Integration

Google OAuth is integrated natively via Supabase.

When a user clicks "Continue with Google":
1. `signInWithOAuth` is triggered, passing the provider (`google`) and a `redirectTo` URL pointing to our `/callback` route.
2. Supabase redirects the user to Google for consent.
3. Google redirects the user back to `/callback?code=xxx`.
4. Our Route Handler (`/callback/route.ts`) exchanges the code for a secure session cookie and redirects the user to `/app`.
