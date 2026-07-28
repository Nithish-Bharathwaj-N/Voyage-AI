# 126 - Performance Optimizations

- **Debounced Searching**: The search lookup in Step 1 is debounced by 300ms to reduce mock network traffic.
- **Form Isolation**: Each step manages its own render cycles using `react-hook-form`. Typing in an input only triggers re-renders within that step, not the whole wizard.
- **Stable References**: Navigation functions in `WizardProvider` are wrapped in `useCallback`. The context value is wrapped in `useMemo`.
