"use client";
import React, { useEffect, useState } from 'react';
import { usePlannerInteraction } from '../provider/PlannerInteractionProvider';
import { usePlannerUIStore } from '@/lib/planner/store/plannerUIStore';
import { PlannerCommandPalette } from '../../polish/command-palette/PlannerCommandPalette';
import { KeyboardShortcutsModal } from '../../polish/shortcuts/KeyboardShortcutsModal';

export function KeyboardShortcuts() {
  const { closeContextMenu } = usePlannerInteraction();
  const { selectedActivityIds, clearSelection } = usePlannerUIStore();

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Ignore when typing in an input
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      // ── Cmd+K: Command Palette ──
      if (cmdOrCtrl && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
        return;
      }

      // ── Escape: Clear & Close everything ──
      if (e.key === 'Escape') {
        if (commandPaletteOpen) { setCommandPaletteOpen(false); return; }
        if (shortcutsModalOpen) { setShortcutsModalOpen(false); return; }
        clearSelection();
        closeContextMenu();
        return;
      }

      // ── ? : Show keyboard shortcuts ──
      if (e.key === '?' && !isTyping) {
        e.preventDefault();
        setShortcutsModalOpen(true);
        return;
      }

      // ── Cmd+Z: Undo stub ──
      if (cmdOrCtrl && !e.shiftKey && e.key === 'z' && !isTyping) {
        e.preventDefault();
        console.log('[Keyboard] Undo — stub for Sprint 5G');
        return;
      }

      // ── Cmd+Shift+Z / Cmd+Y: Redo stub ──
      if ((cmdOrCtrl && e.shiftKey && e.key === 'z') || (cmdOrCtrl && e.key === 'y')) {
        if (!isTyping) {
          e.preventDefault();
          console.log('[Keyboard] Redo — stub for Sprint 5G');
        }
        return;
      }

      // ── Delete / Backspace: Delete selected items ──
      if ((e.key === 'Backspace' || e.key === 'Delete') && selectedActivityIds.length > 0 && !isTyping) {
        console.log('[Keyboard] Would delete IDs:', selectedActivityIds);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedActivityIds, clearSelection, closeContextMenu, commandPaletteOpen, shortcutsModalOpen]);

  return (
    <>
      <PlannerCommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
      <KeyboardShortcutsModal
        isOpen={shortcutsModalOpen}
        onClose={() => setShortcutsModalOpen(false)}
      />
    </>
  );
}
