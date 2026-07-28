# 89. Testing Readiness

Testability hooks added in Sprint 5F:

1. **`data-testid` conventions**: All interactive elements follow `data-testid="planner-[component]-[action]"`. Example: `data-testid="activity-card-drag-handle"`.
2. **Zustand store exposed**: `usePlannerUIStore.getState()` and `setState()` are accessible in tests for seeding state.
3. **Repository injection point**: `PlannerRepository` is a singleton; swap `plannerRepository` in tests to return controlled data without mocks.
4. **Command pattern in UndoRedoManager**: Commands are pure objects with `execute` + `undo` — trivially unit-testable.

**Recommended testing stack**: Vitest + Testing Library + Playwright for E2E.
