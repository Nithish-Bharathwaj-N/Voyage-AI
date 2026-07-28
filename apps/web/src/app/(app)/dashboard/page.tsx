'use client';

import React, { useEffect, useState } from 'react';
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { ContinueJourney } from '@/components/dashboard/ContinueJourney';
import { TrendingDestinations } from '@/components/dashboard/TrendingDestinations';
import { SeasonalRecommendations } from '@/components/dashboard/SeasonalRecommendations';
import { TravelInspiration } from '@/components/dashboard/TravelInspiration';
import { UpcomingFestivals } from '@/components/dashboard/UpcomingFestivals';
import { SmartInsights } from '@/components/dashboard/SmartInsights';
import { TravelStatistics } from '@/components/dashboard/TravelStatistics';
import { DashboardCollections } from '@/components/dashboard/DashboardCollections';
import { LiveWeather } from '@/components/dashboard/LiveWeather';
import { TravelNews } from '@/components/dashboard/TravelNews';
import { FloatingAssistant } from '@/components/dashboard/FloatingAssistant';
import { useDashboardData } from '@/hooks/useDashboardData';

export default function DashboardPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const { data: dashboardData, isLoading: dashboardLoading } = useDashboardData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch destinations JSON (we still need this for Explore/Trending)
    fetch(`/data/destinations/destinations-index.json?v=` + Date.now())
      .then(res => res.json())
      .then(data => {
        setDestinations(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full flex-1 overflow-y-auto bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-32">
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-8">
        {/* HERO */}
        <DashboardHero />

        {/* SECTION 1: Continue Your Journey */}
        <ContinueJourney trips={dashboardData?.upcomingTrips || []} />

        {/* SECTION 2: Trending Across India */}
        {!loading && <TrendingDestinations destinations={destinations} />}

        {/* SECTION 3: Seasonal Recommendations */}
        <SeasonalRecommendations />

        {/* SECTION 4: Travel Inspiration */}
        {!loading && <TravelInspiration destinations={destinations} />}

        {/* SECTION 5: Upcoming Festivals */}
        <UpcomingFestivals />

        {/* Two-Column Layout for Data-Heavy Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-24">
            {/* SECTION 6: Smart Travel Insights */}
            <SmartInsights />

            {/* SECTION 7: Travel Statistics */}
            <TravelStatistics statistics={dashboardData?.statistics} />
          </div>

          <div className="space-y-12">
            {/* SECTION 11: Live Weather */}
            <LiveWeather />

            {/* SECTION 12: Travel News */}
            <TravelNews />
          </div>
        </div>

        {/* SECTION 8: Collections */}
        <DashboardCollections collections={dashboardData?.collections} />
      </main>

      {/* SECTION 9 & 10: Persistent AI Assistant & Quick Actions */}
      <FloatingAssistant />
    </div>
  );
}
