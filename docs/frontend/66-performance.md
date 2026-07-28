# 66. Performance

By placing transient states in the React Context rather than standard local state, we must be careful of re-renders. 
To mitigate this, `BaseCard` components only re-render if their `id` matches an inclusion check against `selectedIds`.
The `DragOverlay` is completely decoupled from the list, meaning rendering a drag frame does not force a re-render of the entire timeline.
