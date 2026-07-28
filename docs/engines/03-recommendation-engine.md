# 03. Recommendation Engine Architecture

## Responsibility
Scores and ranks arrays of `Place` objects based on contextual constraints (weather, budget, user history).

## Use Cases
- `RankPlacesForDayPlanUseCase`
- `DiscoverHiddenGemsUseCase`

## Scoring Policies
- **`BudgetAlignmentPolicy`**: Penalizes places that exceed the user's `BudgetCategory`.
- **`CrowdAvoidancePolicy`**: Boosts places with low historical traffic if the user's `TravelStyle` is `ROMANTIC`.
- **`WeatherSuitabilityPolicy`**: Penalizes outdoor `Attractions` if the `WeatherEngine` predicts rain.

## Rules
This engine does NOT fetch data. It takes an array of Places (usually fetched by the Knowledge Engine) and returns the same array sorted by a generated `relevanceScore`.
