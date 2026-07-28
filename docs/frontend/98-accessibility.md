# Accessibility (a11y) Blueprint (98)

Specification of semantic guidelines, ARIA rules, and keyboard configurations in the explore system.

## Landmark Semantics
- Filters sidebar uses `<aside>` elements.
- Main layout uses `<main>` elements.
- Individual sections use `<section>` elements.
- Image controls use unique `aria-label` tags.

## Keyboard Accessibility
- Custom list dropdowns are focusable.
- Input panels support standard tab-order navigation.
- Backdrop and modal overlays support close actions via click and tap handlers.
