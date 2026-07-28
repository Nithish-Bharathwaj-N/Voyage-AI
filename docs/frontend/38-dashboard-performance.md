# 38. Performance Optimization

- **Server Components**: The `DashboardPage` is a Server Component, meaning all the data fetching (`await dashboardService.getDashboardData()`) happens on the server. The client receives fully rendered HTML, eliminating layout shift.
- **Client Components**: Only highly interactive components (like `TopNavbar` for the search state and `QuickActions` for Framer Motion) are marked with `"use client"`.
