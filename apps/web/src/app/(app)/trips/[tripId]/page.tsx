'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTrip } from '@/lib/trips/hooks/useTrip';
import { TripDetailsLayout } from '@/components/trips/details/layout/TripDetailsLayout';
import { TripDetailsSkeleton } from '@/components/trips/details/skeleton/TripDetailsSkeleton';
import { TripHero } from '@/components/trips/details/hero/TripHero';
import { TripDetailsTabs, type TripTabId } from '@/components/trips/details/tabs/TripDetailsTabs';
import { QuickActionsPanel } from '@/components/trips/details/shared/QuickActionsPanel';
import { TripOverview } from '@/components/trips/details/overview/TripOverview';
import { Icon } from '@/components/icons/Icon';

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = (Array.isArray(params.tripId) ? params.tripId[0] : params.tripId) || '';
  
  const { data: trip, isLoading, error } = useTrip(tripId);
  const [activeTab, setActiveTab] = useState<TripTabId>('overview');

  if (isLoading) {
    return <TripDetailsSkeleton />;
  }

  if (error || !trip) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6">
          <Icon name="AlertTriangle" size={32} className="text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Trip Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          The trip you are looking for does not exist or you do not have permission to view it.
        </p>
        <button 
          onClick={() => router.push('/trips')}
          className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
        >
          Back to Workspace
        </button>
      </div>
    );
  }

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <TripOverview trip={trip} />;
      default:
        // Placeholders for unimplemented tabs
        return (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 rounded-2xl bg-white/[0.01]">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <Icon name="Construction" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 capitalize">{activeTab}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              This section is under construction and will be available soon.
            </p>
          </div>
        );
    }
  };

  return (
    <TripDetailsLayout
      hero={<TripHero trip={trip} />}
      tabs={<TripDetailsTabs activeTab={activeTab} onChange={setActiveTab} />}
      content={renderTabContent()}
      sidebar={<QuickActionsPanel trip={trip} />}
    />
  );
}
