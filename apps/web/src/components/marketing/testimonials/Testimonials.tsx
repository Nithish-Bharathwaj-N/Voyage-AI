"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/typography/Heading';
import { Card, CardContent } from '@/components/ui/Card';
import { Icon } from '@/components/icons/Icon';

const testimonials = [
  {
    quote: "VoyageAI completely replaced my 20-tab Google Sheets setup. The spatial awareness when organizing days is mind-blowing.",
    author: "Sarah Jenkins",
    role: "Travel Blogger",
    initials: "SJ"
  },
  {
    quote: "The Copilot is the first AI tool I've used that actually respects constraints. I told it my budget was $2,000 and it flagged expensive restaurants instantly.",
    author: "David Chen",
    role: "Digital Nomad",
    initials: "DC"
  },
  {
    quote: "Finally, a travel planner that looks and feels like a professional workspace. The UI is stunning and the offline sync saved me in Tokyo.",
    author: "Elena Rodriguez",
    role: "Frequent Flyer",
    initials: "ER"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-muted/10 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2}>Loved by modern explorers.</Heading>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full bg-background border-border/50 shadow-sm">
                <CardContent className="pt-6 flex flex-col h-full justify-between gap-6">
                  <div className="flex gap-1 text-primary">
                    <Icon name="Star" size={16} fill="currentColor" />
                    <Icon name="Star" size={16} fill="currentColor" />
                    <Icon name="Star" size={16} fill="currentColor" />
                    <Icon name="Star" size={16} fill="currentColor" />
                    <Icon name="Star" size={16} fill="currentColor" />
                  </div>
                  <p className="text-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.author}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
