import * as React from 'react';

export interface UsePlannerStateResult {
  selectedDay: number;
  selectedActivityId: string | null;
  saving: boolean;
  chatMode: boolean;
  sidebarOpen: boolean;
  workspaceView: 'timeline' | 'map' | 'split';
  setSelectedDay: (day: number) => void;
  setSelectedActivityId: (id: string | null) => void;
  setSaving: (saving: boolean) => void;
  setChatMode: (chatMode: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setWorkspaceView: (view: 'timeline' | 'map' | 'split') => void;
  resetState: () => void;
}

/**
 * Hook managing active UI states, current highlighted days/activities, loading/saving indicators, and panel layout widths.
 */
export function usePlannerState(): UsePlannerStateResult {
  const [selectedDay, setSelectedDay] = React.useState<number>(0);
  const [selectedActivityId, setSelectedActivityId] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState<boolean>(false);
  const [chatMode, setChatMode] = React.useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(true);
  const [workspaceView, setWorkspaceView] = React.useState<'timeline' | 'map' | 'split'>('split');

  /**
   * Resets all UI states back to initial defaults.
   */
  const resetState = React.useCallback(() => {
    setSelectedDay(0);
    setSelectedActivityId(null);
    setSaving(false);
    setChatMode(false);
    setSidebarOpen(true);
    setWorkspaceView('split');
  }, []);

  return {
    selectedDay,
    selectedActivityId,
    saving,
    chatMode,
    sidebarOpen,
    workspaceView,
    setSelectedDay,
    setSelectedActivityId,
    setSaving,
    setChatMode,
    setSidebarOpen,
    setWorkspaceView,
    resetState
  };
}
