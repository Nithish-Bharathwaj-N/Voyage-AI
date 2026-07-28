# 06. Security Review

*Auditor: Chief Software Architect*
*Objective: Identify vulnerabilities in authentication, authorization, and data isolation.*

## Authentication & Authorization
- **Status:** Standard JWT strategy assumed.
- **Risk:** Storing JWTs in `localStorage` in `apps/web` opens the platform to XSS attacks.
- **Mandate:** `apps/web` MUST use `httpOnly` secure cookies for session persistence. Next.js server actions or middleware will decrypt the cookie and pass the Bearer token to `apps/api`.

## API Isolation & Rate Limiting
- **Risk:** The Planner generation endpoint (`/api/planner/generate`) is computationally expensive (LLM calls) and financially costly.
- **Mandate:** 
  1. Strict rate limiting at the API Gateway level (e.g., Throttler in NestJS backed by Redis).
  2. Implement an "Abuse Detection" layer that temporarily bans users who spam generation requests.

## Data Privacy (Trips)
- **Risk:** IDOR (Insecure Direct Object Reference) on Trip endpoints.
- **Mandate:** Every single repository call fetching a `Trip` must implicitly include a `WHERE userId = current_user_id` clause unless the Trip's `isPublic` flag is true. This should be enforced at the Repository level, not left to the Controller to remember.

## Secret Management
- **Risk:** Hardcoded Gemini or Mapbox keys.
- **Mandate:** Enforce strict validation on boot. If `GEMINI_API_KEY` or `DATABASE_URL` is missing, the application must crash immediately on startup rather than failing silently later. (Use NestJS ConfigModule with Zod validation).
