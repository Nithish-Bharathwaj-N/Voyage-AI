# 64. Context Menu

The `PlannerContextMenu` is a custom floating UI component triggered via `onContextMenu` or by clicking the three-dot icon.
It reads its `x,y` coordinates from the interaction provider and renders using `fixed z-[100]`.
Currently, it implements mock actions for Duplicate, Move, Edit Note, and Delete.
