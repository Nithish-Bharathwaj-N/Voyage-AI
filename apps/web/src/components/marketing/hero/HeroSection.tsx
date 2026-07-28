"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';
import { Button } from '@/components/ui/Button';
import { Badge } from '../../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card';
import { Icon } from '@/components/icons/Icon';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium w-fit">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              VoyageAI V2 is now in beta
            </div>
            
            <Heading level={1} className="leading-[1.1]">
              Plan Smarter.<br />
              Travel Better.
            </Heading>
            
            <Text size="lg" variant="muted" className="max-w-[480px]">
              AI-powered travel intelligence for modern explorers. Design perfect itineraries, manage budgets, and explore interactively in one premium workspace.
            </Text>
            
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20">
                Start Planning
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background/50 backdrop-blur">
                <Icon name="PlayCircle" size={18} className="mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-4 pt-4 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-1"><Icon name="CheckCircle2" size={16} className="text-primary" /> No credit card required</div>
              <div className="flex items-center gap-1"><Icon name="CheckCircle2" size={16} className="text-primary" /> Free 7-day trial</div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto w-full max-w-[600px] perspective-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-3xl -z-10" />
            
            <Card className="border-border/50 shadow-2xl shadow-primary/5 bg-background/95 backdrop-blur-xl overflow-hidden rounded-2xl">
              <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-destructive/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto flex h-6 items-center rounded-md bg-background px-3 text-xs text-muted-foreground shadow-sm border border-border/50">
                  <Icon name="Lock" size={10} className="mr-1.5" />
                  voyageai.com/planner
                </div>
              </div>
              
              <div className="flex h-[400px]">
                {/* Fake Sidebar */}
                <div className="w-16 border-r border-border/50 bg-muted/10 flex flex-col items-center py-4 gap-4">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center"><Icon name="Map" size={16} className="text-primary" /></div>
                  <div className="h-8 w-8 rounded-lg text-muted-foreground flex items-center justify-center"><Icon name="Calendar" size={16} /></div>
                  <div className="h-8 w-8 rounded-lg text-muted-foreground flex items-center justify-center"><Icon name="Wallet" size={16} /></div>
                </div>
                
                {/* Fake Content */}
                <div className="flex-1 p-6 flex flex-col gap-4 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">Paris Getaway</h4>
                      <p className="text-xs text-muted-foreground">Oct 12 - Oct 15 • 3 Travelers</p>
                    </div>
                    <Badge>Planned</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
                      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <Icon name="Sun" size={14} />
                        <span className="text-xs font-medium">Weather</span>
                      </div>
                      <div className="text-2xl font-bold">22°C</div>
                      <div className="text-xs text-muted-foreground mt-1">Sunny, 0% rain</div>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
                      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <Icon name="Wallet" size={14} />
                        <span className="text-xs font-medium">Budget</span>
                      </div>
                      <div className="text-2xl font-bold">$2.4k</div>
                      <div className="text-xs text-muted-foreground mt-1">of $3,000 total</div>
                    </div>
                  </div>

                  <div className="mt-2 space-y-3">
                    <div className="text-sm font-medium">Day 1: Arrival & Eiffel Tower</div>
                    <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-background p-3 shadow-sm">
                      <div className="mt-0.5 h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon name="MapPin" size={12} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Check-in at Le Meurice</div>
                        <div className="text-xs text-muted-foreground">14:00 • 228 Rue de Rivoli</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fake Copilot Overlay */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-4 right-4 left-4 rounded-xl border border-border bg-background shadow-lg p-3 flex items-center gap-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary shrink-0 flex items-center justify-center">
                      <Icon name="Sparkles" size={14} className="text-primary-foreground" />
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold block">Copilot</span>
                      <span className="text-muted-foreground">I found a great dinner spot near your hotel. Add it?</span>
                    </div>
                    <Button size="sm" className="ml-auto shrink-0">Approve</Button>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
