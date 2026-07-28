# 129 - Future Backend Considerations

The `ReviewStep` currently simulates a mutation:
```ts
  const handleCreate = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    resetWizard();
    window.location.href = '/trips';
  };
```

In the next phase (Backend Integration), this step will dispatch a `POST /api/v1/trips` call carrying the aggregated `formData`. On success, it will navigate to `/trips/[id]` instead of `/trips`.
