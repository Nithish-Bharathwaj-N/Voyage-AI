"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';
import { Button } from '@/components/ui/Button';

export function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Heading level={1} className="text-primary-foreground mb-6">
            Ready to plan your next adventure?
          </Heading>
          <Text size="lg" className="text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Join thousands of modern explorers who have upgraded from messy spreadsheets to intelligent, spatial travel planning.
          </Text>
          
          <Button size="lg" variant="secondary" className="h-14 px-10 text-lg shadow-2xl">
            Start Planning for Free
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
