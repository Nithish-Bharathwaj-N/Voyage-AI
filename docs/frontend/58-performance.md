# 58. Performance

Because the Planner will eventually handle drag-and-drop, it is critical that we avoid re-rendering the entire itinerary when one activity is moved.
By isolating the data into `TimelineDay` and `TimelineSection` components, we set the stage for `React.memo` and localized state updates, ensuring smooth 60fps dragging in Sprint 5D.
