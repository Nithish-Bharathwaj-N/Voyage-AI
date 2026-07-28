# 30. Auth Best Practices

1. **Accessible Forms**: Every `<Input>` is tied to a `<Label>` via `id` and `htmlFor`. Error messages use standard visual cues (red borders).
2. **Loading States**: Submitting an auth form instantly triggers an `isLoading` state, disabling the submit button and replacing the text with a spinning `<Icon name="Loader2" />` to prevent double-submissions.
3. **Responsive Split Screen**: On mobile, the `AuthLayout` hides the decorative image panel and centers the form, ensuring 100% of the viewport is dedicated to the core task.
