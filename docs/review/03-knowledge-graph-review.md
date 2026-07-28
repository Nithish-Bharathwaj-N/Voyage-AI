# 03. Knowledge Graph Review

*Auditor: Chief Software Architect*
*Objective: Validate the Knowledge Graph's topology and ability to support advanced platform features.*

## Node Validation
- **Nodes mapped:** `Destination`, `Place`, `Attraction`, `Restaurant`, `Hotel`, `Cuisine`, `Festival`, `Season`.
- **Verdict:** Sufficient for MVP. 
- **Missing Concept Nodes:** `Vibe/Atmosphere` (e.g., "Romantic", "Kid-Friendly", "Adrenaline"). We cannot rely purely on NLP searching; these must be actual nodes to enable fast categorical filtering.

## Edge (Relationship) Validation
- **Edges mapped:** `located_in`, `near`, `best_during`, `serves`, `connected_by`.
- **Missing Edges:** 
  - `competes_with` or `similar_to`: Crucial for AI fallback recommendations if a specific restaurant is fully booked.
  - `frequently_paired_with`: If 80% of users visit the Louvre and then a specific nearby cafe, the graph should track this edge to drastically improve recommendation speed over raw LLM reasoning.

## Search & Traversal Evaluation
### Can it support Itinerary Generation?
- **Yes.** By using `located_in` and `near` edges, the system can cluster daily activities geographically, preventing itineraries that require crossing Paris four times in one day.
### Can it support Hidden Gems?
- **Yes.** A `Place` node could have a `popularity_index` property. A query for "Hidden Gems" simply filters nodes where `popularity_index` < Threshold.
### Can it support Weather-Aware Planning?
- **Yes, but needs bridging.** The Graph is static/slow-moving, while Weather is hyper-dynamic. The backend must intersect the Graph query with the volatile `WeatherSnapshot` before passing data to the AI.

## Architectural Bottleneck
Graph traversal in a standard relational database (like PostgreSQL) requires expensive recursive CTEs. 
- **Risk:** Complex queries like "Find all romantic restaurants near attractions open on Sundays in Tokyo" will cripple Postgres if heavily trafficked.
- **Mitigation Strategy:** 
  1. Denormalize frequently accessed clusters into materialized views.
  2. Or, introduce a specialized search index (Elasticsearch/Typesense) or a graph database (Neo4j) alongside Postgres *only* for complex querying. For V2 MVP, Postgres with PostGIS (for spatial querying) is acceptable, provided we index heavily.
