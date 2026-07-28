# Card System Specification (93)

This document details the configuration properties, variant types, and layout options for `DestinationCard.tsx`.

## Layout Variants
- `standard`: The default grid card layout with top ratings and bookmark action overlays.
- `featured`: Card containing extra metadata rows (Best Season and Planning Complete percentage).
- `compact`: A small row-card layout with local images and rating badges, optimized for sidebar guides.
- `horizontal`: Row format layout, optimized for listings and list view search page outputs.
- `hero`: Full visual container block with custom "Plan Itinerary" and "Quick View" action buttons.

## Action Triggers
- **Wishlist Toggle**: Heart button toggles value in local storage, triggering layout spring animations.
- **Preview Callback**: Emits `onPreview` to open the quick details sheet.
- **Planner Callback**: Emits `onPlan` to load custom templates into the active workspace.
