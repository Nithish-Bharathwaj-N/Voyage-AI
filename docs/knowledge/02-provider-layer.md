# 02. Provider Layer

The Provider Layer is an anti-corruption layer separating the Knowledge Engine from external APIs.

## Adapters
We implement the Adapter pattern:
- `GooglePlacesAdapter implements IPlaceProvider`
- `MapboxGeocodingAdapter implements IGeocodingProvider`
- `OpenWeatherAdapter implements IWeatherProvider`

## Contract Enforcement
External schemas (like the massive Google Places API response) are immediately stripped at the boundary. The rest of the system ONLY sees our internal normalized models. If Google changes their API, we only update the `GooglePlacesAdapter`.
