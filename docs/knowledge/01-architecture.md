# 01. Knowledge Engine Architecture

The Knowledge Engine is the single source of truth for all travel data. It ensures that the application operates on deterministic facts rather than AI hallucinations.

## Core Principles
1. **Absolute Truth**: If it doesn't exist in the Knowledge Graph, it doesn't exist in the Planner.
2. **Provider Agnostic**: The engine abstracts away APIs like Google Places, Mapbox, and OpenWeather behind unified interfaces.
3. **Decoupled from AI**: The engine provides the data; the AI provides the reasoning. The AI is simply a consumer of this engine.

## Sub-Engines
- **Search Engine**: Resolves text, coordinates, and filters into domain entities.
- **Ranking Engine**: Scores entities based on context (weather, budget, rules).
- **Rule Engine**: Hardcoded heuristic constraints (e.g., If raining -> boost indoor activities).
