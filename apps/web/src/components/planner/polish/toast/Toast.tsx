'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast, type ToastItem, type ToastVariant } from './ToastProvider';
import { Icon, type IconName } from '@/components/icons/Icon';

// ─── Variant config ───────────────────────────────────────────

const VARIANT_CONFIG: Record<
  ToastVariant,
  { icon: IconName; iconClass: string; stripClass: string }
> = {
  success: { icon: 'CheckCircle2', iconClass: 'text-emerald-600', stripClass: 'bg-emerald-500' },
  error:   { icon: 'XCircle',      iconClass: 'text-destructive',   stripClass: 'bg-destructive' },
  warning: { icon: 'AlertTriangle', iconClass: 'text-amber-600',   stripClass: 'bg-amber-500' },
  info:    { icon: 'Info',          iconClass: 'text-blue-600',     stripClass: 'bg-blue-500' },
};

// ─── Single Toast ─────────────────────────────────────────────

function ToastCard({ toast }: { toast: ToastItem }) {
  const { dismiss } = useToast();
  const config = VARIANT_CONFIG[toast.variant];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 64, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      role="alert"
      aria-live="polite"
      className="relative flex items-start gap-3 bg-card border border-border rounded-lg shadow-xl overflow-hidden min-w-[280px] max-w-[360px] pr-10"
    >
      {/* Left color strip */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.stripClass}`} />

      <div className="flex items-start gap-3 p-3 pl-4 w-full">
        <Icon name={config.icon} size={18} className={`${config.iconClass} shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-snug">{toast.title}</p>
          {toast.description && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{toast.description}</p>
          )}
          {toast.action && (
            <button
              onClick={() => {
                toast.action!.onClick();
                dismiss(toast.id);
              }}
              className="mt-2 text-xs font-bold text-primary hover:underline focus:outline-none focus:underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => dismiss(toast.id)}
        aria-label="Dismiss notification"
        className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center text-muted-foreground hover:text-foreground rounded transition-colors"
      >
        <Icon name="X" size={12} />
      </button>
    </motion.div>
  );
}

// ─── Toast Stack Renderer ─────────────────────────────────────

export function ToastStack() {
  const { toasts } = useToast();

  return (
    <div
      aria-label="Notifications"
      className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 items-end pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastCard toast={t} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
