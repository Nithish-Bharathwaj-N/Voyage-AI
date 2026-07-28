# 119 — Future Backend Integration

## Swap Points

### TripRepository.listTrips()
Replace mock with:
```ts
GET /api/v1/trips?tab=my-trips&status=planning&sort=updated&page=1
```

### TripRepository.getStatistics()
Replace with:
```ts
GET /api/v1/trips/statistics
```

### Mutations (Sprint 7B)
| Method | Endpoint |
|---|---|
| archiveTrips(ids) | PATCH /api/v1/trips/bulk/archive |
| duplicateTrip(id) | POST /api/v1/trips/:id/duplicate |
| deleteTrips(ids) | DELETE /api/v1/trips/bulk |
| toggleFavorite(id, value) | PATCH /api/v1/trips/:id/favorite |

## Optimistic Update Pattern
Use TanStack Query `useMutation` with `onMutate` optimistic update + rollback
on `onError`. Follow the established pattern in PlannerRepository.
