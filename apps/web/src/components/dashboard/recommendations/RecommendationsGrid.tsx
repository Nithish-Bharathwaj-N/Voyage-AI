'use client';

import React, { useEffect, useState } from 'react';
import { Heading } from '../../typography/Heading';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Icon } from '@/components/icons/Icon';
import { useRouter } from 'next/navigation';

interface Recommendation {
  id: string;
  destination: string;
  country: string;
  match: number;
  imageUrl: string;
  reason: string;
}

// Fallback static set only used if the API is down
const FALLBACK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'r-1',
    destination: 'Kyoto',
    country: 'Japan',
    match: 94,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop',
    reason: 'Based on your saved places',
  },
  {
    id: 'r-2',
    destination: 'Lisbon',
    country: 'Portugal',
    match: 88,
    imageUrl: 'https://images.unsplash.com/photo-1548707309-dcebe61c3ca1?q=80&w=600&auto=format&fit=crop',
    reason: 'Trending in October',
  },
];

export function RecommendationsGrid() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    fetch(`${apiUrl}/explore/destinations?limit=100`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: any[]) => {
        // Pull from trending or popular sections, pick 4
        const trending = data.filter((d) => d.isTrending || d.isPopular).slice(0, 4);
        if (trending.length === 0) {
          setRecommendations(FALLBACK_RECOMMENDATIONS);
          return;
        }
        setRecommendations(
          trending.map((d, i) => ({
            id: d.id,
            destination: d.title,
            country: d.country,
            match: 98 - i * 3, // deterministic descending score
            imageUrl: d.imageUrl?.startsWith('http')
              ? d.imageUrl
              : `https://source.unsplash.com/600x400/?${encodeURIComponent(d.title + ' travel')}`,
            reason: d.isTrending ? 'Trending this season' : 'Popular with travelers',
          }))
        );
      })
      .catch(() => setRecommendations(FALLBACK_RECOMMENDATIONS));
  }, []);

  if (recommendations.length === 0) return null;

  return (
    <div className="mb-10">
      <Heading level={3} className="mb-4">Recommended for you</Heading>
      <div className="grid sm:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <Card
            key={rec.id}
            className="group overflow-hidden border-border/50 cursor-pointer flex items-center h-24 hover:border-border transition-colors"
            onClick={() => router.push(`/planner?destination=${encodeURIComponent(rec.destination)}`)}
          >
            <div className="h-full w-24 relative shrink-0 overflow-hidden bg-muted">
              <img
                src={rec.imageUrl}
                alt={rec.destination}
                className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholders/destination.jpg';
                }}
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm leading-none mb-1">
                  {rec.destination}, {rec.country}
                </h4>
                <Badge variant="secondary" className="text-[10px] h-5 bg-green-500/10 text-green-600 hover:bg-green-500/20">
                  {rec.match}% Match
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Icon name="Sparkles" size={10} className="text-primary" /> {rec.reason}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
