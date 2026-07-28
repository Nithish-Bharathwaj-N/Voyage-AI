# 55. Timeline Motion

Motion is carefully applied to prevent overwhelming the user:
- `group-hover` is utilized extensively for revealing the drag handle (`GripVertical`) and context menu (`MoreVertical`) only when the user's cursor is actively over a specific card.
- Framer Motion handles the height calculation for expanding/collapsing days to prevent layout snapping.
