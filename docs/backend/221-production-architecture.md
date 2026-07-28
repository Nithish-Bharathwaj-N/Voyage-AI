# 221 - Production Architecture

## Overview
VoyageAI V2 is deployed using a containerized, multi-stage strategy.

## Components
- **API Server (`apps/api`)**: NestJS backend providing REST and WebSocket interfaces. Includes Global Exception Filters, Rate Limiting (Throttler), and Terminus Health checks.
- **Web Frontend (`apps/web`)**: Next.js React application optimized as a standalone build.
- **Database (`packages/db`)**: Prisma connecting to PostgreSQL.
- **Cache**: Redis instance for pub/sub (Socket.io adapter) and caching.

## Scaling
- API nodes scale horizontally.
- Socket.IO uses the Redis adapter to synchronize WebSocket states across instances.
