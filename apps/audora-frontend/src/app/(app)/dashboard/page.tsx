import LogoutButton from '@/components/auth/logoutButton';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import authOptions from '@/lib/auth/auth-options';

async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
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
      <pre className='text-white'>{JSON.stringify(session, null, 2)}</pre>

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
