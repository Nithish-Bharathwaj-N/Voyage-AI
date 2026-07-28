# 07. Weather Engine Architecture

## Responsibility
Provides weather snapshots for the `RecommendationEngine` to score places and the `PlannerEngine` to warn users (e.g. "It is forecasted to rain on Day 3, perhaps move the Museum tour here").

## Use Cases
- `GetWeatherForecastUseCase`
- `AnalyzeSeasonalityUseCase`

## Strategies
- **`LiveForecastStrategy`**: Used if the Trip Date is <= 14 days away. Hits OpenWeatherMap.
- **`HistoricalAveragesStrategy`**: Used if the Trip Date is > 14 days away. Returns statistical averages from the Knowledge Graph.

## Dependency Injection
Requires:
- `HttpClient`
- `CacheClient`
