'use client';

import * as React from 'react';
import { HeroInvitation } from '@/components/landing-v4/HeroInvitation';
import { Chapter1Arrival } from '@/components/landing-v4/Chapter1Arrival';
import { Chapter2Journey } from '@/components/landing-v4/Chapter2Journey';
import { Chapter3Map } from '@/components/landing-v4/Chapter3Map';
import { Chapter4Moments } from '@/components/landing-v4/Chapter4Moments';
import { Chapter5Assistant } from '@/components/landing-v4/Chapter5Assistant';
import { Chapter6LivingProduct } from '@/components/landing-v4/Chapter6LivingProduct';
import { Chapter7Departure } from '@/components/landing-v4/Chapter7Departure';

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
