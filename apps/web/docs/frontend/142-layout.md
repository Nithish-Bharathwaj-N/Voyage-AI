# 142 - Layout Structure

The `DestinationLayout` leverages a responsive CSS Grid:
1. **Hero Header**: Full bleed, edge-to-edge cover image with bottom-anchored content.
2. **Sticky Tabs**: `DestinationTabs` sits below the hero and sticks to the top of the viewport on scroll, providing constant navigation access.
3. **Two-Column Grid**: 
   - **Main Content**: (Span 8) Houses the Overview, Weather, Sections (Attractions, Hotels, etc.), and Gallery.
   - **Sticky Sidebar**: (Span 4) Houses `QuickActionsPanel`, `TransportationCard`, `PackingChecklist`, and `EmergencyInfo`. On mobile, this stacks below the main content.
