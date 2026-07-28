# 09. Preference Engine Architecture

## Responsibility
Extracts and learns from user behavior to tailor recommendations.

## Use Cases
- `UpdateUserPreferencesUseCase`
- `GetTailoredScoringWeightsUseCase`

## Policies
- **`ImplicitLearningPolicy`**: If a user consistently deletes museums from AI-generated trips, the engine downgrades the `CULTURE` weight for that user.

## Dependency Injection
Requires:
- `UserRepository`
- `EventSubscriber` (Listens to `TripModifiedEvent` from the EventBus to learn implicitly).
