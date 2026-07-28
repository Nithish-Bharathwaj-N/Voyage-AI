# 01. Design System

VoyageAI V2 uses a custom design system built entirely on Tailwind CSS v4 variables. The goal is to provide a premium, minimal, and highly spacious Light-Only theme.

## Core Palette
- **Background**: Absolute white (`#ffffff`) for maximum clarity.
- **Foreground**: Deep zinc (`#09090b`) for crisp, high-contrast typography.
- **Primary**: Off-black (`#171717`) for primary actions.
- **Muted/Secondary**: Soft zinc (`#f4f4f5`) for secondary surfaces, tags, and subtle borders.

## Philosophy
No hardcoded hex codes exist in components. Every color is semantic (e.g. `bg-primary`, `text-muted-foreground`). This guarantees consistency across the entire monorepo.
