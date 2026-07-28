# Keyboard Navigation Specification (105)

Describes the keyboard hotkeys, list-scrolling bindings, and focus traps for keyboard-only usage.

## Interactive Bindings
- `ArrowDown`: Increments `selectedIndex` to move selection highlight down.
- `ArrowUp`: Decrements `selectedIndex` to move selection highlight up.
- `Enter`: Invokes `executeAction` for the highlighted result.
- `Escape`: Closes command bar.

## List Scrolling
Inside `SearchResults.tsx`, a `useEffect` detects `selectedIndex` updates and invokes `activeEl.scrollIntoView({ block: 'nearest' })` to keep selection highlight visible within the scroll wrapper viewport.
