# Search Performance Optimizations (106)

Details debouncing configurations, list optimizations, and layout transitions.

## Key Optimizations
- **Input Debounce**: Search matches wait for a 250ms quiet window before calling repository methods, avoiding redundant component rendering.
- **Scroll Recalculations**: Uses standard CSS scroll alignments with scroll snap tags instead of heavy dynamic absolute position calculations.
- **Backdrop Caching**: Layout overlays are mounted dynamically inside `<AnimatePresence>` to free up memory when search panel is inactive.
