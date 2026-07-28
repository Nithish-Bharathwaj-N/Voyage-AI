# 131 - Trip Details Architecture

## Overview
The Trip Details Hub (`/trips/[tripId]`) is the primary command center for a single trip. It transitions away from the global grid view into a detailed, focused dashboard for an individual `WorkspaceTrip`.

## State & Data Layer
- **TanStack Query**: Uses a dedicated hook `useTrip(id)` caching on the key `tripKeys.detail(id)`.
- **Repository Driven**: It reads directly from `tripRepository.getTrip(id)`. No component owns the trip data. The data flows down from the Next.js `page.tsx` into the layout and cards.
- **Dumb Components**: All cards (`TripSummaryCard`, `WeatherCard`, etc.) take `trip: WorkspaceTrip` as a prop. They do not fetch data themselves.
