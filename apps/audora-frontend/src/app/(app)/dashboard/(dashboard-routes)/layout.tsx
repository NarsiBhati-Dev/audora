import DashboardContainer from '@/components/dashboard/dashboard-container';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import DashboardMobileSidebar from '@/components/dashboard/dashboard-mobile-sidebar';
import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth/auth-options';
import { redirect } from 'next/navigation';

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.studioId) {
    redirect('/dashboard/studios/create');
  }

  return (
    <div className='bg-dashboard-bg flex h-full w-screen overflow-hidden'>
      <DashboardSidebar studioId={session?.user?.studioId as string} />
      <DashboardMobileSidebar studioId={session?.user?.studioId as string} />
      <div className='m-1.5 flex-1 lg:m-3'>
        <DashboardContainer>{children}</DashboardContainer>
      </div>
    </div>
  );
};

export default DashboardLayout;
