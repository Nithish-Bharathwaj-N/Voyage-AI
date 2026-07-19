import '@testing-library/jest-dom';
import * as React from 'react';
import { vi } from 'vitest';

// Mock matchMedia for components using dynamic CSS rules
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Zustand persist middleware calls localStorage.setItem/getItem — provide
  // a simple in-memory shim so it doesn't blow up in jsdom.
  const _store: Record<string, string> = {};
  Object.defineProperty(window, 'localStorage', {
    writable: true,
    value: {
      getItem: (key: string) => _store[key] ?? null,
      setItem: (key: string, value: string) => { _store[key] = value; },
      removeItem: (key: string) => { delete _store[key]; },
      clear: () => { Object.keys(_store).forEach(k => delete _store[k]); },
      get length() { return Object.keys(_store).length; },
      key: (idx: number) => Object.keys(_store)[idx] ?? null,
    },
  });
}

// Mock CommandPalette to avoid deep import issues in test environment
vi.mock('@/components/ui/command-palette', () => ({
  CommandPalette: function CommandPalette() { return null; },
}));

// Mock framer-motion to prevent RequestAnimationFrame loop hangs in JSDOM
vi.mock('framer-motion', () => {
  const motionFactory = (tag: string) =>
    React.forwardRef(function MotionEl({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }, ref: React.Ref<HTMLElement>) {
      return React.createElement(tag, { ...props, ref }, children);
    });

  return {
    motion: {
      div: motionFactory('div'),
      aside: motionFactory('aside'),
      section: motionFactory('section'),
      button: motionFactory('button'),
      header: motionFactory('header'),
      span: motionFactory('span'),
      p: motionFactory('p'),
      h1: motionFactory('h1'),
      h2: motionFactory('h2'),
      main: motionFactory('main'),
      nav: motionFactory('nav'),
      article: motionFactory('article'),
      ul: motionFactory('ul'),
      li: motionFactory('li'),
    },
    AnimatePresence: function AnimatePresence({ children }: { children?: React.ReactNode }) {
      return React.createElement(React.Fragment, null, children);
    },
    // Stubs for scroll-based motion hooks used in landing page
    useScroll: () => ({
      scrollY: { get: () => 0, onChange: () => () => {} },
      scrollYProgress: { get: () => 0, onChange: () => () => {} },
    }),
    useTransform: (_: unknown, __: unknown, output: unknown[]) => ({
      get: () => output[0],
      onChange: () => () => {},
    }),
    useMotionValue: (initial: unknown) => ({
      get: () => initial,
      set: () => {},
      onChange: () => () => {},
    }),
    useSpring: (val: unknown) => val,
    useInView: () => true,
    useAnimation: () => ({ start: () => {}, stop: () => {} }),
    useCycle: (...vals: unknown[]) => [vals[0], () => {}],
  };
});
