'use client';

import { useIsDesktop } from '@/hooks/useIsDesktop';
import React from 'react';
import DashboardDesktopSidebar from './dashboard-desktop-sidebar';
import DashboardMobileSidebar from './dashboard-mobile-sidebar';

const DashboardSidebar = () => {
  const isDesktop = useIsDesktop(1024);

  return (
    <>{isDesktop ? <DashboardDesktopSidebar /> : <DashboardMobileSidebar />}</>
  );
};

export default DashboardSidebar;
