# 154 - Search Integration

The Collections page does not implement a local search bar. Instead, clicking the "Search" button in the `CollectionsToolbar` calls `setIsOpen(true)` from `useSearch()`. This hooks directly into the global `SearchProvider` implemented in Sprint 6, satisfying the requirement to reuse the existing search architecture.
