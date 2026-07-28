# 84. Toast Architecture

Custom-built toast system using React Context + Framer Motion. No external dependency added.

Queue management: A max of 5 toasts can be visible simultaneously. New toasts append to the queue and auto-dismiss after their configured `duration` (default 4000ms).

Variants: `success`, `error`, `warning`, `info`. Each has a distinct left color strip and icon.

Special variant: `undoable` — sets a 6000ms duration and renders an "Undo" action button.

All toast announcements include `role="alert"` and `aria-live="polite"` for screen readers.
