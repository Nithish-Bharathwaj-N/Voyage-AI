# Discovery Engine (92)

This document details the mechanics of the discovery recommendation rows (Trending, Hidden Gems, Weekend Escapes) and the responsive carousel layouts.

## Sections Mapping
- **Trending Right Now**: Sorts destinations based on popularity metrics (represented by reviews count).
- **Hidden Gems**: Filters locations with specific tags (`isHiddenGem: true`) and highlights locations that are less crowded.
- **Weekend Escapes**: Highlights short-stay locations where `durationWeeks` is low (e.g. 1 week).
- **Popular this Month**: Aggregates high-rating locations globally.

## Carousel Implementation
Carousels utilize standard CSS snap scroll snapping snap snapping layouts (`snap-x snap-mandatory`) for performance on mobile, backed by Framer Motion drag animations on touch devices. Left/right buttons are displayed on desktop hover events to scroll programmatically.
