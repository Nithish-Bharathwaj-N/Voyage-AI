import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Icon, type IconName } from '@/components/icons/Icon';
import type { Insight } from '@/lib/services/dashboard';

interface InsightsPanelProps {
  insights: Insight[];
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="mb-10">
      <Card className="border-border/50 shadow-sm bg-card">
        <CardHeader className="pb-3 border-b border-border/50 bg-muted/10">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <Icon name="Sparkles" size={16} className="text-primary" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-border/50">
          {insights.map(insight => {
            let iconName: IconName = 'Info';
            let color = 'text-blue-500';
            
            if (insight.type === 'saving') {
              iconName = 'TrendingDown';
              color = 'text-green-500';
            } else if (insight.type === 'weather') {
              iconName = 'CloudRain';
              color = 'text-blue-400';
            } else if (insight.type === 'alert') {
              iconName = 'AlertCircle';
              color = 'text-destructive';
            }

            return (
              <div key={insight.id} className="p-4 flex items-start gap-4 hover:bg-muted/10 transition-colors">
                <div className={`mt-0.5 ${color}`}>
                  <Icon name={iconName} size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground mb-1">{insight.message}</p>
                  {insight.actionText && (
                    <a href={insight.actionUrl || "#"} className="text-xs font-semibold text-primary hover:underline">
                      {insight.actionText}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
