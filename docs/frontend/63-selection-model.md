# 63. Selection Model

Selection is modeled as an array of strings (`selectedIds: string[]`).
This future-proofs the system for multi-selection (Shift/Cmd+Click), allowing users to bulk-delete or bulk-move activities.
When an activity is selected, the `BaseCard` component applies a primary border and focus ring (`ring-1 ring-primary border-primary`).
