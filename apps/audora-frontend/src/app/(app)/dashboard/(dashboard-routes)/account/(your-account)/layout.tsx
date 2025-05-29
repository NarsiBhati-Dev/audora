import AccountMobileSidebar from '@/components/dashboard/account/account-mobile-sidebar';
import AccountSidebar from '@/components/dashboard/account/account-sidebar';

const YourAccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='mx-auto flex max-w-4xl text-white'>
      <AccountSidebar />
      {/* Main content */}
      <main className='flex-1'>
        <div className='mb-6 flex items-start justify-start'>
          <h1 className='text-3xl font-bold text-white'>Settings</h1>
        </div>
        <AccountMobileSidebar />
        <section className='mx-auto max-w-4xl rounded-xl bg-[#232323] px-4 py-6'>
          {children}
        </section>
      </main>
    </div>
  );
};

export default YourAccountLayout;
