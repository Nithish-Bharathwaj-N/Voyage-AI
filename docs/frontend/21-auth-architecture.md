# 21. Authentication Architecture

VoyageAI V2 relies heavily on Supabase for the identity layer, leveraging `@supabase/ssr` to ensure secure authentication flows that work seamlessly with Next.js App Router and Server Components.

- **Route Group**: All auth-related routes are contained within the `(auth)` folder to easily apply the `AuthLayout` shell without impacting the marketing or dashboard applications.
- **Client & Server SDKs**: Implemented via `lib/supabase/client.ts` and `server.ts` to ensure cookies are read/written correctly depending on the rendering context.
