# 118 — Component Library

## Public API

### TripCardDispatcher
```tsx
<TripCardDispatcher
  trip={WorkspaceTrip}
  variant="standard" | "featured" | "compact" | "list" | "timeline" | "template"
  isSelected={boolean}
  onSelect={(id, multi) => void}
  onQuickAction={(id, action) => void}
/>
```

### TripStatusBadge
```tsx
<TripStatusBadge status="planning" | "confirmed" | "active" | "completed" | "cancelled" size="sm" | "md" />
```

### TripProgressBar
```tsx
<TripProgressBar progress={0-100} showLabel={boolean} />
```

### TravelersChip
```tsx
<TravelersChip count={number} sharedWith={SharedUser[]} />
```

### StatisticsBar
```tsx
<StatisticsBar stats={TripStatistics} />
```

### TripsTabBar
```tsx
<TripsTabBar activeTab={TripTab} counts={TabCounts} onTabChange={(tab) => void} />
```
