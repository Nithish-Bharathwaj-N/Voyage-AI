# 85. Accessibility Audit

Improvements applied in Sprint 5F:

| Area | Change |
|---|---|
| Timeline sections | `role="list"` + `role="listitem"` on all activity lists |
| Day panels | `aria-label="Day N: [title]"`, `aria-expanded` on toggle button |
| Activity sections | `role="region"` with `aria-label` |
| Timeline ruler | `aria-hidden="true"` (purely decorative) |
| Toast stack | `role="alert"` + `aria-live="polite"` |
| Context menu | `aria-label` on all icon-only buttons |
| Command palette | Full `aria-modal`, `aria-activedescendant`, `role="listbox"`, `role="option"` |
| PlannerShell | Semantic `<main>`, `<aside>`, `role="contentinfo"` |

**Remaining gap**: Focus trap inside the Command Palette and Shortcuts Modal (Sprint 5G task).
