# 160 - Best Practices

- **Strict Type Checking**: Discriminated unions (`type: 'destination' | 'hotel'`) are enforced to ensure that the `SavedItemDispatcher` can't render a `DestinationItemCard` using a `SavedTrip` object.
- **Resilient UI**: Item cards are wrapped in `<Link>` components that correctly path to `/destinations/[id]` or `/trips/[id]`, creating a fully interconnected platform rather than dead-end UI.
