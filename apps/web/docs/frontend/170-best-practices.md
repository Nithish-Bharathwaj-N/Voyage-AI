# 170 - Best Practices

- **Component Isolation**: The `ProfilePage` (`page.tsx`) handles all data fetching and orchestrates layout. Deep components like `OverviewCard` and `ActivityTimeline` take pure data props (`profile`, `events`) making them extremely easy to test in isolation or Storybook.
- **Dynamic Icons**: The `ActivityTimeline` expects string icon names from the backend but provides a fallback (`'Circle'`) using `@ts-expect-error` to prevent build failures if a missing icon is supplied.
