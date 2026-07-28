# 35. Responsive Strategy

The dashboard utilizes CSS Grid heavily.

- **Desktop (`lg`+)**: A 3-column grid. The main content (Timelines, Trips) takes 2 columns, while secondary data (Insights, Activity) takes the rightmost column.
- **Tablet/Mobile**: The grid collapses into a single column. The `UpcomingTimeline` scales down its dates, and the `QuickActions` reflow from 4 columns to 2 columns.
