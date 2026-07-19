'use client';
import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/ui/Navbar';
import { DashboardHero } from './components/DashboardHero';
import { ContinueJourney } from './components/ContinueJourney';
import { TrendingDestinations } from './components/TrendingDestinations';
import { SeasonalRecommendations } from './components/SeasonalRecommendations';
import { TravelInspiration } from './components/TravelInspiration';
import { UpcomingFestivals } from './components/UpcomingFestivals';
import { SmartInsights } from './components/SmartInsights';
import { TravelStatistics } from './components/TravelStatistics';
import { DashboardCollections } from './components/DashboardCollections';
import { LiveWeather } from './components/LiveWeather';
import { TravelNews } from './components/TravelNews';
import { FloatingAssistant } from './components/FloatingAssistant';

import { useUserStore, useCollectionStore } from '@/store';

export default function DashboardPage() {
  const [destinations, setDestinations] = useState<any[]>([]);

  useEffect(() => {
    // Initialize Global State Mocks
    useUserStore.getState().initMockUser();
    useCollectionStore.getState().initMockCollections();

    fetch('/data/destinations/destinations-index.json')
      .then(res => res.json())
      .then(data => setDestinations(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-32">
      <Navbar />
      
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* HERO */}
        <DashboardHero />

        {/* SECTION 1: Continue Your Journey */}
        <ContinueJourney />

        {/* SECTION 2: Trending Across India */}
        <TrendingDestinations destinations={destinations} />

        {/* SECTION 3: Seasonal Recommendations */}
        <SeasonalRecommendations />

        {/* SECTION 4: Travel Inspiration */}
        <TravelInspiration destinations={destinations} />

        {/* SECTION 5: Upcoming Festivals */}
        <UpcomingFestivals />

        {/* Two-Column Layout for Data-Heavy Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-24">
            {/* SECTION 6: Smart Travel Insights */}
            <SmartInsights />

            {/* SECTION 7: Travel Statistics */}
            <TravelStatistics />
          </div>

          <div className="space-y-12">
            {/* SECTION 11: Live Weather */}
            <LiveWeather />

            {/* SECTION 12: Travel News */}
            <TravelNews />
          </div>
        </div>

        {/* SECTION 8: Collections */}
        <DashboardCollections />
      </main>

      {/* SECTION 9 & 10: Persistent AI Assistant & Quick Actions */}
      <FloatingAssistant />
    </div>
  );
}
