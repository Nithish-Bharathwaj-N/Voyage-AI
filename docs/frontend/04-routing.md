# 04. Routing Strategy

## App Router Hierarchy
```text
src/app/
 ├── (marketing)/
 │    ├── page.tsx (Landing)
 │    └── layout.tsx (MarketingLayout)
 ├── (app)/
 │    ├── dashboard/
 │    │    └── page.tsx
 │    ├── explore/
 │    │    └── [slug]/page.tsx
 │    ├── planner/
 │    │    ├── [tripId]/page.tsx (The Workspace)
 │    └── layout.tsx (DashboardLayout/WorkspaceLayout)
 └── api/
      └── (Next.js route handlers if needed for edge middleware)
```

## Route Grouping
We use `(folder)` syntax to apply layouts without affecting the URL structure.
