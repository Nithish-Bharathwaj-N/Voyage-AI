# 51. Timeline Architecture

The Planner Timeline utilizes a recursive hierarchy to render complex itineraries efficiently.
The data model flows: `Itinerary` -> `TimelineDay`[] -> `TimelineSection`[] -> `PlannerActivity`[].
This separation of concerns ensures that the `PlannerCanvas` only iterates over days, while `DaySection` handles the internal grouping, preventing massive component re-renders when a single activity is modified.
