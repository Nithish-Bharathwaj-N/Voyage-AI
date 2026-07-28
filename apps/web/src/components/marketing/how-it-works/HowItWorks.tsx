"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';

const steps = [
  {
    num: '01',
    title: 'Describe your trip',
    desc: 'Give the Copilot a vague idea or strict constraints. "3 days in Paris with kids, moderate budget."'
  },
  {
    num: '02',
    title: 'AI builds the skeleton',
    desc: 'The orchestrator constructs a geographically optimized baseline itinerary in seconds.'
  },
  {
    num: '03',
    title: 'Customize visually',
    desc: 'Drag and drop cards, adjust budgets, and swap out places using the interactive canvas.'
  },
  {
    num: '04',
    title: 'Travel confidently',
    desc: 'Sync everything offline to your mobile app. No roaming data required.'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-muted/30 border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Heading level={2} className="mb-4">How VoyageAI works.</Heading>
          <Text size="lg" variant="muted">From a vague idea to a perfect itinerary in minutes.</Text>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[1px] bg-border z-0" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="h-24 w-24 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center mb-6 shadow-sm">
                <span className="text-3xl font-bold text-primary/40">{step.num}</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
