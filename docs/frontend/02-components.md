# 02. Components Architecture

Our UI foundation mirrors the API of `shadcn/ui`, utilizing `class-variance-authority` (cva) for type-safe variants, and `tailwind-merge` + `clsx` (`cn` utility) for dynamic class composition.

## Rule of Construction
1. Components are purely presentational.
2. Components DO NOT fetch data.
3. Every component must export its Props interface and its `cva` variants so they can be extended.

Example:
```tsx
import { cva, type VariantProps } from "class-variance-authority"
const buttonVariants = cva("inline-flex items-center...", { variants: { size, variant } })
```
