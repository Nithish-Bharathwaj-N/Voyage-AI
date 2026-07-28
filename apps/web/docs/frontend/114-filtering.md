# 114 — Filtering

## Strategy
All filtering runs client-side against data returned by `tripRepository.listTrips()`.

## Pipeline
```
tripRepository.listTrips(tab, filter, sort)
   → filterByTab(trips, tab)   — tab pre-filter
   → filterTrips(trips, filter) — attribute filters
   → sortTrips(trips, sort)    — stable sort
   → [mock delay] → returned to useTrips hook
```

Client also applies `searchTrips(trips, query)` for inline text filtering
without a new API call.

## Supported Filters
| Key | Type | Notes |
|---|---|---|
| status | TripStatus[] | Multi-select chips |
| destination | string | Substring match on destinationsLabel |
| budgetBracket | BudgetBracket[] | economy / mid / luxury / ultra |
| dateRange | string | future / this-month / this-year / past |
| travelStyle | TravelStyle[] | adventure/culture/food etc |
| isFavorite | boolean | Heart filter toggle |
| isShared | boolean | Shared trips filter |
