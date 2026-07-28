# 07. Travel Knowledge Graph

The beating heart of VoyageAI. Rather than letting LLMs hallucinate destinations, VoyageAI strictly models travel data geographically and semantically. 

## Graph Topology

### Nodes
- **Macro Nodes:** `Country`, `Region`, `Destination (City)`.
- **Micro Nodes:** `Attraction`, `Restaurant`, `Hotel`, `TransitStation`.
- **Concept Nodes:** `Cuisine` (e.g., "Japanese"), `Vibe` (e.g., "Romantic", "Adventure"), `Festival` (e.g., "Oktoberfest").

### Edges (Relationships)
- **Spatial Edges:** 
  - `located_in` (Eiffel Tower -> Paris)
  - `near` (Eiffel Tower <-> Seine River, dist: 0.5km)
- **Temporal Edges:** 
  - `best_during` (Kyoto -> Autumn Season Node)
- **Semantic Edges:** 
  - `serves` (Sushi Dai -> Sushi Node)
  - `highly_rated_for` (Paris -> Romantic Vibe Node)
- **Logistical Edges:** 
  - `connected_by` (JFK Airport -> LHR Airport, via Flight)

## AI Reasoning via the Graph
When a user asks, *"Plan a romantic trip to Japan in November for a foodie"*:
1. The backend parses constraints: `Vibe=Romantic`, `Country=Japan`, `Time=November`, `Tag=Foodie`.
2. The Graph is queried.
3. **Graph Result:** Traverses Japan -> `best_during` November -> finds Kyoto & Tokyo. Filters Kyoto by `highly_rated_for` Romantic. Filters restaurants by `Cuisine` nodes.
4. **LLM Synthesis:** The raw, accurate graph JSON is fed to Gemini. Gemini is asked *only* to organize this truth into a readable itinerary, preventing 100% of hallucinations.
