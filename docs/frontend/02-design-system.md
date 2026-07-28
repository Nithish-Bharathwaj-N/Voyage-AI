# 02. Design System

## Core Stack
- **Tailwind CSS**: Utility-first styling.
- **shadcn/ui**: Accessible, customizable component primitives.
- **Framer Motion**: For micro-interactions and fluid layout transitions.

## Aesthetic
- **Colors**: Deep, rich dark mode by default. Glassmorphism overlays for panels.
- **Typography**: Inter (or similar premium sans-serif) for body, maybe a distinct serif or display font for headings to evoke travel editorial aesthetics.
- **Spacing**: Tightly controlled 4px grid system (`gap-1`, `gap-2`, `gap-4`).

## Component Rules
1. **No direct Tailwind classes in business components**: If a button is used in 10 places, it must be a `<Button>` component defined in `src/components/ui/button.tsx`.
2. **Fluid Animations**: Every hover state, active state, and layout shift must be animated via Framer Motion's `layoutId` or Tailwind's `transition-all`.
