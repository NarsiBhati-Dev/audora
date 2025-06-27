import getPageMetadata from '@/lib/seo/getPageMetadata';
// import DashboardActions from '@/components/dashboard/home/dashboard-actions';
import authOptions from '@/lib/auth/auth-options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getStudio } from '@/actions/studio';
import Image from 'next/image';
import { FiVideo, FiSettings, FiFolder, FiPlay } from 'react-icons/fi';
import Link from 'next/link';
import { Suspense } from 'react';
import DashboardSkeleton from '@/components/loaders/dashboard-skeleton';

export const metadata = getPageMetadata({
  title: 'Dashboard',
});

const HomePageContent = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const studio = await getStudio(session?.user?.accessToken as string);

  if (!studio) {
    redirect('/dashboard/studios/create');
  }

  const studioUrl = `/studio/${studio.studioSlug}`;
  const projectsUrl = `${studioUrl}/projects`;
  const settingsUrl = '/dashboard/account/studio-settings';

  return (
    <div className='space-y-8 p-6 sm:p-8'>
      {/* Welcome Section with Studio Image */}
      <div className='flex flex-col items-center space-y-6 text-center lg:flex-row lg:items-start lg:space-y-0 lg:space-x-8 lg:text-left'>
        {/* Studio Image */}
        <div className='relative h-48 w-48 flex-shrink-0 lg:h-64 lg:w-64'>
          <Image
            src='/images/studio/create-studio.png'
            alt={`${studio.studioName} Studio`}
            fill
            className='rounded-2xl object-cover shadow-lg'
            priority
          />
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent' />
        </div>

        {/* Welcome Content */}
        <div className='flex flex-1 flex-col space-y-4'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold text-white lg:text-4xl'>
              Welcome to your studio
            </h1>
            <p className='text-sm text-zinc-400'>
              Your professional recording studio is ready. Start creating amazing content today.
            </p>
          </div>

          {/* Quick Actions */}
          <div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
            <Link
              href={studioUrl}
              className='group flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-white transition-all duration-200 hover:bg-primary-600 hover:scale-105 active:scale-95'
            >
              <FiPlay className='h-5 w-5' />
              <span className='font-semibold text-sm'>Start Meeting</span>
            </Link>

            <Link
              href={projectsUrl}
              className='group flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-dashboard-bg-light px-6 py-3 text-white transition-all duration-200 hover:bg-zinc-800 hover:scale-105 active:scale-95'
            >
              <FiFolder className='h-5 w-5' />
              <span className='font-semibold text-sm'>View Projects</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className='space-y-6'>
        <h2 className='text-xl font-semibold text-white'>Quick Access</h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <Link
            href={studioUrl}
            className='group bg-dashboard-bg-light rounded-2xl p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#18181b]'
          >
            <div className='flex items-center gap-4'>
              <div className='flex h-16 w-16 items-center justify-center rounded-xl bg-primary-500/20 group-hover:bg-primary-500/30 transition-colors'>
                <FiVideo className='h-8 w-8 text-primary-400' />
              </div>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-white group-hover:text-primary-400 transition-colors'>
                  Open Studio
                </h3>
                <p className='mt-2 text-sm text-zinc-400'>
                  Launch your recording studio and start creating content immediately.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href={projectsUrl}
            className='group bg-dashboard-bg-light rounded-2xl p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#18181b]'
          >
            <div className='flex items-center gap-4'>
              <div className='flex h-16 w-16 items-center justify-center rounded-xl bg-green-500/20 group-hover:bg-green-500/30 transition-colors'>
                <FiFolder className='h-8 w-8 text-green-400' />
              </div>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-white group-hover:text-green-400 transition-colors'>
                  Your Recordings
                </h3>
                <p className='mt-2 text-sm text-zinc-400'>
                  Browse and manage your past recordings and projects.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href={settingsUrl}
            className='group bg-dashboard-bg-light rounded-2xl p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#18181b]'
          >
            <div className='flex items-center gap-4'>
              <div className='flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors'>
                <FiSettings className='h-8 w-8 text-blue-400' />
              </div>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-white group-hover:text-blue-400 transition-colors'>
                  Studio Settings
                </h3>
                <p className='mt-2 text-sm text-zinc-400'>
                  Customize your recording environment and preferences.
                </p>
              </div>
            </div>
          </Link>

          <div className='bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-2xl p-6 shadow-md border border-primary-500/20 transition-all duration-300 hover:scale-[1.02] hover:bg-[#18181b]'>
            <div className='flex items-center gap-4'>
              <div className='flex h-16 w-16 items-center justify-center rounded-xl bg-primary-500/20'>
                <FiVideo className='h-8 w-8 text-primary-400' />
              </div>
              <div className='flex-1'>
                <h3 className='text-xl font-semibold text-white'>
                  Studio Features
                </h3>
                <p className='mt-2 text-sm text-zinc-400'>
                  High-quality recording, real-time collaboration, and professional tools.
                </p>
                <div className='mt-3 flex flex-wrap gap-2'>
                  <span className='inline-flex items-center rounded-full bg-primary-500/20 px-2.5 py-0.5 text-xs font-medium text-primary-400'>
                    HD Recording
                  </span>
                  <span className='inline-flex items-center rounded-full bg-green-500/20 px-2.5 py-0.5 text-xs font-medium text-green-400'>
                    Real-time
                  </span>
                  <span className='inline-flex items-center rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-medium text-blue-400'>
                    Collaboration
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <HomePageContent />
    </Suspense>
  );
};

export default HomePage;
