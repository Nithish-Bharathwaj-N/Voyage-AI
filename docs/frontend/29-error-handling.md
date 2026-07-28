# 29. Error Handling

When Supabase throws an authentication error (e.g., "Invalid login credentials"), we do not crash the app or rely on native browser `alert()` boxes.

Errors are caught in the `onSubmit` handler, stored in localized state (`error`), and rendered cleanly inside a `destructive` colored `div` placed prominently at the top of the form, directly above the inputs.
