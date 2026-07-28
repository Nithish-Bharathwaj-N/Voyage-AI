# 05. State Management

VoyageAI V2 strictly separates state based on ownership and lifespan.

## 1. Server State (TanStack Query)
- **Tool**: `@tanstack/react-query`
- **Ownership**: The Database owns this data. The UI just caches it.
- **Example**: `useTripQuery(id)`, `useDestinationQuery(slug)`.
- **Rule**: Never copy Server State into Zustand. Let Query handle caching, refetching, and stale times.

## 2. Global UI State (Zustand)
- **Tool**: `zustand`
- **Ownership**: The Client session owns this data.
- **Example**: `usePlannerStore`.
- **Purpose**: Tracks transient layout states across deeply nested components.
  - `activeMarkerId: string | null`
  - `isSidebarExpanded: boolean`
  - `selectedDayId: string`

## 3. Form State (React Hook Form + Zod)
- **Tool**: `react-hook-form` + `@hookform/resolvers/zod`
- **Ownership**: The user owns this data until submitted.
- **Purpose**: Draft edits, validation before submitting to the Server State via a Mutation.
