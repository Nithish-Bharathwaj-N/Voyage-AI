# Search Accessibility Guidelines (107)

Defines combobox guidelines, aria attributes, and focus trap states for screen-readers.

## ARIA Guidelines
- Input element implements `role="combobox"` and `aria-expanded={isOpen}`.
- Result lists use `role="listbox"` with cards styled as `role="option"`.
- Keyboard helpers use `<kbd>` landmarks for readability.
- Clear and action triggers are focus-bound.
