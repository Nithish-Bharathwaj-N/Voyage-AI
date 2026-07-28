# 54. Card System

All cards extend a `BaseCard` component.
`BaseCard` handles the structural CSS: the outer border, the background card color, the focus rings, the hover transitions, the generic title/time layout, and the dynamic left-edge color strip (`iconColorClass`).
Specialized cards (`FlightCard`) pass children into `BaseCard` to render their unique fields (like `terminal` and `airline`).
