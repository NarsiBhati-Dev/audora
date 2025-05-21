import LogoutButton from '@/components/auth/logoutButton';
import { Suspense } from 'react';

async function DashboardContent() {
  return (
    <div className='p-8'>
      <div className='mb-8 flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-white'>Dashboard</h1>
          <p className='mt-2 text-gray-400'></p>
        </div>
        <LogoutButton />
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {/* Add your dashboard content here */}
        <div className='rounded-lg bg-[#18181b] p-6'>
          <h2 className='text-lg font-semibold text-white'>Quick Stats</h2>
          <p className='mt-2 text-gray-400'>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className='flex h-screen items-center justify-center'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-[#a78bfa] border-t-transparent'></div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
