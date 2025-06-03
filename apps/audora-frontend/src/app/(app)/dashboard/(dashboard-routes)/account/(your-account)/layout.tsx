import AccountMobileSidebar from '@/components/dashboard/account/account-mobile-sidebar';
import AccountSidebar from '@/components/dashboard/account/account-sidebar';

const YourAccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto flex h-[calc(82vh-4rem)] max-w-5xl text-white md:h-[calc(90vh-4rem)]'>
      <AccountSidebar />

      {/* Main content */}
      <main className='flex flex-1 flex-col overflow-hidden'>
        <div className='mb-6 px-4 pt-4'>
          <h1 className='text-3xl font-bold text-white'>Settings</h1>
        </div>
        <AccountMobileSidebar />

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
