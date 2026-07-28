# 32. Dashboard Layout

The `layout.tsx` for the `(app)` group implements the `AppLayout` shell designed in Sprint 1.

It forces `h-screen overflow-hidden` on the body, rendering the `Sidebar` on the left and the `TopNavbar` on top. The `main` content area (which contains the Dashboard) receives `flex-1 overflow-auto`, ensuring that only the content scrolls, exactly like a native OS application (Notion, Linear, Arc).
