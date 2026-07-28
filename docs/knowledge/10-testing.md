# 10. Testing

The Knowledge Engine must have absolute 100% test coverage for its normalization and ranking logic.

## Strategy
- **Adapter Tests**: Mock the 3rd-party HTTP responses (e.g., a massive JSON from Google Places) and verify that the Adapter successfully outputs the clean, typed `Place` entity.
- **Ranking Tests**: Provide a mock array of 5 places. Set the context to `weather: rain`. Verify that the indoor museum ranks higher than the outdoor park.
- **Graph Traversal Tests**: Ensure `SearchDestinationUseCase` successfully traverses `[Place] -> LOCATED_IN -> [City]`.
