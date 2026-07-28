# 07. Responsive System

VoyageAI is a heavy web application, primarily optimized for desktop and tablet contexts. 

## Breakpoints
- `sm`: 640px
- `md`: 768px (Tablets - Sidebar collapses)
- `lg`: 1024px (Laptops)
- `xl`: 1280px (Desktops)
- `2xl`: 1536px (Ultrawide)

## Mobile Degradation
Rather than forcing the complex 3-column Planner onto a phone, the mobile view gracefully degrades. The Copilot is hidden behind a floating FAB, and the Timeline becomes a full-width vertical list.
