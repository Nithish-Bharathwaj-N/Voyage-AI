# 06. Workspace Framework

The UI is built around "Workspaces", avoiding standard page transitions when deep inside a task.

## The Planner Workspace
When a user visits `/planner/123`, they enter a Workspace.
A Workspace has fixed boundaries:
- **Map Canvas**: An absolute-positioned Mapbox instance that sits behind everything.
- **Left Panel**: Tools (Search, Discover, Budget).
- **Right Panel**: The active Trip Timeline.

These panels are managed by a `WorkspaceContext` and `Zustand`. When you select a "Restaurant" in the Left Panel, the Right Panel reacts and opens an "Add to Day" drop-zone. No routing changes occur.
