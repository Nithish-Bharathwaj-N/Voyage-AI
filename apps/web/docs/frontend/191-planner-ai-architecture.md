# 191 - Planner AI Architecture

The AI Trip Planner builds upon the Sprint 11A Copilot Foundation. Instead of raw markdown streaming, the planner forces the LLM to output a strictly typed JSON payload (`AITripPlan`).

## Components
- **PlannerEngine**: Wrapper over `AIOrchestrator` to strictly map JSON outputs.
- **PlannerValidator**: Pre-flight checks on user input.
- **PlannerMapper**: Fuzzy parser that handles streamed string chunks and maps them back into JSON.
- **PlannerRepository**: Session management and TAN-stack integration.
