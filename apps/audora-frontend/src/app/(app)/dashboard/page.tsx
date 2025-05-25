import LogoutButton from '@/components/auth/logoutButton';
import authOptions from '@/lib/auth/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/register');
  }

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

export default DashboardPage;
