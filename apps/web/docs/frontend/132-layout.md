# 132 - Layout

## Grid System
- **TripDetailsLayout**: A responsive shell managing the Hero banner and the two-column grid.
- **Desktop**: 
  - Left column: Main content (Tabs + Overview).
  - Right column: Sticky `QuickActionsPanel`.
- **Mobile**:
  - The sticky sidebar drops below the main content.
  - The tabs stick to the top under the header for easy access.

## Transitions
Framer Motion is used in the layout to provide a gentle upward fade when the main content mounts, softening the transition from the workspace.
