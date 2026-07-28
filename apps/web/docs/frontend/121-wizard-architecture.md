# 121 - Wizard Architecture

## Overview
The New Trip Wizard (`/trips/new`) provides a premium, multi-step flow for generating trips. It decouples the UI steps from the state engine to ensure reusability and isolated step rendering.

## Core Components
- **WizardProvider**: Context holding `currentStep`, `formData` (aggregating all steps), `stepValidity` map, and `jumpToStep`/`nextStep`/`prevStep` controls. It manages local autosave via `localStorage`.
- **WizardLayout**: Renders the outer shell, including the desktop sidebar (`WizardSidebar`) and mobile progress bar (`WizardProgress`).
- **Steps**: Individual form components using `react-hook-form`. They watch for changes and dispatch to `updateFormData` and `setStepValidity`.
- **WizardFooter**: Sticky bottom action bar controlling navigation and showing a final submission state.
