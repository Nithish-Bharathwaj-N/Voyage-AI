import React from 'react';
import { Card, CardContent } from '../../ui/Card';
import type { Metric } from '../../../lib/services/dashboard';
import { Icon } from '@/components/icons/Icon';

interface MetricsGridProps {
  metrics: Metric[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {metrics.map((metric, i) => (
        <Card key={i} className="border-border/50 shadow-sm hover:border-border transition-colors">
          <CardContent className="p-4 flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{metric.label}</span>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">{metric.value}</span>
              {metric.trend && (
                <span className={`text-xs font-medium mb-1 ${metric.trendUp ? 'text-green-500' : 'text-muted-foreground'}`}>
                  {metric.trend}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
