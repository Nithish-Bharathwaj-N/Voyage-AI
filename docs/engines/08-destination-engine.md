# 08. Destination Engine Architecture

## Responsibility
Aggregates rich metadata about a Destination to build the "Explore" page on the frontend.

## Use Cases
- `BuildDestinationProfileUseCase`
- `GetTravelTipsUseCase`

## Policies
- **`ContentAggregationPolicy`**: Joins descriptions, average weather, top 5 attractions, and currency info into a single cohesive `DestinationProfile` DTO.

## Dependency Injection
Requires:
- `DestinationRepository`
- `WeatherEngine`
