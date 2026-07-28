# 01. Frontend Architecture

## Philosophy
The VoyageAI frontend is built as a single-page Application (SPA) pretending to be a multi-page app via Next.js App Router. It is designed to feel like a desktop operating system (e.g., Linear, Arc).

## Core Principles
1. **Never block the UI**: Data fetching must happen in the background using `Suspense` and `TanStack Query`.
2. **Optimistic Updates**: If a user drags an activity to a new day, the UI updates instantly. The API request happens in the background.
3. **Strict State Boundaries**:
   - **Server State**: Owned by TanStack Query.
   - **Global UI State**: Owned by Zustand (e.g., "Is the sidebar open?", "Which map marker is hovered?").
   - **Form State**: Owned by React Hook Form.
   - **Local State**: `useState` (strictly for transient component states like dropdown toggles).
