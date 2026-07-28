# 76. Cache Strategy

| Data | staleTime | gcTime |
|---|---|---|
| Trip metadata | 10 min | 60 min |
| Itinerary | 5 min | 30 min |
| Activities by day | 5 min | 30 min |
| Destinations | 10 min | 60 min |

Background refetch is disabled (`refetchOnWindowFocus: false`) to prevent jarring UI refreshes mid-edit.
When mutations eventually run, they will call `queryClient.invalidateQueries(plannerKeys.itinerary(tripId))` to trigger a fresh fetch.
