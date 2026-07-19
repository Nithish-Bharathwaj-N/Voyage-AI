# Setup Guide — VoyageAI Backend

This document contains step-by-step instructions to initialize, configure, launch, and verify VoyageAI's backend application.

---

## 1. Prerequisites

Ensure you have the following software installed:
- **Node.js** (v20.x or higher)
- **pnpm** (v8.x or higher)
- **Docker** and **Docker Compose**
- **Supabase** (account & configured project instance)

---

## 2. Initial Setup

### 2.1. Copy Environment Configuration
Locate the `.env.example` file and create your local runtime `.env` file (ensure this file is ignored in Git control checks):
```bash
cp .env.example .env
```

Open `.env` and configure:
1. `DATABASE_URL`: Local Postgres connection string.
2. `SUPABASE_URL` and keys: Set credentials retrieved from your Supabase Project Settings page.
3. `REDIS_URL`: Connection string for Redis.

---

## 3. Infrastructure & Database Bootstrap

### 3.1. Launch Docker Compose Stack
Launch the development Postgres and Redis containers:
```bash
docker-compose up -d
```
Verify containers are running:
```bash
docker ps
```

### 3.2. Initialize Prisma Client & Deploy Migrations
Generate local TypeScript typings and sync schema models with the database:
```bash
pnpm run prisma:generate
pnpm run prisma:migrate:dev --name init
```

---

## 4. Run & Test the Application

### 4.1. Launching NestJS Server
Start the development server with live reload enabled:
```bash
pnpm run start:dev
```
The server will start at: `http://localhost:3000`.

### 4.2. Verify Swagger Documentation
Open your browser and navigate to:
`http://localhost:3000/api/v1/docs`

---

## 5. Running the Test Suites

Execute the comprehensive test suites:
```bash
# Run unit and integration tests
pnpm run test

# Run E2E tests
pnpm run test:e2e
```
