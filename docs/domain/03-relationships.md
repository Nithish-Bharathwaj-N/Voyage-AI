# 03. Relationships

This document outlines how domain entities interact, their business meaning, lifecycle, and constraints.

## Core Hierarchy Relationships
- **Destination** `contains` **Places** (1 to Many)
  - *Business Meaning:* A macro region houses specific points of interest.
  - *Validation:* A Place must mathematically fall within the Destination's geographic bounding box.

- **Place** `offers` **Activities** (1 to Many)
  - *Business Meaning:* An Activity is what you *do* at a Place.
  - *Validation:* Activities must adhere to the Place's operating hours.

- **Trip** `contains` **DayPlans** (1 to Many)
  - *Business Meaning:* A trip is segmented into consecutive days.
  - *Lifecycle:* DayPlans are automatically generated when a Trip is instantiated with start/end dates.

- **DayPlan** `contains` **TimeSlots** (1 to Many)
  - *Business Meaning:* The granular chronological ordering of a day.
  - *Validation:* TimeSlots cannot overlap on a given DayPlan.

- **TimeSlot** `wraps` **Activity** (1 to 1)
  - *Business Meaning:* The assignment of a real-world action to a schedule.

## Cross-Context Relationships
- **Activity** `requires` **Transport**
  - *Business Meaning:* Transitioning from Activity A to Activity B necessitates routing logic.

- **WeatherSnapshot** `affects` **Activity**
  - *Business Meaning:* Outdoor activities become invalid or flagged if the snapshot indicates severe weather.

- **Reservation** `fulfills` **Activity**
  - *Business Meaning:* An abstract desire (e.g., "Sleep") is made concrete via a Reservation ("Hilton Hotel Confirmed").

- **User** `curates` **Collections** (1 to Many)
  - *Business Meaning:* Grouping trips for future reference or sharing.

## Knowledge Graph Relationships (Edges)
- **Place A** `near` **Place B** (Distance < X km)
- **Restaurant** `serves` **Cuisine**
- **Destination** `best_during` **Season**
- **Activity** `supports_budget` **BudgetTier** (Backpacker, Mid-range, Luxury)
- **Festival** `occurs_in` **Destination**

## Ownership Matrix
- **User** owns -> **Trips**, **Collections**, **Reviews**, **Profiles**.
- **Knowledge Engine** owns -> **Destinations**, **Places**, **Festivals**, **Cuisines**.
- **System** owns -> **WeatherSnapshots**, **TravelInsights**.

*(A Trip referencing a Destination does NOT copy the Destination data. It points to the Knowledge Node. If the Node updates, the Trip reflects the latest Knowledge).*
