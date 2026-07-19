'use client';

import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable user profile picture or initial fallback container.
 */
export function Avatar({ className = '', src, alt = '', fallback = 'AI', size = 'md', ...props }: AvatarProps) {
  const [error, setError] = React.useState(false);

  const sizes = {
    sm: 'w-6 h-6 text-[9px]',
    md: 'w-8 h-8 text-[11px]',
    lg: 'w-12 h-12 text-sm',
  };

  return (
    <div
      className={`rounded-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/50 shrink-0 flex items-center justify-center font-bold text-slate-800 select-none ${sizes[size]} ${className}`}
      {...props}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{fallback.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}
