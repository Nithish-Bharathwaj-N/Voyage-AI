# 05. Search Engine

The Search subsystem translates user or system queries into Graph Traversals or PostGIS spatial queries.

## Search Capabilities
- **Autocomplete**: High-speed, cached typeahead for Destinations and Places.
- **Radius Search**: "Find hotels within 5km of coordinates [x, y]". Uses PostGIS `ST_DWithin`.
- **Category Filter**: Filter search results by internal normalized categories (`LUXURY`, `BUDGET`, `FAMILY`).
- **Semantic/Context Search**: "Find me somewhere warm". The Engine maps "warm" to a Weather constraint, querying nodes that match historical weather patterns for the given month.
