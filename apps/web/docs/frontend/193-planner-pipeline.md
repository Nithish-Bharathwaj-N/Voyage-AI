# 193 - Planner Execution Pipeline

The execution flows as follows:
`User Input -> PlannerValidator -> ContextBuilder -> PromptRegistry (trip-planner) -> ToolPlanner -> Provider (MockProvider) -> ResponseParser -> PlannerMapper -> PlannerCache -> UI`.
