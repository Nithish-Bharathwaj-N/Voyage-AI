# 62. Drag and Drop System

We use `@dnd-kit/core` and `@dnd-kit/sortable`.
- `PlannerDndContext` wraps the canvas and configures the `Sensors` (Pointer, Keyboard) and `CollisionDetection`.
- We use a specific activation constraint (`distance: 8`) on the `PointerSensor` to ensure that clicking cards or scrolling on mobile doesn't instantly trigger a drag event.
- A customized `DragOverlay` provides a premium visual shadow of the item being moved.
