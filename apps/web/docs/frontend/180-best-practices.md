# 180 - Best Practices

- **Strict Prop Typing**: Each settings card accepts exactly the slice of state it needs (e.g., `AppearanceCard` takes `settings: AppearanceSettings`, not the entire `UnifiedSettings` object). This enforces boundaries and simplifies testing.
- **Peer Styling**: Leveraging Tailwind's `peer` and `peer-checked` classes allows us to build complex, accessible custom UI components (like the Toggle switches and Budget radio buttons) without any JavaScript state management or extra libraries.
