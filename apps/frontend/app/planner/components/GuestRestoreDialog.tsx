'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';

interface GuestRestoreDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Dialog alerting guest users to register to persist their created itineraries in PostgreSQL databases.
 */
export function GuestRestoreDialog({ open, onClose }: GuestRestoreDialogProps) {
  const router = useRouter();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Save Your Progress"
      description="Create an account to lock in your planned travel schedules and coordinate booking reservations."
    >
      <div className="space-y-4 text-center select-none">
        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto shrink-0">
          <ShieldAlert className="w-6 h-6 animate-pulse" />
        </div>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
          We cached your itinerary locally for now. Sign up to sync it with maps, budgets, and journals.
        </p>
        <div className="flex items-center justify-center gap-3 pt-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={() => router.push('/auth/register')}>
            Sign Up Free
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
