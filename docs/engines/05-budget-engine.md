# 05. Budget Engine Architecture

## Responsibility
Calculates estimated costs for generated itineraries and provides live budget warnings if a user manually adds a luxury hotel to a backpacker trip.

## Use Cases
- `CalculateTripCostEstimateUseCase`
- `ConvertCurrencyUseCase`

## Policies
- **`CurrencyNormalizationPolicy`**: All internal logic stores and computes `amountInCents` relative to USD. Only converted to the user's `preferredCurrency` at the boundary layer.
- **`BudgetViolationPolicy`**: If `totalCost > maxBudget * 1.1`, flag the TripDraft with a `BUDGET_WARNING` state.

## Dependency Injection
Requires:
- `HttpClient` (to fetch live Exchange Rates if needed, cached via Redis).
