# 05. Testing Strategy

We employ a "Testing Pyramid" modified for AI workloads.

## 1. Unit Tests (Fast)
- **Domain logic**: `PlannerEngine` conflict resolution.
- **Validation**: Strict schema assertions for the `CommandValidator`.

## 2. Integration Tests (Slower)
- **Database**: Verifying PostGIS `ST_DWithin` queries accurately find nearby places.
- **AI Mocks**: Supplying raw mock JSON schemas to the `AIOrchestrator` to ensure the pipeline processes them correctly without burning actual LLM credits.

## 3. End-to-End Tests (Playwright)
- **The Critical Path**: A headless browser spins up -> Navigates to Planner -> Opens Copilot -> Types "Move the hotel to day 2" -> Mocks the API stream -> Asserts the `CommandPreview` appears -> Clicks "Approve" -> Asserts the Timeline visually updates.
