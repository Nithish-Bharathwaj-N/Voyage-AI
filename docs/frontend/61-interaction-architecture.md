# 61. Interaction Architecture

The Planner implements a unified interaction state layer via `PlannerInteractionProvider`.
This React Context serves as the source of truth for all transient UI states across the workspace, such as:
- Which activity is currently selected (`selectedIds`).
- Which activity is right-clicked for context menu (`contextMenu`).
- Which element is currently hovered (for showing drag handles).

By hoisting this state to the top of the `PlannerShell`, both the Map and the Timeline can eventually react to selections simultaneously.
