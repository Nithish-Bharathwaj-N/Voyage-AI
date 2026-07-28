# 197 - Performance Optimizations

- **Fuzzy Parsing**: Instead of re-rendering every 1ms, `PlannerMapper` absorbs chunks and only triggers React state updates when the JSON parsing doesn't throw.
- **Memoization**: UI Components like `ActivityCard` and `DailyTimeline` are decoupled to prevent the entire timeline from re-rendering when a single day updates.
