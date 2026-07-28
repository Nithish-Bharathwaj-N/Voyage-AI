# 72. Repository Pattern

`PlannerRepository` is a singleton class with one method per API endpoint.
When the backend is unavailable, `withFallback()` catches the network error, applies a simulated delay, and returns typed placeholder data from `plannerMock.ts`.
This decouples the rest of the frontend from whether the API is live — enabling seamless local development without a running backend.
