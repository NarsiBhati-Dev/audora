import getPageMetadata from '@/lib/seo/getPageMetadata';
// import DashboardActions from '@/components/dashboard/home/dashboard-actions';
import authOptions from '@/lib/auth/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getStudio } from '@/actions/studio';

export const metadata = getPageMetadata({
  title: 'Dashboard',
});

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const studio = await getStudio(session?.user?.accessToken as string);

  if (!studio) {
    redirect('/dashboard/studios/create');
  }


  return (
    <div className='space-y-8 p-6 sm:p-8'>
      {/* Dashboard quick actions */}
      {/* <DashboardActions /> */}

      {/* Page heading */}
      <div className='space-y-1'>
        <h1 className='text-2xl font-bold text-white'>
          Welcome to Your Studio
        </h1>
        <p className='text-sm text-zinc-400'>
          Manage your settings, view recordings, and customize your workspace.
        </p>
      </div>

      {/* Example sections */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
        {/* Recordings */}
        <a
          href={`/studio/${studio.id}/projects`}
          className='bg-dashboard-bg-light rounded-2xl p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#18181b]'>
          <h2 className='text-xl font-semibold text-white'>Your Recordings</h2>
          <p className='mt-2 text-sm text-white/90'>
            View and manage your past sessions and uploads.
          </p>
        </a>

        {/* Studio Settings */}
        <a
          href={`/dashboard/account/studio-settings`}
          className='bg-dashboard-bg-light rounded-2xl p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#18181b]'>
          <h2 className='text-xl font-semibold text-white'>Studio Settings</h2>
          <p className='mt-2 text-sm text-white/90'>
            Customize your recording environment and preferences.
          </p>
        </a>
      </div>
    </div >
  );
};

export default HomePage;
