# 53. Activity Renderer

`ActivityCardRenderer` implements the Factory Pattern.
Instead of `PlannerCanvas` containing a massive switch statement, it maps over activities and delegates rendering to this factory.
The factory inspects `activity.type` (e.g., 'flight', 'hotel') and returns the heavily specialized presentation card. If the type is unrecognized, it falls back gracefully to a generic `<ActivityCard />`.
