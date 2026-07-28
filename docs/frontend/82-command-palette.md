# 82. Command Palette

`PlannerCommandPalette` is triggered by `Cmd+K`.
Data sources:
1. **Static commands**: Always available (navigation, global actions).
2. **Dynamic activities**: Sourced from the TanStack Query cache via `usePlanner()` — zero extra fetches.

Navigation: `↑↓` arrows, `Enter` to select, `Escape` to close.
Results are grouped by type (Navigation / Actions / Activities / Days) and limited to 12 items for performance.
The palette is accessible with `role="dialog"`, `aria-modal`, `aria-label`, `aria-activedescendant`, and `aria-autocomplete`.
