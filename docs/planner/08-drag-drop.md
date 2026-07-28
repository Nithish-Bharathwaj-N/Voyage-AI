# 08. Drag & Drop

We utilize `@hello-pangea/dnd` (a maintained fork of react-beautiful-dnd) to power the timeline.

## Rules
- **Droppables**: Each `DayBlock` in the Timeline is a `<Droppable>`.
- **Draggables**: Each `ActivityCard` is a `<Draggable>`.
- **DragEnd Event**: When a card is dropped, the `onDragEnd` handler computes the new `orderIndex` and dispatch a `moveActivity` action to `usePlannerStore`.
- **Cross-Day Dragging**: Supported out of the box. Dragging from "Day 1" to "Day 2" updates the Activity's `dayPlanId` instantly in the local state.
