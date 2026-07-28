'use client';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration?: number; // ms, default 4000
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: ToastItem[];
  toast: (item: Omit<ToastItem, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// ─── Context ─────────────────────────────────────────────────

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastCounter = 0;

// ─── Provider ────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((item: Omit<ToastItem, 'id'>): string => {
    const id = `toast-${++toastCounter}`;
    const newToast: ToastItem = { ...item, id, duration: item.duration ?? 4000 };

    setToasts((prev) => [...prev.slice(-4), newToast]); // max 5 toasts

    // Auto-dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, newToast.duration);

    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, dismissAll }}>
      {children}
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

// ─── Convenience helpers ──────────────────────────────────────

export function useToastHelpers() {
  const { toast } = useToast();
  return {
    success: (title: string, description?: string) =>
      toast({ variant: 'success', title, description }),
    error: (title: string, description?: string) =>
      toast({ variant: 'error', title, description }),
    info: (title: string, description?: string) =>
      toast({ variant: 'info', title, description }),
    warning: (title: string, description?: string) =>
      toast({ variant: 'warning', title, description }),
    undoable: (title: string, onUndo: () => void) =>
      toast({
        variant: 'info',
        title,
        duration: 6000,
        action: { label: 'Undo', onClick: onUndo },
      }),
  };
}
