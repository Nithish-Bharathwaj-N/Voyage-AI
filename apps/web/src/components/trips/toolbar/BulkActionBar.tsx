'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/icons/Icon';

interface BulkActionBarProps {
  selectionCount: number;
  onArchive: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onShare: () => void;
  onExport: () => void;
  onClear: () => void;
}

export function BulkActionBar({
  selectionCount,
  onArchive,
  onDuplicate,
  onDelete,
  onShare,
  onExport,
  onClear,
}: BulkActionBarProps) {
  return (
    <AnimatePresence>
      {selectionCount > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-foreground text-background shadow-2xl border border-white/10 backdrop-blur-lg">
            {/* Count badge */}
            <span className="text-sm font-semibold mr-1 text-background/80">
              {selectionCount} selected
            </span>
            <div className="w-px h-5 bg-background/20" />

            {/* Actions */}
            {[
              { label: 'Archive', icon: 'Archive', action: onArchive },
              { label: 'Duplicate', icon: 'Copy', action: onDuplicate },
              { label: 'Share', icon: 'Share2', action: onShare },
              { label: 'Export', icon: 'Download', action: onExport },
            ].map(({ label, icon, action }) => (
              <button
                key={label}
                type="button"
                onClick={action}
                className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg hover:bg-background/10 transition-colors"
                aria-label={label}
                title={`${label} selected trips`}
              >
                <Icon name={icon as Parameters<typeof Icon>[0]['name']} size={14} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}

            {/* Delete — destructive */}
            <button
              type="button"
              onClick={onDelete}
              className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
              aria-label="Delete selected trips"
              title="Delete selected trips (stub)"
            >
              <Icon name="Trash2" size={14} />
              <span className="hidden sm:inline">Delete</span>
            </button>

            <div className="w-px h-5 bg-background/20" />

            {/* Clear */}
            <button
              type="button"
              onClick={onClear}
              className="p-1.5 rounded-lg hover:bg-background/10 transition-colors"
              aria-label="Clear selection"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
