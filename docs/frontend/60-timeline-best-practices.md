# 60. Timeline Best Practices

1. **Strict Mock Services**: The frontend MUST NOT attempt to shape the data directly inside the UI components. All complex data transformations should occur in `lib/services/timeline.ts` until the NestJS API is connected.
2. **Icon Consistency**: All activity cards must source their icons from the shared `src/components/icons/Icon.tsx` registry to maintain visual coherence with the rest of the application.
