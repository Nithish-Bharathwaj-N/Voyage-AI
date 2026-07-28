# 171 - Settings Architecture

## Overview
The Settings hub (`/settings`) is the centralized configuration center for VoyageAI. It replaces scattered preference menus with a single source of truth for Account, Preferences, Appearance, Notifications, Privacy, Security, and Connected Accounts.

## Data Flow
The architecture uses the `SettingsRepository`.
- `useSettings()`: Fetches the `UnifiedSettings` object containing sub-objects for each specific domain (Account, Preferences, etc.).
- All settings data is fetched once at the `/settings` layout level and distributed as typed props to the specific Card components (e.g. `AppearanceCard`).
