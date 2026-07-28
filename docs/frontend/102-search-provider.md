# Search Provider Design (102)

Details state properties, action handlers, and global hotkey bindings of the unified search React context.

## React Context Interface
The `SearchProvider` wraps children in `layout.tsx` to preserve state context globally:
- `isOpen`: Controls visibility of the command overlay.
- `query`: Current query value.
- `domain`: Tab filter scope.
- `results`: Matching search results.
- `selectedIndex`: Active key index for key-down selections.
- `isLoading`: Network loading state.

## Global Shortcuts
Listens to `keydown` globally:
- `Cmd + K` (MacOS) / `Ctrl + K` (Linux/Windows): Toggles `isOpen` toggle.
- `Escape`: Closes modal.
