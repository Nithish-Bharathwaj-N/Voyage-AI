# 04. AI Architecture Review

*Auditor: Chief Software Architect*
*Objective: Ensure strict enforcement of the "AI never owns data" philosophy and validate the Orchestration loop.*

## 1. Data Ownership & Trust
- **Policy Validation:** The model dictates that AI consumes Graph JSON and outputs JSON. This prevents hallucinated locations.
- **Risk:** What happens if the AI modifies the ID of a Place in its output due to a token hallucination?
- **Enforcement Mechanism Needed:** The `Validator` step must not only check schema (via Zod) but also perform **Referential Integrity Checks**. If the AI suggests `placeId: "abc"`, the Validator must confirm `"abc"` was actually in the input context. If not, reject and auto-retry or fallback.

## 2. Planner Architecture & Latency
- **The Orchestration Loop:** User Prompt -> Intent Extraction -> Graph Query -> Synthesis -> Validator -> UI.
- **Bottleneck:** This is a 5-step synchronous chain. Intent Extraction (LLM call 1) + Synthesis (LLM call 2) means the user waits for two full round-trips to Gemini.
- **Optimization Strategy (Pipeline Parallelism):** 
  - Intent Extraction must be done using the fastest, smallest model available (e.g., Gemini 1.5 Flash). 
  - The Synthesis step requires the heavy reasoning model (Gemini 1.5 Pro).
  - The UI MUST display optimistic loading states during Intent Extraction ("Searching for vegan places in Kyoto...").

## 3. The "Memory" Problem
- **Risk:** If a user builds a 14-day trip, the `TripDraft` JSON becomes massive. Feeding the entire 14-day itinerary into the AI prompt for every tiny edit (e.g., "Change lunch on day 2") will exceed token limits and cause extreme latency.
- **Mitigation Strategy:** **Targeted Reasoning**. 
  - The Intent Extractor must identify *what* is being modified. 
  - The system then only feeds the AI the relevant slice of the trip (e.g., just Day 2).
  - The backend then merges the AI's partial response back into the master `TripDraft`.

## 4. Future AI Agents
- The architecture correctly isolates AI Orchestration from the UI, meaning we can trigger Planner Actions programmatically. This fully supports autonomous agents (e.g., a chron-job agent that auto-revises a trip if a flight is delayed) without architectural changes.
