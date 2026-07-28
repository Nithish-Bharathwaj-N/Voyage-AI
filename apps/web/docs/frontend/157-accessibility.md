# 157 - Accessibility

- **Keyboard Focus**: `CollectionCard` and all `ItemCards` use `<Link>` or properly tagged divs with `focus-visible:ring-2 focus-visible:ring-primary` for visible focus states.
- **ARIA**: The Search button has `aria-label="Search collections"`.
- **Visual Contrast**: Dark gradient overlays (`from-black/80 to-transparent`) are placed underneath text that sits on top of images to guarantee WCAG AA contrast compliance.
