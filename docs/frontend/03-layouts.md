# 03. Layouts

VoyageAI V2 abandons single-page-app monolithic wrappers in favor of distinct layout shells.

## Supported Shells
1. **AppLayout**: The standard shell with a left Sidebar and a Top Header.
2. **WorkspaceLayout**: A 3-column specialized shell (Sidebar -> Map Canvas -> Copilot Panel) strictly for the Planner.
3. **MarketingLayout**: Blank shell for public-facing routes.

All layouts utilize CSS Grid and Flexbox with strict `h-screen overflow-hidden` directives to control internal scrolling via localized containers.
