# 176 - Performance Optimizations

- **Single Query**: By bundling settings into `UnifiedSettings`, we only make one network request (`useSettings()`) instead of 5 separate ones.
- **Client-side Routing**: Clicking sidebar links does not change the URL or trigger Next.js navigations. It purely swaps out the active Card component in React state, providing instant switching with zero latency.
