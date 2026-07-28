# 141 - Destination Architecture

## Overview
The Destination Details page (`/destinations/[destinationId]`) is a universal, highly-optimized destination hub designed to be consumed by Explore, Trips, Planner, Collections, Search, and future AI features. It operates identically regardless of how the user arrives there.

## Data Flow
- **DestinationRepository**: The single source of truth for destination data. In Sprint 8B, it is mocked via `DestinationMock`. In Phase 3, this will hit a dedicated `/api/v1/destinations/:id` endpoint.
- **TanStack Query**: `useDestination(id)` handles fetching and caching. A high `staleTime` of 1 hour is used because destination data (descriptions, typical weather, overall safety) rarely changes mid-session.
- **Dumb Components**: Sections like `AttractionsList` and `OverviewCard` take the `DetailedDestination` object as a prop. They manage no local fetching state.
