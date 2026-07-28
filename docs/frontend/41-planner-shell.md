# 41. Planner Shell Architecture

The `PlannerShell` is a distinct layout orchestrator that completely replaces the typical dashboard scrolling behavior.
It enforces a 100vh, overflow-hidden shell and breaks the screen into 5 rigid areas: Sidebar, Toolbar, Canvas, Map, and Context Panel.
This prevents the entire page from scrolling and ensures only the Timeline Canvas scrolls, mimicking native desktop applications.
