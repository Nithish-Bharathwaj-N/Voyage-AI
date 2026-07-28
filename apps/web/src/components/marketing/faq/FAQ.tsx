"use client";
import React from 'react';
import { Heading } from '../../typography/Heading';
import { Accordion } from '../../ui/Accordion';

const faqItems = [
  {
    title: "Is VoyageAI really free?",
    content: "Yes. The core planner workspace is free forever up to 3 active trips. You only pay if you need unlimited trips, advanced AI models, or offline syncing."
  },
  {
    title: "Can I collaborate with my friends?",
    content: "Currently, you can share a view-only link to your itinerary. Real-time multiplayer collaboration (like Google Docs) is on our roadmap for Q4."
  },
  {
    title: "Which AI models do you use?",
    content: "We use a combination of GPT-4o and Gemini 1.5 Pro for our Pro users to ensure the highest quality geographic reasoning and itinerary generation."
  },
  {
    title: "Can I export my itinerary?",
    content: "Yes, you can export your entire trip to PDF, or sync it directly to Google Calendar and Apple Calendar."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 border-t border-border/50 bg-background">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Heading level={2}>Frequently asked questions.</Heading>
        </div>
        
        <div className="bg-muted/10 rounded-2xl p-2 sm:p-8 border border-border/50">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
