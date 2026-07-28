# 04. Graph Model

VoyageAI treats travel data as a connected Geographic Knowledge Graph, allowing for advanced semantic traversals.

## Nodes
- **Geographic Nodes**: Destination, Country, City, Place, Landmark.
- **Service Nodes**: Restaurant, Hotel, Transport.
- **Context Nodes**: Weather, TravelTip, Review, Festival.

## Edges
Relationships allow us to answer complex queries quickly:
- `(Place: Eiffel Tower) -[LOCATED_IN]-> (City: Paris)`
- `(Place: Louvre) -[NEAR {distance: 1.2km}]-> (Place: Notre Dame)`
- `(City: Bali) -[SIMILAR_TO]-> (City: Phuket)`
- `(Place: Museum) -[BEST_DURING]-> (Weather: Rain)`

This allows queries like: "Find places NEAR my hotel that are BEST_DURING rain."
