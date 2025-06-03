import React from 'react';
import DashboardContainer from '@/components/dashboard/dashboard-container';
import DashboardMobileSidebar from '@/components/dashboard/dashboard-mobile-sidebar';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth/auth-options';
import { getStudio } from '@/actions/studio';
import { redirect } from 'next/navigation';

const StudiosLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  const studio = await getStudio(session?.user?.accessToken as string);

  if (studio) {
    redirect('/dashboard/home');
  }

  return (
    <div className='bg-dashboard-bg flex h-full w-screen overflow-hidden'>
      <DashboardSidebar />
      <DashboardMobileSidebar />
      <div className='m-1.5 flex-1 lg:m-3'>
        <DashboardContainer>{children}</DashboardContainer>
      </div>
    </div>
  );
};

export default StudiosLayout;
