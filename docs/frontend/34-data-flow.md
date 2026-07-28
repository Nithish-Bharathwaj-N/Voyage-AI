# 34. Data Flow

Because the exact backend DTOs for the dashboard aggregator aren't finalized, we established a strict frontend Mock Service Layer in `src/lib/services/dashboard.ts`.

`DashboardPage` (a Server Component) `await`s the data from `dashboardService.getDashboardData()`. This prevents scattering mock data arrays inside individual UI components and makes the future swap to a real API `fetch()` or TanStack Query hook completely seamless.
