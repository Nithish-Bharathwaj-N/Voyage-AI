# 22. Authentication Flow

## Standard Flow
1. User enters credentials on `/login` or `/signup`.
2. Form is validated client-side via Zod and React Hook Form.
3. Supabase Auth SDK submits the request.
4. On success, user is redirected to `/app`. On failure, a localized error message is displayed below the form.

## Password Reset Flow
1. User submits email at `/forgot-password`.
2. User receives an email with a secure link pointing to `/reset-password`.
3. User creates a new password (validated via Zod) and is redirected to `/login`.
