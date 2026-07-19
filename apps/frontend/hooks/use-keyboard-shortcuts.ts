import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUiStore } from '@/store/useUiStore';

export function useKeyboardShortcuts() {
  const router = useRouter();
  const { setCommandPaletteOpen } = useUiStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        (document.activeElement as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      // Cmd+K or Ctrl+K for Global Search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
        return;
      }

      // Ignore shortcuts if modifiers are pressed (to allow native shortcuts)
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

      // Single key navigation
      switch (e.key.toLowerCase()) {
        case 'h':
          router.push('/dashboard');
          break;
        case 'e':
          router.push('/explore');
          break;
        case 't':
          router.push('/trips');
          break;
        case 'c':
          router.push('/collections');
          break;
        case 'r':
          router.push('/reservations');
          break;
        case 's':
          router.push('/stats');
          break;
        case 'p':
          router.push('/profile');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, setCommandPaletteOpen]);
}
