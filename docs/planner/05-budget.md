# 05. Budget Panel

The budget is a derived state.

## Rules
- The API does not compute the live budget.
- `usePlannerStore` maintains a getter: `getComputedBudget()`.
- It iterates through all `activities` in the `trip` state, summing the `costMin` and `costMax` fields.
- Costs are dynamically converted to the `Profile.preferredCurrency` using a static conversion table (for now).
