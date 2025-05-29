import DashboardContainer from '@/components/dashboard/dashboard-container';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import DashboardMobileSidebar from '@/components/dashboard/dashboard-mobile-sidebar';
import React from 'react';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='bg-dashboard-bg flex min-h-screen w-screen md:h-screen'>
      <DashboardSidebar />
      <DashboardMobileSidebar />
      <div className='m-1 flex-1 md:m-3'>
        <DashboardContainer>{children}</DashboardContainer>
      </div>
    </div>
  );
};

export default DashboardLayout;
