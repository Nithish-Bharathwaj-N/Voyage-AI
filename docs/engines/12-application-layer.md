# 12. Application Layer Architecture

## Responsibility
The Application Layer (located in `packages/application`) is the thin glue that orchestrates the various Engines. It is the exact boundary that HTTP Controllers (in `apps/api`) interact with.

## Why have an Application Layer?
If the HTTP Controller directly talks to the `PlannerEngine`, `WeatherEngine`, and `BudgetEngine`, the controller becomes "fat" and difficult to test without a full HTTP mock setup. 
By placing orchestration here, we can trigger a complex workflow (like "Generate Trip") via REST, CLI, WebSockets, or a CRON job.

## Example Flow: `GenerateTripApplicationService`
1. **Input:** Receives `CreateTripDto` from HTTP controller.
2. **Knowledge Engine:** `resolveDestination(dto.destinationId)`
3. **Planner Engine:** `createTripDraft(destination, dto.dates)`
4. **AI Reasoning:** Passes draft constraints to LLM.
5. **Recommendation Engine:** Ranks the AI's selected places based on user preferences.
6. **Routing Engine:** Solves TSP for the ranked places to assign times.
7. **Budget Engine:** Calculates total cost.
8. **Repository:** Saves the final `Trip` to PostgreSQL via `UnitOfWork`.
9. **Event Bus:** Publishes `TripCreatedEvent`.
10. **Output:** Returns `Result<TripDetailDto, AppError>`.

This ensures **Zero Business Logic** escapes into the web framework.
