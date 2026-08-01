# ✈️ VoyageAI — Travel Intelligence Platform V2

[![Turborepo](https://img.shields.io/badge/Turborepo-v2.0.4-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build/)
[![Next.js](https://img.shields.io/badge/Next.js-v14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-Backend-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**VoyageAI** is an advanced, AI-powered travel intelligence platform designed to generate personalized travel itineraries, discover curated destinations, optimize budgets, and streamline end-to-end trip planning. Built with a modern Turborepo monorepo architecture leveraging Next.js, NestJS, Prisma, and Redis.

---

## ✨ Key Features

- 🤖 **AI-Powered Itinerary Generation**: Dynamic itinerary recommendation engine tailoring daily schedules based on user preferences, budget, and travel style.
- 🗺️ **Destination Discovery & Exploration**: Interactive map and destination discovery suite with real-time recommendations.
- ⚡ **Real-Time Queues & Tasks**: Powered by Redis & BullMQ for asynchronous background processing and recommendation engine workflows.
- 🔒 **Secure Authentication & RBAC**: Integrated Supabase Auth & JWT authentication with fine-grained access control.
- 📦 **Monorepo Architecture**: High-performance Turborepo structure separating `@apps/web` (Next.js frontend) and `@apps/api` (NestJS backend API).

---

## 🏗️ Architecture & Project Structure

```text
voyage-ai/
├── apps/
│   ├── api/                 # NestJS Backend REST API & Services
│   └── web/                 # Next.js Frontend Application (App Router)
├── packages/
│   ├── config/              # Shared ESLint, Prettier & TypeScript configs
│   ├── db/                  # Prisma Schema & Database Models
│   └── ui/                  # Shared React UI Component Library
├── docs/                    # Architectural & API Documentation
├── scripts/                 # Utility Scripts & Load Testing Tools
├── docker-compose.prod.yml  # Production Containerization Config
├── turbo.json               # Turborepo Build System Configuration
└── pnpm-workspace.yaml      # Monorepo Package Workspace Config
```

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS, TypeScript, Supabase Client
- **Backend API**: NestJS, Node.js (>=20.0.0), Express, Prisma ORM
- **Database & Cache**: PostgreSQL, Redis (BullMQ queues), Supabase
- **Monorepo Build Tools**: Turborepo, pnpm workspaces, tsx, ESLint, Prettier

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `^20.0.0` or higher
- **Package Manager**: `pnpm@^9.5.0`
- **Database**: PostgreSQL instance & Redis server

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Nithish-Bharathwaj-N/Voyage-AI.git
   cd Voyage-AI
   ```

2. **Install Dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in your database and API credentials:
   ```bash
   cp .env.example .env
   ```

   ```ini
   # DATABASE
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/voyageai"

   # SUPABASE
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_JWT_SECRET="your-jwt-secret"

   # REDIS (BullMQ)
   REDIS_URL="redis://localhost:6379"

   # API URL
   NEXT_PUBLIC_API_URL="http://localhost:4000/api/v1"
   ```

4. **Run Database Migrations**:
   ```bash
   pnpm --filter @packages/db db:push
   ```

5. **Start Development Servers**:
   ```bash
   pnpm dev
   ```
   - **Frontend**: Runs on `http://localhost:3000`
   - **Backend API**: Runs on `http://localhost:4000`

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts all monorepo applications in development mode via Turbo. |
| `pnpm build` | Builds production artifacts for web and API applications. |
| `pnpm lint` | Runs ESLint across all apps and packages. |
| `pnpm format` | Formats code with Prettier. |
| `pnpm clean` | Cleans build caches and `node_modules`. |

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
