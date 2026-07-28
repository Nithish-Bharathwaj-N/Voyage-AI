# 07. Recommendations (Rule-Based)

Because this phase prohibits AI, recommendations must be deterministic.

## Flow
1. User clicks "Find Hotels".
2. Frontend queries `/api/v1/places?destinationId=XYZ&type=HOTEL&budget=LUXURY`.
3. The `KnowledgeEngine` returns places directly from the PostgreSQL Database.
4. Places are rendered in the Left Panel as draggable cards.
