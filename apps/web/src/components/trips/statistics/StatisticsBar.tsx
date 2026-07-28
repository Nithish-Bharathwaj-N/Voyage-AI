'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/icons/Icon';
import type { IconName } from '@/components/icons/Icon';
import { cn } from '@/utils/cn';
import type { TripStatistics } from '@/lib/trips/types/trips.types';

interface StatCardProps {
  label: string;
  value: number;
  icon: IconName;
  iconColor: string;
  delay?: number;
}

function StatCard({ label, value, icon, iconColor, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3.5 flex items-center gap-3"
    >
      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', iconColor)}>
        <Icon name={icon} size={16} />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground tabular-nums leading-none">{value}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">{label}</p>
      </div>
    </motion.div>
  );
}

interface StatisticsBarProps {
  stats: TripStatistics;
}

export function StatisticsBar({ stats }: StatisticsBarProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <StatCard label="Total Trips" value={stats.total} icon="Map" iconColor="bg-blue-500/20 text-blue-400" delay={0} />
      <StatCard label="Active Now" value={stats.active} icon="Navigation" iconColor="bg-violet-500/20 text-violet-400" delay={0.05} />
      <StatCard label="Upcoming" value={stats.upcoming} icon="Calendar" iconColor="bg-emerald-500/20 text-emerald-400" delay={0.1} />
      <StatCard label="Drafts" value={stats.drafts} icon="FileText" iconColor="bg-amber-500/20 text-amber-400" delay={0.15} />
    </div>
  );
}
