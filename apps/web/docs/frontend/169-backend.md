# 169 - Backend Integration Points

In Sprint 11:
1. `useProfile()` maps to `/api/v1/users/me` (for the authenticated user view) or `/api/v1/users/:username` (for public profile views).
2. The "Edit Profile" button will need to open a modal utilizing a `useMutation` hook bound to `PATCH /api/v1/users/me`.
3. Avatar uploading will require integration with an S3/GCS bucket for presigned URL uploads.
