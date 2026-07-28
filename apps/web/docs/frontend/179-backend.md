# 179 - Backend Integration Points

In Sprint 11+:
1. `useSettings()` maps to `GET /api/v1/users/me/settings`.
2. The "Save Changes" button will gather the modified state and execute a `useMutation` hook bound to `PATCH /api/v1/users/me/settings`.
3. The Security and Connected Accounts placeholders will be replaced with real OAuth flows and 2FA credential setups.
