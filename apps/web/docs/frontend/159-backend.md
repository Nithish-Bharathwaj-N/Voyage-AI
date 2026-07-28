# 159 - Backend Integration Points

For future backend sprints (Phase 3):
1. `useCollections` should be updated to pass sorting/filtering params to `/api/v1/collections?sort=updated&filter=shared`.
2. `useCollectionItems` will map to `/api/v1/collections/:id/items`.
3. Add `useMutation` hooks for the "New Collection", "Delete", "Share", and "Edit" UI buttons, hooking up to optimistic updates in TanStack Query.
