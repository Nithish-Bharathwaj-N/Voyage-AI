# 10. Accessibility (a11y)

The VoyageAI interface must be usable by all travelers.

## Standards
- **shadcn/ui**: Under the hood, this uses Radix UI primitives, ensuring that all Tabs, Dialogs, and Dropdowns have full keyboard navigation and correct ARIA tags out of the box.
- **Color Contrast**: Our premium dark mode palette will be tested against WCAG AA standards.
- **Focus Management**: Focus traps must be utilized in the `WorkspaceLayout` sidebars when modals are open.
