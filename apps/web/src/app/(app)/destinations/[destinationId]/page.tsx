'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDestination } from '@/lib/destinations/hooks/useDestination';
import { DestinationLayout } from '@/components/destinations/layout/DestinationLayout';
import { DestinationSkeleton } from '@/components/destinations/skeleton/DestinationSkeleton';
import { DestinationHero } from '@/components/destinations/hero/DestinationHero';
import { DestinationTabs, type DestinationTabId } from '@/components/destinations/navigation/DestinationTabs';
import { QuickActionsPanel } from '@/components/destinations/shared/QuickActionsPanel';
import { Icon } from '@/components/icons/Icon';

// Overview Cards
import { OverviewCard } from '@/components/destinations/overview/OverviewCard';
import { BudgetCard } from '@/components/destinations/overview/BudgetCard';
import { SafetyCard } from '@/components/destinations/overview/SafetyCard';
import { WeatherCard } from '@/components/destinations/overview/WeatherCard';

// Sections
import { Gallery } from '@/components/destinations/sections/Gallery';
import { AttractionsList } from '@/components/destinations/sections/AttractionsList';
import { HotelsList } from '@/components/destinations/sections/HotelsList';
import { RestaurantsList } from '@/components/destinations/sections/RestaurantsList';
import { TransportationCard } from '@/components/destinations/sections/TransportationCard';
import { TravelTips } from '@/components/destinations/sections/TravelTips';
import { PackingChecklist } from '@/components/destinations/sections/PackingChecklist';
import { EmergencyInfo } from '@/components/destinations/sections/EmergencyInfo';
import { RelatedDestinations } from '@/components/destinations/sections/RelatedDestinations';

export default function DestinationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const destinationId = (Array.isArray(params.destinationId) ? params.destinationId[0] : params.destinationId) || '';
  
  const { data: destination, isLoading, error } = useDestination(destinationId);
  const [activeTab, setActiveTab] = useState<DestinationTabId>('overview');

  if (isLoading) {
    return <DestinationSkeleton />;
  }

  if (error || !destination) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-6">
          <Icon name="AlertTriangle" size={32} className="text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Destination Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          The destination you are looking for does not exist or our services are temporarily down.
        </p>
        <button 
          onClick={() => router.back()}
          className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Group sections to render
  const renderMainContent = () => (
    <div className="space-y-12 pb-24">
      {/* Overview Block */}
      <div id="overview" className="scroll-mt-32 space-y-8">
        <OverviewCard destination={destination} />
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <WeatherCard destination={destination} />
          <BudgetCard destination={destination} />
          <SafetyCard destination={destination} />
        </div>
      </div>
      
      {/* Features */}
      <AttractionsList destination={destination} />
      <HotelsList destination={destination} />
      <RestaurantsList destination={destination} />
      <Gallery destination={destination} />
      
      {/* Tips */}
      <TravelTips destination={destination} />
      
      <RelatedDestinations destination={destination} />
    </div>
  );

  const renderSidebarContent = () => (
    <div className="space-y-6">
      <QuickActionsPanel destination={destination} />
      <TransportationCard destination={destination} />
      <PackingChecklist destination={destination} />
      <EmergencyInfo destination={destination} />
    </div>
  );

  // In a real implementation with intersection observers, 
  // clicking a tab would smooth scroll to the section.
  // For Sprint 8B, we'll implement simple anchor navigation.
  const handleTabChange = (tabId: DestinationTabId) => {
    setActiveTab(tabId);
    const el = document.getElementById(tabId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <DestinationLayout
      hero={<DestinationHero destination={destination} />}
      tabs={<DestinationTabs activeTab={activeTab} onChange={handleTabChange} />}
      mainContent={renderMainContent()}
      sidebarContent={renderSidebarContent()}
    />
  );
}
