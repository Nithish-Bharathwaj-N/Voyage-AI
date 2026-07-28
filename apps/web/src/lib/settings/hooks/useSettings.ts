import { useQuery } from '@tanstack/react-query';
import { settingsRepository } from '../repository/SettingsRepository';
import { settingsKeys } from '../queries/settingsKeys';
import type { UnifiedSettings } from '../types/settings.types';

export function useSettings() {
  return useQuery<UnifiedSettings>({
    queryKey: settingsKeys.detail(),
    queryFn: () => settingsRepository.getSettings(),
  });
}
