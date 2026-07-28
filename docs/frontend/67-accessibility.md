# 67. Accessibility

- Custom `KeyboardSensor` is configured in `@dnd-kit`, allowing users to pick up and move items using Space/Enter and Arrow Keys.
- The `DragHandle` component uses a generic HTML button pattern that remains accessible to screen readers, reading out "Drag Handle" inherently if ARIA labels are added.
- Focus outlines are respected during all interactions.
