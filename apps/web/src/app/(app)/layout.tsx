import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { TopNavbar } from '@/components/navigation/TopNavbar';
import { Sidebar } from '@/components/navigation/Sidebar';
import { SearchProvider } from '@/components/search/SearchProvider';
import { GlobalSearch } from '@/components/search/GlobalSearch';

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // Assuming we have user metadata stored during signup
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Traveler';

  return (
    <SearchProvider>
      <AppLayout
        sidebar={<Sidebar user={{ name: userName, email: user.email || '' }} />}
        navbar={<TopNavbar user={{ name: userName, email: user.email || '' }} />}
      >
        {children}
      </AppLayout>
      <GlobalSearch />
    </SearchProvider>
  );
}
