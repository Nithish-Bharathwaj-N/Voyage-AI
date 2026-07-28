# 02. Entity Audit

*Auditor: Chief Software Architect*
*Objective: Identify missing, duplicate, or flawed entities in the Phase 2 domain.*

## Missing Entities Identified
1. **OperatingHours (Value Object -> Entity?):** 
   - *Issue:* Currently modeled as a Value Object, but places have complex holiday schedules and temporary closures.
   - *Fix:* Upgrade `OperatingSchedule` to an entity related to a `Place` if it requires independent ID tracking for overrides, or use a robust JSONB structure if kept as a Value Object.
2. **Booking/Reservation Metadata:**
   - *Issue:* `Reservation` is too abstract. A flight booking has a PNR, an airline, departure/arrival terminals, and baggage info. A hotel booking has check-in/out times and room types.
   - *Fix:* Use Polymorphism: `FlightReservation`, `HotelReservation`, `DiningReservation` extending a base `Reservation`.
3. **Trip Collaborator:**
   - *Issue:* Future roadmap mentions multi-user collaboration, but no entity bridges a `User` to a `Trip` other than the owner.
   - *Fix:* Introduce `TripMember` entity mapping `User` to `Trip` with a `Role` (Owner, Editor, Viewer).

## Over-Engineered Entities
1. **TimeSlot:**
   - *Issue:* Wrapping `Activity` strictly in a `TimeSlot` might be too rigid. Some activities are "Flexible" (e.g., "Sometime on Tuesday").
   - *Fix:* `TimeSlot` should be optional. An `Activity` can belong to a `DayPlan` without strict start/end times.

## Under-Modeled Entities
1. **WeatherSnapshot:**
   - *Issue:* The model doesn't specify granularity. Is it daily? Hourly? 
   - *Fix:* Needs to be highly specific: `DailyForecast` vs `HourlyForecast`, tied geographically to the `Destination`'s bounding box.
2. **BudgetEstimate:**
   - *Issue:* Budget is complex. Is it historical aggregate data or user-defined constraints?
   - *Fix:* Split into `DestinationCostIndex` (Knowledge Graph) and `UserBudgetConstraint` (Trip Context).

## Lifecycle Flaws
- *Issue:* When a `Place` closes permanently, deleting it from the Knowledge Graph will cascade and destroy historical `Trips` that referenced it.
- *Fix:* Soft deletes are mandatory. A `Place` must have an `isActive` flag. Past trips reference inactive places for historical integrity.
