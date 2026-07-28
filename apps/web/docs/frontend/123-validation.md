# 123 - Validation Strategy

## Tools
- `zod`: For strict schema definitions.
- `react-hook-form`: Used within each step for local form control.
- `@hookform/resolvers/zod`: Links Zod schemas to form states.

## Per-step Validation
Each step initializes its own `useForm` with a slice of the global schema. For example, `DatesStep` uses `datesSchema`. 

```ts
  useEffect(() => {
    setStepValidity(currentStep, isValid);
  }, [isValid, currentStep, setStepValidity]);
```

The step watches `isValid` from `react-hook-form` and syncs it upward to the `WizardProvider`. The `WizardFooter` consumes this validity state to enable/disable the Next button.
