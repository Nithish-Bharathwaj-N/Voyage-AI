# Explore Best Practices (100)

Guidelines and constraints for maintaining and expanding the travel discovery features.

## Developer Rules
- **No Direct Fetching**: Component files must never fetch data via fetch/Axios. Use the `exploreService` abstraction.
- **Support Fallbacks**: UI grids must always specify `<ExploreLoading>` and `<ExploreEmptyState>` components to avoid raw layout shifts.
- **Consistent Layout Variants**: When creating new cards, add configurations as variants in `DestinationCardProps` rather than building separate components.
- **Framer Motion spring values**: Keep animations fluid by avoiding custom duration variables for spring transitions (rely on damping/stiffness values).
