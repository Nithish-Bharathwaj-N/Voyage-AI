# 206 - Follow-Up Engine

The `FollowUpGenerator` maps the parsed `AssistantCommand` to logical next steps, increasing engagement.
For example, if the user updates a budget, the generator yields:
- `Find cheaper hotels`
- `Optimize transportation costs`

These are rendered as clickable chips in the `AssistantBubble`.
