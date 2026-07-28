'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/components/icons/Icon';
import { Button } from '@/components/ui/Button';

interface ShortcutRowProps {
  keys: string[];
  label: string;
}

function ShortcutRow({ keys, label }: ShortcutRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-1">
        {keys.map((key, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-muted-foreground text-xs">+</span>}
            <kbd className="inline-flex items-center justify-center min-w-[28px] h-6 px-1.5 text-xs font-semibold bg-muted border border-border rounded text-foreground font-mono">
              {key}
            </kbd>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const SHORTCUTS = [
  { section: 'General', items: [
    { keys: ['⌘', 'K'], label: 'Open Command Palette' },
    { keys: ['?'],        label: 'Show Keyboard Shortcuts' },
    { keys: ['Escape'],   label: 'Clear selection / Close panels' },
    { keys: ['⌘', 'Z'],  label: 'Undo' },
    { keys: ['⌘', '⇧', 'Z'], label: 'Redo' },
  ]},
  { section: 'Selection', items: [
    { keys: ['Click'],          label: 'Select activity' },
    { keys: ['⌘', 'Click'],     label: 'Multi-select activity' },
    { keys: ['⇧', 'Click'],     label: 'Range select' },
    { keys: ['⌘', 'A'],         label: 'Select all (coming soon)' },
  ]},
  { section: 'Activities', items: [
    { keys: ['Delete'],         label: 'Delete selected' },
    { keys: ['⌘', 'D'],         label: 'Duplicate selected (coming soon)' },
    { keys: ['Space'],          label: 'Open context menu (coming soon)' },
  ]},
  { section: 'Navigation', items: [
    { keys: ['↑', '↓'],         label: 'Move focus in Command Palette' },
    { keys: ['↵'],              label: 'Execute command' },
  ]},
];

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[91] w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-label="Keyboard Shortcuts"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Icon name="Keyboard" size={18} className="text-muted-foreground" />
                <h2 className="font-bold text-base">Keyboard Shortcuts</h2>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose} aria-label="Close shortcuts modal">
                <Icon name="X" size={16} />
              </Button>
            </div>

            {/* Shortcuts list */}
            <div className="overflow-y-auto max-h-[60vh] p-5 space-y-5">
              {SHORTCUTS.map((section) => (
                <div key={section.section}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    {section.section}
                  </h3>
                  <div className="divide-y divide-border/50">
                    {section.items.map((item) => (
                      <ShortcutRow key={item.label} keys={item.keys} label={item.label} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground text-center">
              Press <kbd className="font-mono font-semibold">?</kbd> anywhere to open this panel
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
