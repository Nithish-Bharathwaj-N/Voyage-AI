import React from 'react';
import { PlannerInteractionProvider } from '../interactions/provider/PlannerInteractionProvider';
import { ToastProvider } from '../polish/toast/ToastProvider';
import { ToastStack } from '../polish/toast/Toast';
import { PlannerQueryProvider } from '../../../lib/planner/utils/PlannerQueryProvider';

interface PlannerShellProps {
  canvas: React.ReactNode;
  map?: React.ReactNode;
  contextPanel?: React.ReactNode;
  statusBar: React.ReactNode;
}

export function PlannerShell({ canvas, map, contextPanel, statusBar }: PlannerShellProps) {
  return (
    <PlannerQueryProvider>
      <ToastProvider>
        <PlannerInteractionProvider>
          <div className="flex flex-col h-full w-full relative bg-background overflow-hidden">

            {/* Main Workspace Area */}
            <div className="flex flex-1 min-h-0 overflow-hidden">

              {/* Center: Timeline Canvas */}
              <main
                className="flex-1 flex flex-col min-w-0 border-r border-border/50 relative bg-muted/5"
                aria-label="Planner Timeline"
              >
                {canvas}
              </main>

              {/* Right: Map + Context Panels (hidden on small screens) */}
              <aside
                className="hidden lg:flex w-[400px] xl:w-[560px] shrink-0 flex-col bg-background"
                aria-label="Map and Context"
              >
                {/* Map Region */}
                {map && (
                  <div className="h-[45%] border-b border-border/50 relative overflow-hidden">
                    {map}
                  </div>
                )}

                {/* Context Panel Region */}
                {contextPanel && (
                  <div className="flex-1 overflow-hidden relative">
                    {contextPanel}
                  </div>
                )}
              </aside>
            </div>

            {/* Bottom Status Bar */}
            <div className="shrink-0 border-t border-border/50" role="contentinfo" aria-label="Planner status">
              {statusBar}
            </div>

          </div>

          {/* Global Toast Overlay */}
          <ToastStack />

        </PlannerInteractionProvider>
      </ToastProvider>
    </PlannerQueryProvider>
  );
}
