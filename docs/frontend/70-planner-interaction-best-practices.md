# 70. Interaction Best Practices

1. **Transient vs Permanent State**: Never put "is hovered" or "is dragging" states in the backend store. Those belong in React State / Context.
2. **Prevent Propagation**: Always call `e.stopPropagation()` when handling selections or context clicks on nested cards, otherwise the canvas click-away handlers will immediately clear the state.
