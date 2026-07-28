# 87. Responsive Audit

| Breakpoint | Status |
|---|---|
| Mobile (`< sm`) | Timeline: Full-width cards. Timeline connectors hidden. Map: Hidden (needs mobile overlay toggle — Sprint 5G). |
| Tablet (`sm-lg`) | Timeline: Full-width with connectors. Map: Hidden. |
| Desktop (`lg+`) | Timeline + Map side-by-side. Context panel below map. |
| Ultra-wide (`xl+`) | Map panel expands to 560px. Timeline stays max-width 3xl. |

**Known gap**: On mobile, the Map is completely inaccessible. Sprint 5G will add a floating "View Map" button that overlays the map fullscreen using a Framer Motion sheet animation.
