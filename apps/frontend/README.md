# VoyageAI 🌍✈️

![VoyageAI Banner](/public/images/hero-bg.png)

**VoyageAI** is a premium, AI-powered Travel Operating System that acts as your personal, highly intelligent travel consultant. It automatically transforms natural language requests into perfectly orchestrated, map-integrated itineraries with precise budgets, dynamic routes, and smart fallbacks.

## ✨ Features

- **Conversational Trip Builder:** Chat with the AI or use smart chips to dynamically set Destination, Budget, Travelers, and Vibe without restarting.
- **Intelligent Itinerary Generation:** Generates multi-day, componentized schedules spanning sightseeing, transit, hotels, and dining.
- **Robust Error Recovery:** Fully resilient architecture that gracefully recovers from AI hallucinations, missing coordinates, or incomplete pricing data.
- **Asset Normalization Layer:** Automatic, central resolution of landmark names into verified high-quality imagery via an internal catalog & Unsplash fallbacks.
- **Interactive Mapping:** Powered by Mapbox GL, featuring real-time itinerary coordinate plotting and synchronized hover states between map and sidebar.
- **Defensive UI Rendering:** Zero runtime crashes. State-of-the-art fallback logic ensures the application degrades elegantly instead of breaking.

## 🏗 Architecture & Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React Server Components)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Mapping:** [Mapbox GL JS](https://www.mapbox.com/)
- **State Management:** Custom React Context hooks (e.g., `usePlanner`, `useItinerary`)
- **Backend/AI (Separate Repo):** NestJS orchestrating Gemini & OpenAI APIs.

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
   Copy the example environment file and fill in your keys:
   ```bash
   cp .env.example .env.local
   ```
   *Note: Never commit your `.env.local` file.*

4. **Run the Development Server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Folder Structure

```
voyageai-frontend/
├── app/               # Next.js App Router (Pages, Layouts, Features)
│   ├── planner/       # Core AI Planner module & components
│   └── dashboard/     # User dashboard & saved trips
├── components/        # Reusable UI library (Cards, Modals, Maps)
├── data/              # Static catalogs & fallback destination info
├── hooks/             # Global React hooks
├── lib/               # Utilities (e.g., Image Resolver)
├── services/          # API & Orchestration layer
└── types/             # TypeScript definitions & schemas
```

## 🗺 Roadmap

- **Phase 1:** Core Conversational Itinerary Generation (Completed)
- **Phase 2:** Interactive Mapbox Integration (Completed)
- **Phase 3:** Data Normalization & Production Stabilization (Completed)
- **Phase 4:** User Authentication & Trip Saving (In Progress)
- **Phase 5:** Multi-user collaborative trip editing (Upcoming)

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
