# 161 - User Profile Architecture

## Overview
The User Profile (`/profile`) serves as the central identity hub for VoyageAI users. It integrates data from Trips, Collections, and activity history into a unified premium dashboard.

## Data Flow
The architecture uses the `ProfileRepository` pattern.
Hooks available:
- `useProfile()`: Core user metadata (avatar, bio, verified status).
- `useProfileStats()`: Gamification and usage metrics.
- `useTravelPreferences()`: Saved user preferences (e.g., dietary, seating).
- `useActivityTimeline()`: Feed of user actions.

All data fetching happens at the top level in `page.tsx` and cascades down to pure presentational components.
