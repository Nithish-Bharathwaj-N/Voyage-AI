# 01. Domain Context Audit

*Auditor: Chief Software Architect*
*Objective: Assess the Bounded Contexts defined in Phase 2 for cohesion, coupling, and scalability limitations.*

## 1. Authentication & Identity
- **Assessment:** Well isolated. Ownership clearly belongs to the Platform team.
- **Risk:** Lacks explicit modeling for "Session Management" beyond JWTs. If a user is logged in across Mobile and Web, we need session revocation.
- **Recommendation:** Add a `UserSession` concept to this context to support multi-device syncing and remote logout.

## 2. Knowledge Graph Context
- **Assessment:** High cohesion. By isolating external data gathering from the Planner, the Planner is protected from rate limits.
- **Risk:** High coupling risk with the *External Travel Services Context*. If the graph relies synchronously on external APIs (like Google Places) to build nodes, it will become a bottleneck.
- **Recommendation:** The Knowledge Graph must be **eventually consistent**. External Services should fetch data in the background and publish an event (`PlaceDataUpdated`) which the Knowledge Graph consumes to update its internal Postgres nodes.

## 3. Planner Workspace Context
- **Assessment:** Central hub of the application. 
- **Risk:** High risk of God-object anti-pattern if the Planner tries to manage the AI Conversation, the Map, and the Trip Draft simultaneously. 
- **Recommendation:** Planner must remain strictly a *mediator*. It should read from the Knowledge Graph, write to the Trips Context, and orchestrate the AI. It should NOT persist data on its own (use Redis for transient states).

## 4. Trips Context
- **Assessment:** Good transactional boundary.
- **Risk:** Real-time collaboration (Future Expansion) will break standard REST architectures. If two users edit a `TimeSlot` concurrently, last-write-wins will cause data loss.
- **Recommendation:** The backend must be designed to accept delta updates (Operations) rather than full object replacements to future-proof for CRDTs.

## 5. AI Orchestration Context
- **Assessment:** Excellent isolation.
- **Risk:** LLM latency. Waiting for a massive itinerary JSON string to complete generation will cause terrible UX.
- **Recommendation:** The AI context MUST support streaming (Server-Sent Events) down to the Planner context. The Planner context must yield partial UI updates while the stream is resolving.

## 6. External Travel Services
- **Assessment:** Standard Anti-Corruption Layer.
- **Risk:** Third-party APIs go down or change schemas.
- **Recommendation:** Implement circuit breakers (e.g., using Polly or a NestJS equivalent) around every external call to prevent cascading failures into the Knowledge Graph.

## 7. Analytics & Notifications
- **Assessment:** Clear responsibilities.
- **Risk:** Synchronous event publishing.
- **Recommendation:** All Domain Events must be dispatched asynchronously to an event bus (BullMQ/Kafka). The core request loop must never wait for an analytics event to save.
