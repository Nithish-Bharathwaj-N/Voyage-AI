# 01. AI Architecture

VoyageAI is a travel platform that happens to use AI, not an AI-first application. 
The AI Orchestrator strictly serves as a translation layer.

## The Prime Directive
- **No Hallucinated Data**: The AI does not generate travel facts (e.g. "Restaurant X exists"). It strictly orchestrates data retrieved from the `Knowledge Engine`.
- **No Direct DB Access**: The AI cannot modify database state directly.
- **Command Pattern**: The AI emits structured JSON commands (`AddActivity`, `ChangeBudget`). These commands are validated and executed by the `Planner Engine`.

## Architecture Flow
User Prompt -> Context Builder -> LLM Provider -> Raw JSON Output -> Validation Layer -> Planner Commands.
