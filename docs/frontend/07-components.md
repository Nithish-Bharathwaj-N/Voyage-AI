# 07. Component Library

We build upon `shadcn/ui` to create high-level domain components.

## Foundation
- **Primitives**: `Button`, `Dialog`, `Popover` (from shadcn/ui, stored in `src/components/ui/`).
- **Domain Components**: `DestinationCard`, `TimelineItem` (stored in `src/components/domain/`).

## Rules
- Components must be "dumb" by default. A `TimelineItem` should take `activity` as a prop and fire `onDelete`. It should NOT call `useDeleteActivityMutation` internally unless it is specifically designed as a "Connected" component.
- All components must support dark mode seamlessly.
