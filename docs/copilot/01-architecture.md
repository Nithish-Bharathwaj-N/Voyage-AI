# 01. Copilot Architecture

The AI Copilot is the frontend manifestation of the AI Orchestrator. It acts as an interactive bridge between the user's natural language and the rigid UI of the Planner Workspace.

## Core Principle
**Visual State Mutability**: The AI cannot mutate the planner state in the background. If the user asks the AI to add a restaurant, the AI must propose the addition as a visual diff (the `CommandPreview`). The user must manually click "Approve" for the state to mutate.

## Data Flow
1. User types message in `CopilotPanel`.
2. Message sent to `/api/orchestrator` via React streams.
3. Server streams back Markdown reasoning.
4. Server emits a final JSON payload of `OrchestratorCommands`.
5. Frontend suspends the streaming state and triggers a `ApprovalDialog` displaying the `PlannerDiff`.
6. User approves -> `usePlannerStore.executeCommand()`.
