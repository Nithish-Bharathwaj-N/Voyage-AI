# 192 - Planner Engine

`PlannerEngine.generatePlan()` is the core orchestration function. It takes structured `PlannerInputData`, stringifies it as a query, passes it through the AI Pipeline, intercepts the streamed chunks via `onStreamUpdate`, and maps the final result via `PlannerMapper.parseFinal`.
