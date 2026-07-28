# 24. Route Protection

The `middleware.ts` intercepts every request:
1. It initializes the Supabase Server Client.
2. It fetches the current user session (`supabase.auth.getUser()`).
3. If the user is unauthenticated and attempts to access an `/app` route, they are redirected to `/login`.
4. If the user is authenticated and attempts to access `/login` or `/signup`, they are redirected to `/app`.
