# 195 - Streaming Architecture for JSON

Because `MockProvider` streams chunks sequentially, parsing incomplete JSON is complex.
For Sprint 11B, the `PlannerMapper.parsePartialStream` attempts to parse the accumulated string. If it fails, it returns `null` and the UI waits. When valid, it updates the React state progressively.
