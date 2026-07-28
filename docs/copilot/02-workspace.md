# 02. Workspace Layout

The VoyageAI Planner Workspace uses a 3-column architecture, similar to professional tools like Linear or Arc Browser.

## Column 1: Left Sidebar
- **State**: Global User Context (Trips, History, Settings).
- **Width**: Collapsible (250px).

## Column 2: Center Canvas (The Planner)
- **State**: The source of truth (`usePlannerStore`).
- **Width**: Flexible (flex-grow).
- **Content**: The highly interactive Drag & Drop timeline, interactive Mapbox map, Day Cards, Budget Panel.

## Column 3: Right Sidebar (The Copilot)
- **State**: Ephemeral conversation and command staging (`useCopilotStore`).
- **Width**: 350px fixed.
- **Content**: Chat interface, Streaming reasoning cards, Command Preview overlays.

*This clean separation ensures the AI is an assistant viewing the canvas, not the canvas itself.*
