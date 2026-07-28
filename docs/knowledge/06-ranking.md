# 06. Ranking Engine

Every Search or Traversal result must be ranked before being returned.

## Scoring Formula
Each node is assigned a base score out of 100, modified by context.
`Final Score = (Popularity * 0.3) + (Rating * 0.3) + (Context Match * 0.4)`

## Context Modifiers
- **Distance**: Closer places gain a bonus.
- **Weather**: If it is raining, `OUTDOOR` activities receive a massive penalty multiplier (e.g. `x0.1`).
- **Time of Day**: If searching for dinner, places closing within 1 hour receive a penalty.

## Explanation Requirement
The Ranking Engine must attach an `explanation` array to the result, detailing exactly why a place was recommended (e.g. "Highly rated and close to your hotel").
