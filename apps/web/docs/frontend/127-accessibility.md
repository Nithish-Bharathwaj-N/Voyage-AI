# 127 - Accessibility

- **Keyboard navigation**: Forms support standard Tab ordering. Radio cards (like Budget Brackets and Interests) use `<button type="button">` enabling Space/Enter interaction.
- **Focus**: Framer motion handles visual transitions, and we ensure no focus is trapped.
- **Disabled states**: Buttons properly use the `disabled` HTML attribute rather than just styling, ensuring screen readers announce them properly.
- **Validation feedback**: Local `react-hook-form` errors render right under inputs.
