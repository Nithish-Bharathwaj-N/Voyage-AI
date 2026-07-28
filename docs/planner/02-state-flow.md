# 02. State Flow

Data moves in a strict cycle to ensure the Map, Timeline, and Budget never fall out of sync.

## The Cycle
1. **Fetch**: `TanStack Query` fetches the `Trip` JSON from the Next.js API.
2. **Hydrate**: The data is cloned into `Zustand` (`usePlannerStore`).
3. **Interact**: User drags an activity. `Zustand` updates instantly (optimistic UI).
4. **Flush**: After a 2-second debounce, the `useAutosave` hook detects the Zustand change and fires a `TanStack Mutation` back to the API.

## No Duplication
The UI MUST read from `usePlannerStore`. It should never read directly from `useQuery` unless the store is explicitly `null` (loading state).
