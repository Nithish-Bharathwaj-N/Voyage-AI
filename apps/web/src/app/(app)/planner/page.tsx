import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { PlannerSidebar } from '@/components/planner/sidebar/PlannerSidebar';
import { PlannerToolbar } from '@/components/planner/toolbar/PlannerToolbar';
import { PlannerShell } from '@/components/planner/shell/PlannerShell';
import { PlannerCanvas } from '@/components/planner/canvas/PlannerCanvas';
import { PlannerMapPanel } from '@/components/planner/map/PlannerMapPanel';
import { PlannerContextPanel } from '@/components/planner/context/PlannerContextPanel';
import { PlannerStatusBar } from '@/components/planner/status/PlannerStatusBar';

export default async function PlannerPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  return (
    <AppLayout
      noPadding
      sidebar={<PlannerSidebar />}
      navbar={<PlannerToolbar />}
    >
      <PlannerShell
        canvas={<PlannerCanvas />}
        map={<PlannerMapPanel />}
        contextPanel={<PlannerContextPanel />}
        statusBar={<PlannerStatusBar />}
      />
    </AppLayout>
  );
}
