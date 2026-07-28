import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AiPreferences {
  provider: string;
  style: string;
  showThinking: boolean;
  autoSave: boolean;
}

interface NotificationPrefs {
  email: boolean;
  aiRecommendations: boolean;
  tripReminders: boolean;
  budgetAlerts: boolean;
  weeklyDigest: boolean;
}

interface UiStore {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  copilotOpen: boolean;
  setCopilotOpen: (open: boolean) => void;
  toggleCopilot: () => void;
  activeTripId: string | null;
  setActiveTripId: (id: string | null) => void;
  aiPreferences: AiPreferences;
  setAiPreferences: (prefs: Partial<AiPreferences>) => void;
  notificationPrefs: NotificationPrefs;
  setNotificationPrefs: (prefs: Partial<NotificationPrefs>) => void;
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      commandPaletteOpen: false,
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      copilotOpen: true,
      setCopilotOpen: (open) => set({ copilotOpen: open }),
      toggleCopilot: () => set((state) => ({ copilotOpen: !state.copilotOpen })),
      activeTripId: null,
      setActiveTripId: (id) => set({ activeTripId: id }),
      aiPreferences: {
        provider: 'auto',
        style: 'detailed',
        showThinking: true,
        autoSave: false,
      },
      setAiPreferences: (prefs) =>
        set((s) => ({ aiPreferences: { ...s.aiPreferences, ...prefs } })),
      notificationPrefs: {
        email: true,
        aiRecommendations: true,
        tripReminders: true,
        budgetAlerts: true,
        weeklyDigest: false,
      },
      setNotificationPrefs: (prefs) =>
        set((s) => ({ notificationPrefs: { ...s.notificationPrefs, ...prefs } })),
    }),
    { name: 'voyage-ui-store' }
  )
);
