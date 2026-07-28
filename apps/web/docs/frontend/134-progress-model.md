# 134 - Progress Model

## Calculation
Currently, `planningProgress` is a hardcoded value on the `WorkspaceTrip` mock model (e.g. `45` or `100`).

## Future State
In Phase 3, this progress will be a computed property derived from:
- Has destinations?
- Has dates?
- Has booked flights?
- Has booked accommodations?
- Itinerary populated?

The `ProgressCard` will consume these boolean flags to render dynamic milestone checklists.
