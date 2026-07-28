# 02. REST Standards

## Standard Envelope
Every successful response MUST be wrapped in a standard envelope:
```json
{
  "data": { ... },
  "meta": {
    "requestId": "uuid-1234",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

## Pagination Envelope
List endpoints MUST include cursor or offset metadata:
```json
{
  "data": [ ... ],
  "meta": {
    "requestId": "uuid-1234",
    "pagination": {
      "nextCursor": "xyz-987",
      "hasMore": true
    }
  }
}
```
