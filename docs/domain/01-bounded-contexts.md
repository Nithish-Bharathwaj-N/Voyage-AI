# 01. Bounded Contexts

VoyageAI is a highly modular platform composed of distinct functional boundaries (Bounded Contexts) that communicate via explicit contracts.

## 1. Authentication & Identity Context
- **Purpose:** Manages user identity, registration, sessions, and security constraints.
- **Responsibilities:** JWT issuance, OAuth integration (Google/Apple), Role-based access (User vs. Admin).
- **Dependencies:** None.
- **Ownership:** Core Platform Team.
- **Future Scalability:** Seamless integration with multi-user collaboration and enterprise SSO.

## 2. Knowledge Graph Context
- **Purpose:** Acts as the Single Source of Truth for all travel-related geographic, cultural, and logistical data.
- **Responsibilities:** Ingestion and normalization of data from Kaggle, OSM, and Google. Exposes a semantic graph querying layer.
- **Dependencies:** External Travel Services Context (for real-time data sync).
- **Ownership:** Knowledge Engineering Team.
- **Future Scalability:** Capable of growing into a standalone travel API product or feeding specialized recommendation agents.

## 3. Planner Workspace Context
- **Purpose:** The central user experience where natural language intents are translated into structured queries and mapped out.
- **Responsibilities:** Maintaining the transient state of a trip build (dates, vibe, travelers), coordinating the AI Conversation, and updating the Map layout.
- **Dependencies:** Trips Context, AI Orchestration Context, Knowledge Graph Context.
- **Ownership:** Product Engineering Team.
- **Future Scalability:** Adaptable for voice interfaces and multi-device synced sessions.

## 4. Trips Context
- **Purpose:** The persistent storage and lifecycle management of user-generated travel plans.
- **Responsibilities:** Persisting DayPlans, Activities, and Reservations. Handles sharing and privacy toggles.
- **Dependencies:** Authentication Context.
- **Ownership:** Core Platform Team.
- **Future Scalability:** Extensible for real-time multiplayer editing (CRDTs) and collaborative trip building.

## 5. AI Orchestration Context
- **Purpose:** Isolates Large Language Models (LLMs) from core business logic.
- **Responsibilities:** Reasoning over Knowledge Graph data, formatting structured JSON outputs, intent extraction, and fallback handling.
- **Dependencies:** Knowledge Graph Context.
- **Ownership:** AI Engineering Team.
- **Future Scalability:** Pluggable backend to swap Gemini out for OpenAI or localized agents without affecting the UI.

## 6. External Travel Services Context
- **Purpose:** Anti-corruption layer bridging 3rd party volatility (Weather APIs, Currency APIs, Flight tracking).
- **Responsibilities:** Fetching, caching, and mapping external schemas into the VoyageAI standard format.
- **Dependencies:** None.
- **Ownership:** Integration Team.
- **Future Scalability:** Can accommodate direct booking APIs, Uber integrations, and live transit trackers.

## 7. Analytics & Notifications Context
- **Purpose:** Tracking user behavior and platform health while dispatching critical asynchronous alerts.
- **Responsibilities:** Pushing seasonal recommendations, budget alerts, and tracking popular search trends.
- **Dependencies:** Trips Context, Auth Context.
- **Ownership:** Growth & Ops Team.
- **Future Scalability:** Essential for monetizing travel insights or launching targeted travel campaigns.
