"use client";
import React from 'react';
import { Text } from '../../typography/Text';

const technologies = [
  { name: 'Next.js', label: 'Next.js 15' },
  { name: 'NestJS', label: 'NestJS' },
  { name: 'PostgreSQL', label: 'PostgreSQL' },
  { name: 'PostGIS', label: 'PostGIS' },
  { name: 'Redis', label: 'Redis' },
  { name: 'Mapbox', label: 'Mapbox' },
  { name: 'Supabase', label: 'Supabase Auth' },
  { name: 'OpenAI', label: 'GPT-4o' },
  { name: 'Gemini', label: 'Gemini 1.5 Pro' },
];

export function TrustedTechnologies() {
  return (
    <section className="py-12 border-y border-border/50 bg-muted/10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <Text variant="muted" size="sm" weight="medium" className="mb-8 uppercase tracking-widest">
          Powered by enterprise-grade technology
        </Text>
        
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center font-bold text-xs">
                {tech.name[0]}
              </div>
              <span className="font-semibold text-foreground/80 tracking-tight">{tech.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
