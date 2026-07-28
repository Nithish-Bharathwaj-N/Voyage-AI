# 04. Aggregates and Transactional Boundaries

In Domain-Driven Design (DDD), an **Aggregate** is a cluster of domain objects that can be treated as a single unit for data changes. Every Aggregate has a **Root**, and outside entities may only hold a reference to the Root, not to its internal children.

## 1. Trip Aggregate
- **Root:** `Trip`
- **Internal Entities:** `Itinerary`, `DayPlan`, `TimeSlot`, `Activity`, `Reservation`
- **Transactional Boundary:** When a User updates a `TimeSlot`, the entire `Trip` aggregate must be validated (e.g., ensuring no overlapping times, validating total budget). You cannot modify a `DayPlan` independently of the `Trip`.
- **Invariants:** The sum of `DayPlan` dates must fit within the `Trip` start and end dates.

## 2. Destination (Knowledge) Aggregate
- **Root:** `Destination`
- **Internal Entities:** `Place`, `Attraction`, `Restaurant`, `TravelTip`
- **Transactional Boundary:** Maintained by the system data pipeline. When enriching a destination with AI, the `Destination` and its associated `Places` are updated atomically in the database to ensure geographic consistency.
- **Invariants:** Every `Place` inside the aggregate must share the same country and region codes as the root `Destination`.

## 3. User Aggregate
- **Root:** `User`
- **Internal Entities:** `Profile`, `PreferenceSettings`
- **Transactional Boundary:** Modifications to dietary restrictions or preferred budget affect the `Profile`, which is strictly bound to the `User`.
- **Invariants:** A User can only have one active Profile.

## 4. Collection Aggregate
- **Root:** `Collection`
- **Internal Entities:** `CollectionItem` (References to Trips or Destinations)
- **Transactional Boundary:** Adding or removing a saved trip from a bucket-list collection.

## 5. Planner Session (Transient) Aggregate
- **Root:** `PlannerSession`
- **Internal Entities:** `ConversationMemory`, `TripDraft`
- **Transactional Boundary:** This aggregate lives in Redis/Frontend memory. Modifying a prompt updates the `ConversationMemory`, which regenerates the `TripDraft`.
- **Invariants:** A session must always point to a valid User ID (or anonymous session ID). When saved, this transient aggregate is mapped and persisted into a `Trip` Aggregate.
