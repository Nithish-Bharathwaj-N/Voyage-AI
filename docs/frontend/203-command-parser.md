# 203 - Command Parser

The `CommandParser` maps natural language to a rigid `AssistantCommand` enum.

In a fully realized setup, this relies on a lightweight LLM classifier or dense retrieval. For Sprint 11C (Mock phase), it uses rule-based keyword extraction.

Supported Intents:
- `ModifyDay`
- `AddActivity`
- `RemoveActivity`
- `ExtendTrip`
- `UpdateBudget`
- `OptimizePlan`
- `ExplainRecommendation`
