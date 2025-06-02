import { getStudio } from '@/actions/studio';
import DashboardMobileSidebar from '@/components/dashboard/dashboard-mobile-sidebar';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import StudioProvider from '@/components/studio-provider';
import DashboardContainer from '@/components/dashboard/dashboard-container';
import authOptions from '@/lib/auth/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/register');
  }

  const studio = await getStudio(session?.user?.accessToken as string);

  if (!studio) {
    redirect('/dashboard/studios/create');
  }

  return (
    <StudioProvider studio={studio}>
      <div className='bg-dashboard-bg flex h-full w-screen overflow-hidden'>
        <DashboardSidebar studioId={studio.id} />
        <DashboardMobileSidebar studioId={studio.id} />
        <div className='m-1.5 flex-1 lg:m-3'>
          <DashboardContainer>{children}</DashboardContainer>
        </div>
      </div>
    </StudioProvider>
  );
}
