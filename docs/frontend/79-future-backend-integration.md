# 79. Future Backend Integration

When the NestJS API is available, only one file needs to change: `PlannerRepository.ts`.
Replace the `withFallback()` stubs with real `apiClient.get()` calls. The rest of the architecture (query hooks, selectors, store, components) is completely agnostic to whether data is real or mocked.

Mutation stubs (`createActivity`, `moveActivity`, `deleteActivity`) are already defined. Sprint 5F will wire them up as `useMutation()` hooks with optimistic updates.
