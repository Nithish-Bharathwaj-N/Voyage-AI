# 03. Authentication & Authorization

## Authentication (Supabase)
VoyageAI V2 uses Supabase Auth.
- Clients send a `Bearer <JWT>` in the `Authorization` header.
- NestJS `AuthGuard` verifies the JWT signature using the Supabase JWT secret.
- The user's Identity is attached to `req.user`.

## Authorization (RBAC)
- **`RolesGuard`**: Implements RBAC. Users are primarily `USER`, but admin endpoints require `ADMIN` role.
- **`OwnershipGuard`**: Ensures a user can only modify a `Trip` if their `userId` matches the trip's `ownerId` (or they are a collaborator).
