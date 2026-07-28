# Search Best Practices (110)

Constraints, conventions, and practices for search modifications.

## Rules
- **No inline handlers**: Keep event listeners defined within top-level `useEffect` hooks.
- **Never duplicate state**: Do not duplicate query strings inside child elements. Rely exclusively on the context exposed by `useSearch()`.
- **Keyboard-First focus**: Always ensure dialog containers are focus-managed to prevent keyboard navigation breaks.
- **Mock Syncing**: When adding database models, always mock equivalent domain actions in the `searchService` service.
