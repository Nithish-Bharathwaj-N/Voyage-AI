# 166 - Performance Optimizations

- **Framer Motion Layout ID**: The `ProfileTabs` component uses Framer Motion's `layoutId` prop to seamlessly animate the active tab indicator line between clicks without expensive DOM repaints.
- **Custom Skeleton**: `ProfileSkeleton` perfectly mimics the complex hero/avatar overlap to ensure zero Cumulative Layout Shift (CLS).
