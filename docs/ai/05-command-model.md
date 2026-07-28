# 05. Command Model

The AI does not manipulate state. It yields strict Commands.

## Command Pipeline
The LLM outputs an array of commands via JSON Tool Calling/MCP.
```json
[
  { "type": "RemoveActivity", "payload": { "activityId": "123" } },
  { "type": "AddActivity", "payload": { "dayId": "day_1", "placeId": "456", "startTime": "14:00" } }
]
```

These commands are parsed by the `AI Orchestrator` and forwarded to the `Planner Engine` which actually mutates the database. If a command fails, the planner rejects it.
