'use client';

import * as React from 'react';
import { HeroInvitation } from '@/components/marketing/landing/HeroInvitation';
import { Chapter1Arrival } from '@/components/marketing/landing/Chapter1Arrival';
import { Chapter2Journey } from '@/components/marketing/landing/Chapter2Journey';
import { Chapter3Map } from '@/components/marketing/landing/Chapter3Map';
import { Chapter4Moments } from '@/components/marketing/landing/Chapter4Moments';
import { Chapter5Assistant } from '@/components/marketing/landing/Chapter5Assistant';
import { Chapter6LivingProduct } from '@/components/marketing/landing/Chapter6LivingProduct';
import { Chapter7Departure } from '@/components/marketing/landing/Chapter7Departure';

export default function LandingPage() {
  return (
    <main className="bg-black selection:bg-indigo-500/30 font-sans relative w-full overflow-x-hidden">
      <HeroInvitation />
      <Chapter1Arrival />
      <Chapter2Journey />
      <Chapter3Map />
      <Chapter4Moments />
      <Chapter5Assistant />
      <Chapter6LivingProduct />
      <Chapter7Departure />
    </main>
  );
}
