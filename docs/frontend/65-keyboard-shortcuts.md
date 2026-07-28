# 65. Keyboard Shortcuts

A global event listener is established in `KeyboardShortcuts.tsx` (mounted inside the Provider).
- **Escape**: Clears selection and closes the context menu.
- **Delete/Backspace**: Reads the `selectedIds` and prepares them for deletion.
This decouples key handling from specific DOM elements, ensuring keyboard navigation feels native.
