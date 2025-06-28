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
    <div className='h-full overflow-hidden'>
      <div
        className='mx-auto h-full max-w-5xl overflow-y-auto'
        style={{ scrollbarWidth: 'none' }}
      >
        <div className='space-y-6 p-4 lg:space-y-8'>
          <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8'>
            <div className='mx-auto h-40 w-40 flex-shrink-0 sm:h-48 sm:w-48 lg:mx-0 lg:h-56 lg:w-56 xl:h-64 xl:w-64'>
              <Image
                src='/images/studio/create-studio.png'
                alt={`${studio.studioName} Studio`}
                width={256}
                height={256}
                className='rounded-2xl object-cover shadow-lg'
                style={{
                  objectFit: 'cover',
                }}
                priority
              />
            </div>

            <div className='flex flex-1 flex-col items-center gap-4 text-center lg:items-start lg:text-left'>
              <div>
                <h1 className='text-2xl font-bold text-white sm:text-3xl lg:text-4xl'>
                  Welcome to your studio
                </h1>
                <p className='mt-2 text-xs text-zinc-400 sm:text-sm'>
                  Your professional recording studio is ready. Start creating
                  amazing content today.
                </p>
              </div>

              {/* Quick Actions */}
              <div className='mt-2 flex w-full flex-col items-center gap-2 lg:flex-row lg:items-center lg:gap-4'>
                <a
                  href={studioUrl}
                  className='group bg-primary-500 hover:bg-primary-600 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-white transition-all duration-200 hover:scale-105 active:scale-95 sm:px-6 sm:py-3'
                >
                  <FiPlay className='h-4 w-4 sm:h-5 sm:w-5' />
                  <span className='text-xs font-semibold sm:text-sm'>
                    Start Meeting
                  </span>
                </a>

                <Link
                  href={projectsUrl}
                  className='group bg-dashboard-bg-light flex items-center justify-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-white transition-all duration-200 hover:scale-105 hover:bg-zinc-800 active:scale-95 sm:px-6 sm:py-3'
                >
                  <FiFolder className='h-4 w-4 sm:h-5 sm:w-5' />
                  <span className='text-xs font-semibold sm:text-sm'>
                    View Projects
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className='space-y-4 lg:space-y-6'>
            <h2 className='text-lg font-semibold text-white sm:text-xl'>
              Quick Access
            </h2>
            <div className='grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2'>
              <a
                href={studioUrl}
                className='group bg-dashboard-bg-light rounded-2xl p-4 shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#18181b] sm:p-6'
              >
                <div className='flex flex-col items-center gap-3 md:flex-row md:gap-4'>
                  <div className='bg-primary-500/20 group-hover:bg-primary-500/30 flex h-12 w-12 items-center justify-center rounded-xl transition-colors sm:h-16 sm:w-16'>
                    <FiVideo className='text-primary-400 h-6 w-6 sm:h-8 sm:w-8' />
                  </div>
                  <div className='flex-1 text-center md:text-left'>
                    <h3 className='group-hover:text-primary-400 text-lg font-semibold text-white transition-colors sm:text-xl'>
                      Open Studio
                    </h3>
                    <p className='mt-1 text-xs text-zinc-400 sm:mt-2 sm:text-sm'>
                      Launch your recording studio and start creating content
                      immediately.
                    </p>
                  </div>
                </div>
              </a>

              <Link
                href={projectsUrl}
                className='group bg-dashboard-bg-light rounded-2xl p-4 shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#18181b] sm:p-6'
              >
                <div className='flex flex-col items-center gap-3 md:flex-row md:gap-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 transition-colors group-hover:bg-green-500/30 sm:h-16 sm:w-16'>
                    <FiFolder className='h-6 w-6 text-green-400 sm:h-8 sm:w-8' />
                  </div>
                  <div className='flex-1 text-center md:text-left'>
                    <h3 className='text-lg font-semibold text-white transition-colors group-hover:text-green-400 sm:text-xl'>
                      Your Recordings
                    </h3>
                    <p className='mt-1 text-xs text-zinc-400 sm:mt-2 sm:text-sm'>
                      Browse and manage your past recordings and projects.
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href={settingsUrl}
                className='group bg-dashboard-bg-light rounded-2xl p-4 shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#18181b] sm:p-6'
              >
                <div className='flex flex-col items-center gap-3 md:flex-row md:gap-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 transition-colors group-hover:bg-blue-500/30 sm:h-16 sm:w-16'>
                    <FiSettings className='h-6 w-6 text-blue-400 sm:h-8 sm:w-8' />
                  </div>
                  <div className='flex-1 text-center md:text-left'>
                    <h3 className='text-lg font-semibold text-white transition-colors group-hover:text-blue-400 sm:text-xl'>
                      Studio Settings
                    </h3>
                    <p className='mt-1 text-xs text-zinc-400 sm:mt-2 sm:text-sm'>
                      Customize your recording environment and preferences.
                    </p>
                  </div>
                </div>
              </Link>

              <div className='from-primary-500/10 border-primary-500/20 rounded-2xl border bg-gradient-to-br to-purple-500/10 p-4 shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#18181b] sm:p-6'>
                <div className='flex flex-col items-center gap-3 md:flex-row md:gap-4'>
                  <div className='bg-primary-500/20 flex h-12 w-12 items-center justify-center rounded-xl sm:h-16 sm:w-16'>
                    <FiVideo className='text-primary-400 h-6 w-6 sm:h-8 sm:w-8' />
                  </div>
                  <div className='flex-1 text-center md:text-left'>
                    <h3 className='text-lg font-semibold text-white sm:text-xl'>
                      Studio Features
                    </h3>
                    <p className='mt-1 text-xs text-zinc-400 sm:mt-2 sm:text-sm'>
                      High-quality recording, real-time collaboration, and
                      professional tools.
                    </p>
                    <div className='mt-2 flex flex-wrap justify-center gap-1.5 sm:mt-3 sm:gap-2 md:justify-start'>
                      <span className='bg-primary-500/20 text-primary-400 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium'>
                        HD Recording
                      </span>
                      <span className='inline-flex items-center rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400'>
                        Real-time
                      </span>
                      <span className='inline-flex items-center rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400'>
                        Collaboration
                      </span>
                    </div>
                  </div>
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
