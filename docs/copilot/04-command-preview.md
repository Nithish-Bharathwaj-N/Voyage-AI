# 04. Command Preview

When the AI emits a command, it is staged inside `useCopilotStore.pendingCommands`.

## The Visual Diff
The `CommandPreview` component parses the command array and generates human-readable impact cards.
- **AddActivity**: Displays a green card showing the Place Name, Time, and a mini-map highlighting the location.
- **RemoveActivity**: Displays a red strikethrough over the existing planner item.
- **UpdateBudget**: Displays a slider showing `Current -> Proposed`.

## Map Synchronization
When a `CommandPreview` is hovered in the Copilot panel, a temporary marker appears on the central Map canvas. The marker flashes to draw attention to the proposed change.
