# 09. Type Hierarchy

The type hierarchy maps how abstract domain models resolve into concrete implementations. This drives database polymorphism and polymorphic UI rendering.

## The 'Place' Hierarchy
Everything physically visitable inherits from `Place`.

```text
Place (Abstract)
  ├── Restaurant
  │     ├── FineDining
  │     ├── Casual
  │     ├── Cafe
  │     └── StreetFood
  ├── Lodging
  │     ├── Hotel
  │     ├── Hostel
  │     ├── Resort
  │     └── Rental
  ├── Attraction
  │     ├── Museum
  │     ├── Landmark
  │     ├── Park
  │     └── Temple
  └── TransportNode
        ├── Airport
        ├── TrainStation
        └── BusTerminal
```
*Implementation Note:* All inherit base properties (`Coordinates`, `Address`, `Name`, `Images`) but implement specific interfaces (e.g., `Restaurant` has `CuisineList`; `Hotel` has `StarRating`).

## The 'Activity' Hierarchy
Activities define what a User *does* at a `Place`.

```text
Activity (Abstract)
  ├── Sightseeing
  ├── Dining
  ├── Transit
  ├── Leisure
  └── Adventure
```
*Implementation Note:* The frontend renders a unique Timeline Card based on the Activity type (e.g., Transit cards show a train icon and duration; Dining cards show a reservation link).
