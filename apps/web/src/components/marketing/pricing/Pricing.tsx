"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../ui/Card';
import { Icon } from '@/components/icons/Icon';

const plans = [
  {
    name: 'Free',
    price: '$0',
    desc: 'Perfect for occasional weekend getaways.',
    features: ['Up to 3 active trips', 'Basic Copilot access (GPT-3.5)', 'Shared trip viewing', 'Community templates'],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/mo',
    desc: 'For frequent travelers who want total control.',
    features: ['Unlimited active trips', 'Advanced Copilot (GPT-4o & Gemini Pro)', 'Offline syncing', 'Live budget tracking', '14-day Weather Intelligence'],
    cta: 'Start 7-Day Free Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For travel agencies and large groups.',
    features: ['Everything in Pro', 'Custom branding', 'Dedicated account manager', 'API Access', 'Bulk export tools'],
    cta: 'Contact Sales',
    popular: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Heading level={2} className="mb-4">Simple, transparent pricing.</Heading>
          <Text size="lg" variant="muted">Start for free. Upgrade when you need more power.</Text>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={plan.popular ? "relative z-10" : ""}
            >
              <Card className={`h-full flex flex-col ${plan.popular ? 'border-primary shadow-xl shadow-primary/10 scale-105' : 'border-border/50 shadow-sm'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <Text variant="muted" className="h-10 mt-2">{plan.desc}</Text>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <Icon name="Check" size={18} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
