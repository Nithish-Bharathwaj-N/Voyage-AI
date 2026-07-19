'use client';

import React from 'react';
import { Dialog } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface SaveTripDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (title: string) => void;
  defaultTitle?: string;
  loading?: boolean;
}

/**
 * Dialog asking traveler to customize trip name before database commit.
 */
export function SaveTripDialog({
  open,
  onClose,
  onConfirm,
  defaultTitle = 'My Custom Trip',
  loading = false,
}: SaveTripDialogProps) {
  const [title, setTitle] = React.useState(defaultTitle);

  React.useEffect(() => {
    if (open) {
      setTitle(defaultTitle);
    }
  }, [open, defaultTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onConfirm(title);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Save Trip to Workspace"
      description="Give your trip itinerary a name to identify it on your command center."
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left select-none">
        <Input
          label="Trip Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Kyoto Cherry Blossom Trip"
          autoFocus
          required
        />
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" loading={loading} disabled={!title.trim()}>
            Save Trip
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
