'use client';

import React from 'react';

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable click-to-open popover panel.
 */
export function Popover({ trigger, children, className = '' }: PopoverProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>
      {open && (
        <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white border border-slate-100 rounded-2xl p-4 shadow-xl z-30 w-56 text-slate-800 ${className}`}>
          {children}
        </div>
      )}
    </div>
  );
}
