"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';
import { Icon } from '@/components/icons/Icon';
import { Card } from '../../ui/Card';
import { Button } from '@/components/ui/Button';

export function ProductShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-32">
        
        {/* Showcase 1: Planner Workspace */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Icon name="LayoutDashboard" size={24} className="text-primary" />
            </div>
            <Heading level={2} className="mb-4">The ultimate planner workspace.</Heading>
            <Text size="lg" variant="muted" className="mb-6">
              Drag, drop, and organize your days perfectly. Our spatial timeline automatically computes travel distances, identifies conflicts, and maps your entire journey in real-time.
            </Text>
            <ul className="space-y-3">
              <li className="flex items-center gap-3"><Icon name="Check" size={18} className="text-primary" /> Smart conflict detection</li>
              <li className="flex items-center gap-3"><Icon name="Check" size={18} className="text-primary" /> Distance and transit time calculations</li>
              <li className="flex items-center gap-3"><Icon name="Check" size={18} className="text-primary" /> Drag-and-drop organization</li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-2xl blur-3xl -z-10" />
            <Card className="p-2 border-border/50 bg-background/50 backdrop-blur shadow-2xl">
              <div className="bg-muted/30 rounded-lg p-6 min-h-[300px] border border-border/50 flex flex-col gap-4">
                 {/* Fake UI for Planner */}
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-background rounded-md shadow-sm border border-border/50 flex flex-col items-center justify-center">
                      <span className="text-xs font-bold uppercase text-muted-foreground">Oct</span>
                      <span className="text-lg font-bold leading-none">12</span>
                    </div>
                    <div className="flex-1 bg-background rounded-md shadow-sm border border-border/50 p-3">
                      <div className="font-semibold text-sm">Louvre Museum</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <Icon name="Clock" size={12} /> 09:00 - 13:00
                      </div>
                    </div>
                 </div>
                 <div className="ml-5 border-l-2 border-dashed border-border/50 h-6 flex items-center pl-4">
                    <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">15 min walk</span>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-transparent" />
                    <div className="flex-1 bg-background rounded-md shadow-sm border border-border/50 p-3">
                      <div className="font-semibold text-sm">Lunch at L&apos;Avenue</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <Icon name="Clock" size={12} /> 13:15 - 14:30
                      </div>
                    </div>
                 </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Showcase 2: AI Copilot (Reversed) */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative lg:order-1 order-2"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent rounded-2xl blur-3xl -z-10" />
            <Card className="p-2 border-border/50 bg-background/50 backdrop-blur shadow-2xl">
              <div className="bg-muted/30 rounded-lg p-6 min-h-[300px] border border-border/50 flex flex-col gap-4">
                 {/* Fake UI for Copilot */}
                 <div className="flex gap-3 max-w-[80%] ml-auto">
                    <div className="bg-primary text-primary-foreground text-sm p-3 rounded-2xl rounded-tr-sm">
                      Can you find a good dinner spot near my hotel for tonight? Nothing too expensive.
                    </div>
                 </div>
                 <div className="flex gap-3 max-w-[90%]">
                    <div className="h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center shrink-0 shadow-sm">
                      <Icon name="Sparkles" size={14} className="text-primary" />
                    </div>
                    <div className="bg-background border border-border/50 shadow-sm text-sm p-4 rounded-2xl rounded-tl-sm flex flex-col gap-3 w-full">
                      <p>I found three great bistros within a 10-minute walk from Le Meurice. I recommend <strong>Le Relais de l&apos;Entrecôte</strong> for their famous steak frites.</p>
                      
                      <div className="bg-muted/30 rounded-lg p-3 border border-border/50 flex justify-between items-center">
                        <div>
                          <div className="font-semibold">Le Relais de l&apos;Entrecôte</div>
                          <div className="text-xs text-muted-foreground mt-0.5">$$ • French Bistro • 4.6★</div>
                        </div>
                        <Button size="sm" variant="secondary">Add to day</Button>
                      </div>
                    </div>
                 </div>
              </div>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:order-2 order-1"
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Icon name="Sparkles" size={24} className="text-primary" />
            </div>
            <Heading level={2} className="mb-4">Your personal travel copilot.</Heading>
            <Text size="lg" variant="muted" className="mb-6">
              Talk to your itinerary naturally. The AI understands your constraints, knows geography, and suggests modifications you can preview before approving.
            </Text>
            <ul className="space-y-3">
              <li className="flex items-center gap-3"><Icon name="Check" size={18} className="text-primary" /> Strict preview-and-approve workflow</li>
              <li className="flex items-center gap-3"><Icon name="Check" size={18} className="text-primary" /> Context-aware spatial reasoning</li>
              <li className="flex items-center gap-3"><Icon name="Check" size={18} className="text-primary" /> Streaming markdown responses</li>
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
