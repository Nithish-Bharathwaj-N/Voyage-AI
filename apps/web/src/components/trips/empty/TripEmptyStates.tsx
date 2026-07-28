'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { IconName } from '@/components/icons/Icon';

interface EmptyStateProps {
  icon: IconName;
  title: string;
  description: string;
  action?: React.ReactNode;
}

function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center select-none">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-5">
        <Icon name={icon} size={28} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">{description}</p>
      {action}
    </div>
  );
}

export function EmptyMyTrips({ onCreateTrip }: { onCreateTrip?: () => void }) {
  return (
    <EmptyState
      icon="Map"
      title="No trips yet"
      description="Your adventures start here. Create your first trip and start planning with AI-powered itineraries."
      action={
        onCreateTrip ? (
          <button
            type="button"
            onClick={onCreateTrip}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors"
          >
            <Icon name="Plus" size={16} />
            Create your first trip
          </button>
        ) : null
      }
    />
  );
}

export function EmptyDrafts() {
  return (
    <EmptyState
      icon="FileText"
      title="No drafts"
      description="Draft trips you have started but have not finished planning will appear here."
    />
  );
}

export function EmptyShared() {
  return (
    <EmptyState
      icon="Users"
      title="No shared trips"
      description="Trips shared with you by friends or family will appear here. Start collaborating!"
    />
  );
}

export function EmptyArchived() {
  return (
    <EmptyState
      icon="Archive"
      title="Nothing archived"
      description="Trips you archive will appear here. Archiving keeps your workspace tidy without deleting memories."
    />
  );
}

export function EmptyTemplates() {
  return (
    <EmptyState
      icon="Copy"
      title="No templates"
      description="Ready-made trip templates will appear here. Pick one and customise it to your destination."
    />
  );
}

export function EmptySearch({ query }: { query: string }) {
  return (
    <EmptyState
      icon="SearchX"
      title="No trips found"
      description={`No trips match "${query}". Try a different destination, title, or clear your filters.`}
    />
  );
}
