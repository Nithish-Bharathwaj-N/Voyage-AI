# 122 - Step Engine

## Mechanism
The Wizard engine uses an index-based rendering system. `WizardLayout` accepts an array of step configuration objects:
```ts
{
  title: string;
  description: string;
  component: React.ReactNode;
}
```

Steps are rendered based on `currentStep`. Framer Motion wraps the rendering area with `AnimatePresence` for smooth transition effects.

## Navigation Rules
- **Forward**: Permitted only if the current step is valid.
- **Backward**: Always permitted.
- **Jump**: Permitted only if all previous steps up to the target index are valid.
