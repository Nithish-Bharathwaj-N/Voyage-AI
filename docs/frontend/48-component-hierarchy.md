# 48. Component Hierarchy

- `PlannerPage`
  - `AppLayout`
    - `PlannerSidebar`
    - `PlannerToolbar`
    - `PlannerShell`
      - `PlannerCanvas` (Left flex-1)
      - Map/Context Column (Right flex shrink-0)
        - `PlannerMapPanel`
        - `PlannerContextPanel`
      - `PlannerStatusBar`
