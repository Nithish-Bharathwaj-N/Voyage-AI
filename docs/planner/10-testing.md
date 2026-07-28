# 10. Testing

The planner requires intensive interaction testing because it relies heavily on client-side state.

## Strategy
- **Unit Tests**: Test the Zustand reducers independently. E.g., `test('moveActivity updates orderIndex correctly')`.
- **Integration Tests**: Test the `useAutosave` hook's debounce logic using Jest fake timers.
- **E2E**: Cypress/Playwright to physically drag a DOM node from one Day block to another and verify the map animation fires.
