# 06. Weather Panel

Weather is purely decorative but critical for planning.

## Integration
- The `WeatherEngine` (Backend) provides a 14-day forecast for the Destination.
- If an activity is categorized as `OUTDOOR`, the UI checks the corresponding Day's forecast.
- If rain is predicted, the UI renders a small `<WarningIcon>` next to the activity in the Timeline.
