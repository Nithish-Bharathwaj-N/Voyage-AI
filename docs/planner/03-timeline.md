# 03. Timeline

The Timeline is the vertical column on the right side of the screen.

## Rules
- **Scroll Independent**: The timeline scrolls independently of the main window.
- **Day Blocks**: Activities are grouped by `DayPlan.id`. 
- **Time Computations**: Each activity has a `duration`. The timeline automatically computes the start/end times sequentially. If a user inserts a 2-hour museum visit at 9 AM, the subsequent lunch activity is automatically pushed to 11 AM.
