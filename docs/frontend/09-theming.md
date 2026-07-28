# 09. Theming

By executive mandate, VoyageAI V2 is currently a **Light Theme Only** platform.

## Configuration
- `next-themes` is NOT installed to avoid hydration mismatch flashes.
- CSS Variables in `globals.css` are hardcoded to the Light theme colors.
- Dark mode media queries (`dark:bg-slate-900`) should NOT be authored in components to save bundle size.
