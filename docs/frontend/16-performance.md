# 16. Performance

## Image Strategy
We strictly avoid heavy image assets where possible. The "Product Previews" in the Hero and Showcase sections are built using native HTML/CSS/Tailwind components rather than importing massive PNG screenshots. This ensures razor-sharp rendering on Retina displays and zero Cumulative Layout Shift (CLS).

## Dynamic Imports
Framer Motion is heavy. In a true production environment, we should consider dynamically importing `framer-motion` for sections below the fold if the bundle size exceeds budget.
