# 31. Dashboard Architecture

The dashboard is the central hub of the VoyageAI authenticated experience. It lives at `/app/dashboard/page.tsx` and is wrapped in the `(app)` route group layout.

It strictly implements a Widget Architecture. The `DashboardPage` acts as a dumb orchestrator, retrieving data from the `dashboardService` and distributing it to purely presentational widget components (`TripCard`, `MetricsGrid`, `InsightsPanel`).
