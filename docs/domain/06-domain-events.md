# 06. Domain Events

Domain Events capture business occurrences in the past. They are essential for decoupling systems, driving analytics, and triggering background asynchronous jobs (like email notifications or data enrichment via BullMQ).

## User & Identity Events
- `UserRegistered`: Triggers welcome email and default Profile creation.
- `ProfileUpdated`: Triggers re-evaluation of saved Trips to match new dietary/budget preferences.

## Trip & Planner Events
- `PlannerSessionStarted`: Logged for analytics to track conversion rates.
- `TripDraftGenerated`: Fired when the AI returns a valid itinerary. 
- `TripCreated`: Fired when a User explicitly saves a draft to the database.
- `TripUpdated`: Triggers cache invalidation for the frontend.
- `TripPublished`: Shared publicly; triggers indexing for SEO or internal search.

## Knowledge Graph Events
- `DestinationViewed`: Increments trending counters for the Dashboard.
- `PlaceDataStale`: Emitted via a cron job when a Place hasn't been updated in 30 days. Triggers a background worker to fetch the latest Google Places / OpenTripMap data.
- `WeatherAlertIssued`: Emitted if an external Weather Service flags a severe event in a Destination where Users have upcoming Trips.

## Social & Collection Events
- `CollectionCreated`: User creates a new bucket list.
- `TripAddedToCollection`: Used for recommendation algorithms.
- `ReviewSubmitted`: Recalculates the aggregate `Rating` Value Object for a `Place` in the Knowledge Graph.
