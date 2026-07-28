# 33. Widgets Architecture

All dashboard widgets are located in `src/components/dashboard/`.

- **Primary Actions**: `WelcomeBanner`, `QuickActions`, `UpcomingTimeline`. These span the main column.
- **Secondary Data**: `InsightsPanel`, `MetricsGrid`, `ActivityFeed`. These are stacked in the right-hand column on large screens.
- **Reusable Core**: The `TripCard` is the most important reusable primitive, handling complex layouts (images with gradient overlays, absolute badges, flex-based progress bars).
