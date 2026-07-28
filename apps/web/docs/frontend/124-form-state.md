# 124 - Form State & Autosave

## Unified State
State is aggregated in `WizardProvider` under `formData` of type `Partial<WizardFormData>`.
As a step is submitted (e.g., clicking Next), `onSubmit` calls `updateFormData(data)` with the local form values.

## Local Autosave
The provider automatically caches `{ formData, currentStep, stepValidity }` to `localStorage` under `voyage-trip-wizard-autosave`. Upon remounting (e.g., accidental refresh), it restores this state.

Autosave is cleared explicitly in `resetWizard()` when a trip is successfully created or discarded.
