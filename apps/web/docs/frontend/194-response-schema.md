# 194 - Response Schema

The planner enforces the `AITripPlan` schema, containing:
- `summary`, `tripName`, `travelStyle`, `budget`, `weather`
- `days`: Array of `AIDailyPlan` (morning, afternoon, evening, meals)
- Global lists: `transportation`, `accommodation`, `restaurants`, `packing`, `warnings`, `tips`, `recommendations`
