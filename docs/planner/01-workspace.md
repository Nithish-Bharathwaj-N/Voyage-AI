# 01. Planner Workspace

The Planner Workspace is the core interface of VoyageAI. It replaces traditional dashboard views with an interactive, dense "Operating System" style layout.

## Constraints
- **Full Viewport**: The layout takes exactly `100vh` and `100vw`. The `<body>` never scrolls.
- **Z-Index Strategy**:
  - `z-0`: Mapbox Canvas (Background).
  - `z-10`: Overlay Panels (Left Sidebar, Right Timeline).
  - `z-50`: Modals, Dialogs, Command Palette.
