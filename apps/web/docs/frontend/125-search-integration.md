# 125 - Search Integration

## Destination Step
Step 1 uses an inline input mapped to `searchService.search(query, domain)` rather than the global Cmd+K layout.

We search across three domains:
- `destinations`
- `cities`
- `countries`

The results are deduplicated locally using `new Map()` against item IDs. Selecting a result maps the `SearchResultItem` to the `destinations` form field array.
