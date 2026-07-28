# Search Repository Pattern (103)

Details the centralized search repository, indexing model, and data aggregation routines.

## centralized search APIs
`apps/web/src/lib/services/search.ts` acts as the single gateway for query lookups:
- `searchService.search(query, domain)`: Filters mock database by text matching and category tags.
- `searchService.getPinnedSearches()`: Fetches default dashboard shortcuts.
- `searchService.getPopularSearches()`: Aggregates trending searches.

## Extensibility Model
To search new domains (e.g. Booking vouchers or packing checklists), simply append records and register the tag under `SearchDomain` union types.
