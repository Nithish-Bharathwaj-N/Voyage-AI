import React from 'react';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { Icon } from '@/components/icons/Icon';
import { Badge } from '@/components/ui/Badge';

export function WhyVoyageAI() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">The evolution of travel planning.</Heading>
          <Text size="lg" variant="muted">Stop fighting with static spreadsheets and generic blogs.</Text>
        </div>

        <div className="rounded-2xl border border-border/50 overflow-hidden shadow-sm">
          <div className="grid grid-cols-2 bg-muted/50 p-4 border-b border-border/50">
            <div className="font-semibold text-muted-foreground">Traditional Planning</div>
            <div className="font-bold flex items-center gap-2">
              VoyageAI <Badge variant="secondary">Pro</Badge>
            </div>
          </div>
          
          <div className="divide-y divide-border/50 bg-background">
            {/* Row 1 */}
            <div className="grid grid-cols-2 p-6">
              <div className="flex gap-3 text-muted-foreground">
                <Icon name="XCircle" className="shrink-0 mt-0.5 text-muted-foreground/50" size={18} />
                <span>15+ open tabs of blogs and maps</span>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" className="shrink-0 mt-0.5 text-primary" size={18} />
                <span className="font-medium">One unified, spatial workspace</span>
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="grid grid-cols-2 p-6">
              <div className="flex gap-3 text-muted-foreground">
                <Icon name="XCircle" className="shrink-0 mt-0.5 text-muted-foreground/50" size={18} />
                <span>Manual distance and time math</span>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" className="shrink-0 mt-0.5 text-primary" size={18} />
                <span className="font-medium">Automatic PostGIS route computation</span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-2 p-6">
              <div className="flex gap-3 text-muted-foreground">
                <Icon name="XCircle" className="shrink-0 mt-0.5 text-muted-foreground/50" size={18} />
                <span>Generic &ldquo;Top 10&rdquo; listicles</span>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" className="shrink-0 mt-0.5 text-primary" size={18} />
                <span className="font-medium">Personalized AI Knowledge Graph</span>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-2 p-6">
              <div className="flex gap-3 text-muted-foreground">
                <Icon name="XCircle" className="shrink-0 mt-0.5 text-muted-foreground/50" size={18} />
                <span>Requires internet to view plan</span>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" className="shrink-0 mt-0.5 text-primary" size={18} />
                <span className="font-medium">Offline-first local-first sync</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
