# Search Experience and Suggestions (95)

Details the autocomplete, local history persistence, and search highlighting implementations inside `EnhancedSearch.tsx`.

## Autocomplete Dropdown
As the user types, a React hook calls `exploreService.getSearchSuggestions(query)` to populate matching suggestions (split by category: Destinations, Styles, Categories).

## History & Popular Searches
- **History**: Stores the 5 most recent search strings in local storage (`explore-recent-searches`). Users can click history items to search again or click the delete icon to remove them.
- **Popular searches**: Displays tag buttons representing popular search terms. Clicking search buttons executes the queries instantly.

## Matches Highlight
Uses a regular expression splitting system to wrap characters matching the query string inside `<strong className="text-primary font-bold">` tags.
