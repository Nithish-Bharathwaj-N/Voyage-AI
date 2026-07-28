# 12. Future Expansion Roadmap

The VoyageAI domain model is explicitly designed not just for V2, but to scale seamlessly for future enterprise/consumer features without requiring a total rewrite.

## 1. Multi-User Collaboration (Google Docs for Travel)
- **Model Impact:** The `Trip` aggregate will adopt CRDTs (Conflict-free Replicated Data Types) at the state level. `User` relationships to `Trip` will expand into a Many-to-Many `CollaboratorRole` mapping (Viewer, Editor, Admin).

## 2. Real-Time Offline Mode
- **Model Impact:** The `TripState` in the frontend will utilize an IndexedDB cache (e.g., via RxDB or WatermelonDB). Changes will queue in a sync engine and flush to the `Trips API` when a connection is restored.

## 3. Direct Booking & Reservations
- **Model Impact:** The `Reservation` entity will expand. Currently it is a manual string reference. It will become a polymorphic interface linking out to Amadeus (Flights), Booking.com (Hotels), or OpenTable (Restaurants). 

## 4. Agentic AI Ecosystem
- **Model Impact:** Instead of a single "Planner", VoyageAI will host specialized agents. 
  - *Budget Agent:* Constantly monitors flight price drops.
  - *Weather Agent:* Sends push notifications if a storm threatens tomorrow's `DayPlan`.
  - These agents will subscribe to the `Domain Events` (e.g., `WeatherAlertIssued`).

## 5. Wearables & Voice
- **Model Impact:** Because the API Contracts and State Model are decoupled from the Web UI, an Apple Watch app or Siri Shortcut can simply emit `PlannerAction`s via the API to manipulate the trip in real-time.
