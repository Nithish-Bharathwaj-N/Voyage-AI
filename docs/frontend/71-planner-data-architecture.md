# 71. Planner Data Architecture

All planner data flows through a strict 5-layer pipeline:
`Backend → Axios Client → PlannerRepository → TanStack Query → Selectors → Components`.

No component may call `apiClient` directly. This ensures every data access goes through the Repository's fallback mechanism, the Query's caching layer, and the Selector's memoization — resulting in zero redundant fetches and a single, testable data path.
