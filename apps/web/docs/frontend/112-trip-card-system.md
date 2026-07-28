# 112 — Trip Card System

## Overview
Six card variants dispatched by `TripCardDispatcher` based on `TripCardVariant`.

## Variants
| Variant | When Used |
|---|---|
| standard | Default grid cell |
| featured | First slot when >= 3 my-trips in grid view |
| compact | Reserved for future dense grids |
| list | List view full-width row |
| timeline | Timeline view with date stamp |
| template | Templates tab with "Use Template" CTA |

## Props (all cards)
- `trip: WorkspaceTrip`
- `isSelected: boolean`
- `onSelect(id, multi)` — selection handler
- `onQuickAction(id, action)` — archive/edit/share stub

## Animation
All grid/compact cards use `motion.article` with `whileHover` scale + lift.
List/timeline use `motion.article` with `initial={{ opacity: 0, x: -8 }}` slide-in.
