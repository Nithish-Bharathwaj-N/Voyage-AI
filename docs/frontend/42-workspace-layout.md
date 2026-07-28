# 42. Workspace Layout

The route `/app/planner` intercepts the standard `AppLayout` but replaces its internal `sidebar` and `navbar` with specialized components (`PlannerSidebar`, `PlannerToolbar`). 
We also apply the `noPadding` prop to `AppLayout` so the Planner Canvas can utilize 100% of the viewport width and height without standard dashboard padding breaking the immersive map integration.
