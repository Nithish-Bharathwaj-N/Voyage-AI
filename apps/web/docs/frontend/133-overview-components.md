# 133 - Overview Components

The `TripOverview` acts as the composition layer for the default tab.

## Cards
- `TripSummaryCard`: Displays the total duration and relative last updated time (`date-fns`).
- `BudgetOverviewCard`: Reads `totalBudget` and `budgetBracket`.
- `WeatherCard`: Extracts the `weatherPreview` embedded inside the mock trip.
- `TravelerCard`: Renders avatar circles for `sharedWith` users.
- `ProgressCard`: Visualizes the `planningProgress` percentage.

## Activities
- `DestinationHighlights`: Parses `destinationsLabel` into individual destination pills.
- `UpcomingActivitiesPreview`: Placeholder for itinerary.
- `RecentActivityTimeline`: Renders fake recent edit history based on `createdAt` and `updatedAt`.
