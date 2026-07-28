# 06. Accessibility

VoyageAI must be fully accessible. We cannot sacrifice usability for aesthetics.

## Focus Management
- Focus rings MUST be visible. Our design system relies on a consistent `ring-2 ring-primary ring-offset-2` outline.
- Dialogs and Drawers MUST trap focus.
- Dropdowns must support Arrow Key navigation.

## ARIA
All interactive elements that are not native HTML `<button>` or `<a>` tags must possess `role`, `aria-label`, and `aria-expanded` attributes where appropriate.
