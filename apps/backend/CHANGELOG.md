# Changelog

All notable changes to the VoyageAI Real Data Foundation will be documented in this file.

## [Unreleased]

### Added
- **AI Provider Orchestration Layer (Phase 8.4)**
  - Created an enterprise-grade AI abstraction layer replacing `LlmFactoryService`.
  - Implemented `AiProvider` interface with robust methods for structured output, streaming, tokens, health, and cost estimation.
  - Added implementations for Gemini, OpenAI, Claude, DeepSeek, and OpenRouter.
  - Developed `AiRouterService` for intelligent task-based model routing and provider fallback chains.
  - Implemented `AiProviderManager` with built-in telemetry, caching, and fallback execution.
  - Extracted inline prompts into a centralized `PromptLibrary` (`src/ai/prompts/*.prompts.ts`).
### Added\n- Maps & Routing Intelligence Foundation (Phase 8.3)\n  - Mapbox integrations for Directions, Matrix, Geocoding, and Static Maps.\n  - OpenStreetMap (Nominatim) fallback for geocoding.\n  - `RoutingService`, `DistanceMatrixService`, `MapService`, `StaticMapService`, and `MapsIntelligenceService`.\n  - Typed DTOs for routes, steps, matrix, bounds, and intelligence helpers.\n  - Exposed `/maps` endpoints via `MapsController` for frontend consumption.\n

### Added
- **PlacesService**: Integrated `OpenTripMap` API as a fallback when `GOOGLE_PLACES_API_KEY` is not present, completely replacing the previous hardcoded mock responses.

### Removed
- **PlacesService**: Removed `getMockNearbyPlaces`, `getMockTextPlaces`, and `getMockPlaceDetails`.

### Changed
- **WeatherService**: Completely overhauled into a full Weather Intelligence Foundation. 
- **WeatherController**: Replaced `current` and `forecast` endpoints with a single unified `intelligence` endpoint returning AI-ready helper metrics.

### Added
- **Weather DTOs**: Added `WeatherIntelligenceDto`, `CurrentWeatherDto`, `HourlyForecastDto`, `DailyForecastDto`, `AirQualityDto`, and `WeatherAlertDto`.
- **WeatherService Methods**: Added `recommendBestTravelTime`, `recommendIndoorActivities`, `recommendOutdoorActivities`, `calculateWeatherRisk`, `detectExtremeConditions`, and `estimatePhotographyConditions`.
