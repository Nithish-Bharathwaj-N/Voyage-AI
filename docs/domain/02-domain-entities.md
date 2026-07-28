# 02. Domain Entities

The core objects that make up the VoyageAI universe. These entities map directly to real-world travel concepts.

## Core Platform Entities
- **User:** The human operator of the platform.
- **Profile:** Personal preferences, travel history, and settings associated with a User.

## Knowledge Graph Entities
- **Destination:** A macro-level geographic region (e.g., Paris, Kyoto, Kerala).
- **Place:** A specific geographic point (e.g., Eiffel Tower, Tokyo Station).
- **Attraction:** A Place specifically visited for tourism.
- **Restaurant:** A Place specializing in food/beverage.
- **Hotel:** A Place providing accommodation.
- **TransportNode:** An airport, train station, or major bus terminal.
- **Festival:** A recurring cultural event tied to a specific Destination and Season.
- **Cuisine:** A culinary classification linked to a region.
- **TravelTip:** Contextual advice (e.g., "Beware of pickpockets near the station").
- **TravelInsight:** Analytical data (e.g., "75% of users visit this in Autumn").

## Trip & Planner Entities
- **Trip:** A saved, discrete journey associated with a User.
- **Itinerary:** The structured schedule bound to a Trip.
- **DayPlan:** A single 24-hour block within an Itinerary.
- **TimeSlot:** A specific block of time containing an Activity.
- **Activity:** An action taken by a user (e.g., visiting an Attraction, eating at a Restaurant).
- **Reservation:** A confirmed booking with an external provider (Flight, Hotel, Table).
- **Route:** A geographic path connecting two or more Places.

## Contextual Entities
- **WeatherSnapshot:** The historical or forecasted weather for a specific Destination on a specific date.
- **BudgetEstimate:** The projected cost for a destination categorized by style (Backpacker, Luxury).
- **Review:** A user-generated assessment of a Place.
- **Collection:** A user-curated list of saved Trips or Destinations (e.g., "Summer 2027 Ideas").

## Transient (Session) Entities
- **AIConversation:** The stateless chat log between a User and the AI Orchestrator.
- **PlannerState:** The ephemeral draft of a trip currently being built before persistence.
