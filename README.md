# VoyageAI 🌍✈️

![VoyageAI Banner](apps/frontend/public/images/hero-bg.png)

**VoyageAI** is a premium, AI-powered Travel Operating System that acts as your personal, highly intelligent travel consultant. It automatically transforms natural language requests into perfectly orchestrated, map-integrated itineraries with precise budgets, dynamic routes, and smart fallbacks.

## 🏗 Architecture & Tech Stack
This repository is a **PNPM Monorepo** containing both the Frontend and Backend applications.

- **Frontend (`apps/frontend`):** Next.js (App Router), Tailwind CSS, Framer Motion, Mapbox GL JS
- **Backend (`apps/backend`):** NestJS orchestrating Gemini & OpenAI APIs, Prisma ORM, Supabase Auth.

## 🚀 Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nithish-Bharathwaj-N/Voyage-AI.git
   cd Voyage-AI
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   You will need to set up environment variables for both the frontend and backend. 
   Refer to `.env.example` in the root, and copy the relevant sections to:
   - `apps/frontend/.env.local`
   - `apps/backend/.env`

4. **Run the Development Servers:**
   From the root of the monorepo, run:
   ```bash
   pnpm dev
   ```
   This will start both the NestJS backend (Port 3001) and Next.js frontend (Port 3000) concurrently.

## 📂 Folder Structure

```
Voyage-AI/
├── apps/
│   ├── frontend/      # Next.js Application
│   └── backend/       # NestJS API Server
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
