# 50. Planner Shell Best Practices

1. **Strict Separation of Concerns**: Layout files (`PlannerShell`) must NEVER contain state logic or data fetching.
2. **Absolute Positioning over Margins**: For layout alignment in the Canvas (like the timeline ruler), we use absolute positioning `absolute left-[19px] top-4 bottom-4` rather than negative margins, ensuring the Flexbox flow is unperturbed.
