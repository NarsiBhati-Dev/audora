import authOptions from '@/lib/auth/auth-options';
import { getServerSession } from 'next-auth';
import React from 'react';

const DashboardContainer = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(authOptions);

  return (
    <div className='border-dashboard-bg-light bg-dashboard-bg-darkest h-full rounded-2xl border text-white'>
      <div className='border-dashboard-bg-light flex items-center justify-center border-b p-4'>
        <p className='text-sm text-white'>
          Welcome back, <span className='font-bold'>{session?.user.name}</span>
        </p>
      </div>

      <section className='w-full px-3 py-8 sm:px-12 md:px-6 lg:px-12 xl:px-24'>
        {children}
      </section>
    </div>
  );
};

export default DashboardContainer;
