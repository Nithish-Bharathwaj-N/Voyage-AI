'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  loading?: boolean;
}

/**
 * Premium container card with sub-components for header, content, and footer sections.
 */
export function Card({ className = '', loading, children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white/70 backdrop-blur-xl border border-black/[0.03] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-all duration-300 ${
        loading ? 'pointer-events-none opacity-80' : ''
      } ${className}`}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 bg-slate-50/20 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
        </div>
      )}
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 border-b border-black/[0.03] flex items-center justify-between ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Content = function CardContent({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 border-t border-black/[0.03] bg-slate-50/40 ${className}`} {...props}>
      {children}
    </div>
  );
};
