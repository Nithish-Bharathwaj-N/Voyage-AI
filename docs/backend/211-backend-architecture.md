# 211 - Backend Architecture

## Overview
The NestJS backend in `@voyageai/api` orchestrates the AI platform, pulling the `AIOrchestrator` and `ProviderFactory` out of the Next.js frontend into a scalable microservice pattern.

## Core Modules
- **AIModule**: Contains the Orchestrator, Planner Service, Assistant Service, and the dynamic Provider Factory.
- **PrismaModule**: Connects to PostgreSQL, managing `Conversations`, `Messages`, `TripVersions`, and observability.
- **AIGateway**: Socket.IO server implementing streaming token delivery and lifecycle events.

## Data Flow
1. Next.js (`apps/web`) triggers `AIGateway` (WebSocket) or `AIController` (REST).
2. The endpoint invokes `AIOrchestrator`.
3. `AIOrchestrator` selects `GeminiProvider` or falls back based on health.
4. Tokens are streamed back via `AIGateway`.
