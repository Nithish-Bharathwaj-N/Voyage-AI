# 09. WebSocket Roadmap (Future)

To support real-time collaborative planning in the future, the HTTP Adapter pattern has been chosen carefully.

Because our business logic lives in `ApplicationService` objects, a future `TripGateway` (WebSocket Controller) can inject the exact same `ModifyTripCommand` as the REST API.

## Events
Clients will connect to `/ws/planner` and subscribe to:
- `user_joined`
- `trip_modified`
- `ai_generation_status`
