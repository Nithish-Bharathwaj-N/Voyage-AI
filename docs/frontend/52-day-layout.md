# 52. Day Layout

The `DaySection` component represents 24 hours of travel. It utilizes a `sticky top-0 z-20` header to ensure the current day's context is always visible while scrolling down a long list of activities.
The internal content of the day is wrapped in a Framer Motion `AnimatePresence` block, allowing the entire day's visual tree to collapse with a smooth easing transition when the user wishes to condense their view.
