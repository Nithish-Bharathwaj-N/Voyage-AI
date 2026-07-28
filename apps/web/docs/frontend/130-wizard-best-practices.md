# 130 - Wizard Best Practices

- **Never mutate `formData` directly**: Always use `updateFormData` from `useWizard`.
- **Always validate before advancing**: Sync `isValid` to `setStepValidity(currentStep, isValid)`.
- **Prefer `<button type="button">` for custom selects**: Using divs with `onClick` hurts accessibility.
- **Clean up on unmount**: Only use `resetWizard` explicitly on completion; let the `useEffect` handle restoring autosave on remounts.
- **Do not fetch inside step renders**: Abstract external data fetches (like Search) into async handlers (e.g., `useEffect` with debounce) to keep renders pure.
