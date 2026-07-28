# 15. Motion & Interaction

Framer Motion is used heavily across the marketing site, but always with restraint.

- **Initial Load**: The Hero section uses a staged reveal (`opacity`, `y`) to draw the eye downward.
- **Scroll Tracking**: `whileInView` is used on almost every section (`viewport={{ once: true, margin: "-100px" }}`) to ensure the animations don't fire until the user has scrolled the section into the viewport.
- **Micro-interactions**: Hover states on the `TrustedTechnologies` badges transition smoothly from 60% opacity grayscale to 100% color.
