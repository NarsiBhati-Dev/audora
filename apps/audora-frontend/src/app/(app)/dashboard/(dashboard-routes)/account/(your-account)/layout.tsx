'use client';

import AccountMobileSidebar from '@/components/dashboard/account/sidebar/account-mobile-sidebar';
import AccountDesktopSidebar from '@/components/dashboard/account/sidebar/account-desktop-sidebar';
import { useIsDesktop } from '@/hooks/useIsDesktop';

const YourAccountLayout = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useIsDesktop();

  return (
    <div className='mx-auto flex h-[calc(82vh-4rem)] max-w-5xl text-white md:h-[calc(90vh-4rem)]'>
      {isDesktop && <AccountDesktopSidebar />}
      {/* Main content */}
      <main className='flex flex-1 flex-col overflow-hidden'>
        <div className='mb-6 px-4 pt-4'>
          <h1 className='text-3xl font-bold text-white'>Settings</h1>
        </div>
        {!isDesktop && <AccountMobileSidebar />}
        {/* Scrollable content section */}
        <section
          className='flex-1 overflow-y-auto'
          style={{
            scrollbarWidth: 'none',
          }}
        >
          {children}
        </section>
      </main>
    </div>
  );
};

export default YourAccountLayout;
