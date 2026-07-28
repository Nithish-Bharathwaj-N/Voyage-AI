# 08. Animation System

Animations should be invisible unless explicitly drawn attention to.

## Framer Motion
- Use `<AnimatePresence>` for mounting/unmounting Modals, Toasts, and Dropdowns.
- All layout transitions should utilize a standard spring physics profile: `{ type: 'spring', stiffness: 300, damping: 30 }`.
- NEVER over-animate. Avoid heavy parallax or arbitrary scale-ins that slow down the UI. 

## Accessibility
If `prefers-reduced-motion` is enabled at the OS level, all Framer Motion components must instantly snap to their final state.
