# 11. Marketing Architecture

The marketing site lives entirely within the `(marketing)` route group. 
This ensures that the marketing layouts (which contain massive footers and sticky navbars) do not leak into the `(app)` route group where the strict `h-screen overflow-hidden` layouts exist.

## Component Reusability
All primitive components (`Button`, `Card`, `Badge`) are imported directly from `src/components/ui`. We DO NOT duplicate these components for marketing. Marketing-specific spacing and animations are applied via wrapper components located in `src/components/marketing/`.
