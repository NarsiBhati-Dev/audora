import React from 'react';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import DashboardActions from '@/components/dashboard/home/dashboard-actions';

export const metadata = getPageMetadata({
  title: 'Studio Settings',
});

const HomePage = async () => {
  return (
    <div className='space-y-6 p-8'>
      {/* Dashboard quick actions */}
      <DashboardActions />

      {/* Page heading */}
      <h1 className='text-2xl font-bold text-white'>Welcome to Your Studio</h1>
      <p className='text-gray-300'>
        Manage your settings, view recordings, and customize your workspace.
      </p>

      {/* Example sections */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* Recordings */}
        <div className='bg-dashboard-bg-light transform rounded-2xl p-6 shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#18181b] hover:text-white'>
          <h2 className='text-xl font-semibold text-white'>Your Recordings</h2>
          <p className='mt-2 text-white/90'>
            View and manage your past sessions and uploads.
          </p>
        </div>

        {/* Studio Settings */}
        <div className='bg-dashboard-bg-light transform rounded-2xl p-6 shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#18181b] hover:text-white'>
          <h2 className='text-xl font-semibold text-white'>Studio Settings</h2>
          <p className='mt-2 text-white/90'>
            Customize your recording environment and preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
