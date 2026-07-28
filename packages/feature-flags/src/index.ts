export interface FeatureFlagProvider {
  isEnabled(flag: string, context?: Record<string, any>): boolean;
}

// Default memory implementation for Phase 1 MVP
export class MemoryFeatureFlagProvider implements FeatureFlagProvider {
  private flags: Record<string, boolean> = {
    'ENABLE_AI_STREAMING': true,
    'ENABLE_REALTIME_COLLABORATION': false,
    'ENABLE_OFFLINE_MODE': false,
    'USE_MOCK_DATA': process.env.NODE_ENV === 'test',
  };

  isEnabled(flag: string): boolean {
    return this.flags[flag] ?? false;
  }
}
