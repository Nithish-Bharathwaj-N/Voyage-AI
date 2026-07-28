# 150 - Best Practices

- **Graceful Degradation**: Every section component (`Gallery`, `HotelsList`, `TransportationCard`, etc.) explicitly checks if its required data exists and returns `null` if missing, allowing the page to cleanly render even with sparse destination data.
- **Anchor Scrolling**: `activeTab` states are currently managed locally in React with `scrollIntoView()`. In a future iteration, an `IntersectionObserver` should be implemented to update the active tab dynamically as the user scrolls.
