# 28. Onboarding Flow

To avoid a massive, daunting signup form, we split the process.

1. `/signup` strictly asks for Name, Email, and Password.
2. After email verification, the user hits the `/onboarding` route (a "Just one more step" page).
3. We collect contextual profile preferences (Display Name, Currency, Language).
4. These preferences are submitted to our backend (mocked during Sprint 3) before finally redirecting the user into the `(app)` dashboard.
