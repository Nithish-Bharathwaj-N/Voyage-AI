# 10. Future Collaboration

The Copilot is currently a 1:1 assistant. In the future, VoyageAI will support multiplayer collaboration (CRDTs).

## Architecture Implications
- `pendingCommands` will be broadcast via WebSockets.
- If User A asks the AI for a hotel, User B will see the `AWAITING_APPROVAL` dialog on their screen as well.
- The approval flow will support "Voting" (e.g., 2 out of 3 users must approve the AI's budget change).
