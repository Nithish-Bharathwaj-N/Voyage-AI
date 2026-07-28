# 135 - Navigation

## TripDetailsTabs
Maintains a local `activeTab` state in `page.tsx`.
Renders placeholders for unbuilt tabs (`Itinerary`, `Budget`, etc.).
Uses a `framer-motion` `layoutId` to animate the active tab indicator line smoothly.

## QuickActionsPanel
A vertical stack of actions like Edit, Share, Duplicate.
In Sprint 8A, these buttons are visual only and do not trigger mutations. They provide the UI architecture for Sprint 8B.
