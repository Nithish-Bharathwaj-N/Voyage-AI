# 23. Session Management

Supabase handles the heavy lifting of JWT token persistence.

We use `@supabase/ssr` to read tokens from secure HTTP-only cookies on the server, and `localStorage` on the client. 
Token refreshing happens automatically behind the scenes via the Next.js Middleware before any protected route is accessed.
