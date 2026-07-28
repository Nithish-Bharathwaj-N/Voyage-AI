"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card';
import { Icon, type IconName } from '@/components/icons/Icon';

const features: { title: string; description: string; icon: IconName }[] = [
  {
    title: 'AI Copilot',
    description: 'An intelligent assistant that plans, curates, and modifies your itinerary through natural conversation.',
    icon: 'Sparkles',
  },
  {
    title: 'Planner Workspace',
    description: 'A professional-grade canvas with drag-and-drop timelines, integrated maps, and real-time syncing.',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Interactive Maps',
    description: 'Vector-based Mapbox integration with spatial PostGIS querying to find optimal routes and places.',
    icon: 'Map',
  },
  {
    title: 'Budget Tracking',
    description: 'Real-time currency conversion, split expenses, and intelligent cost projections.',
    icon: 'Wallet',
  },
  {
    title: 'Weather Intelligence',
    description: 'Historical climate data and 14-day forecasts integrated directly into your day cards.',
    icon: 'CloudSun',
  },
  {
    title: 'Knowledge Graph',
    description: 'Millions of POIs instantly searchable and rankable based on your personalized preferences.',
    icon: 'Network',
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Heading level={2} className="mb-4">Everything you need to travel well.</Heading>
          <Text size="lg" variant="muted">
            VoyageAI replaces your chaotic spreadsheets, dozen open tabs, and scattered notes with one unified, intelligent platform.
          </Text>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-background hover:bg-muted/20 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
                    <Icon name={feature.icon} size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">{feature.description}</Text>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
