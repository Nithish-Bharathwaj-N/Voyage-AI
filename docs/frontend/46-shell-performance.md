# 46. Shell Performance

Because this is a structural shell, virtually all components are rendered as Server Components. Only elements requiring client-side interactivity (`PlannerToolbar` for menus, `PlannerContextPanel` for tab switching) use `"use client"`. This ensures the massive structural HTML of the workspace is delivered instantly without hydration overhead.
