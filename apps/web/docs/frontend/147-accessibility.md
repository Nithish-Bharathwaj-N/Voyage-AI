# 147 - Accessibility

- **Contrast**: The Hero image uses a dual-layer gradient (black/20 solid + background/60 gradient) to ensure text contrast remains accessible regardless of the image brightness.
- **Semantics**: `section` equivalents use proper heading hierarchy (`<h3>` inside `<h2>` contexts).
- **Navigation**: The `DestinationTabs` use `aria-label` and `aria-current="page"` to indicate active states.
