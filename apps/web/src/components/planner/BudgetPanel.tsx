'use client';

import * as React from 'react';
import { usePlannerStore } from '../../stores/usePlannerStore';

export function BudgetPanel() {
  const budget = usePlannerStore((state) => state.getComputedBudget());

  return (
    <div className="p-4 border rounded-xl bg-card shadow-sm space-y-2">
      <h3 className="font-semibold text-sm border-b pb-2">Live Budget</h3>
      <div className="flex justify-between items-center pt-2">
        <span className="text-sm text-muted-foreground">Estimated Total</span>
        <span className="font-medium font-mono">${budget.min} - ${budget.max}</span>
      </div>
      {/* In a real implementation, a visual progress bar or pie chart goes here */}
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden mt-4">
        <div className="h-full bg-primary" style={{ width: '45%' }} />
      </div>
    </div>
  );
}
