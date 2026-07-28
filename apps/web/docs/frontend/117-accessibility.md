# 117 — Accessibility

## ARIA Implementation
| Element | ARIA |
|---|---|
| Tab bar | role="tablist", role="tab", aria-selected |
| Content area | role="tabpanel", aria-labelledby |
| Card grid | role="grid", role="gridcell" |
| List rows | role="row" |
| Selectable cards | aria-checked |
| Icon-only buttons | aria-label |
| Favorite button | aria-pressed |
| Progress bar | role="progressbar", aria-valuenow/min/max |
| View toggle | aria-pressed, aria-label |

## Keyboard Model
- Tab navigates between interactive elements
- Escape clears selection and closes drawers
- Cmd+K opens global search overlay

## prefers-reduced-motion
Framer Motion respects system preference.
