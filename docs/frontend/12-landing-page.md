# 12. Landing Page Strategy

The Landing Page (`page.tsx`) acts as the ultimate orchestrator. It contains zero local UI logic. Instead, it sequentially imports and mounts the 10 distinct marketing sections.

This enforces modularity: if the marketing team wants to run an A/B test on the `Pricing` section, they simply swap out `<Pricing />` for `<PricingB />` in the orchestrator without touching the core files.
