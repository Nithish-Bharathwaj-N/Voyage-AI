# 09. Autosave Engine

Users should never click "Save".

## Flow
1. We use a custom hook `useAutosave(tripId)`.
2. It subscribes to `usePlannerStore.subscribe`.
3. If the Trip state changes, it triggers a `lodash.debounce` function (2000ms).
4. The debounced function invokes `TanStack Query`'s `useMutation` to send a `PATCH /api/v1/trips/:id` request containing the current JSON snapshot of the state.

## Conflict Resolution
We use optimistic locking via the `version` field. If the backend rejects the save because the version is stale (e.g., modified on another tab), the UI throws an error modal asking the user to refresh.
