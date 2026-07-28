# 39. API Integration Plan

Before Sprint 5, the `dashboardService.getDashboardData()` should be replaced.
The ideal state is to use `TanStack Query` (`useQuery`) if we move the fetching to the client, OR to implement a typed `fetch` call to our NestJS API layer within the `DashboardPage` Server Component, depending on the caching strategy.
