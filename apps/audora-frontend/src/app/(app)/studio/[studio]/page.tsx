import StudioPageClient from '@/components/studio/studio-page-client';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth/auth-options';
import { notFound } from 'next/navigation';
import { getStudio } from '@/actions/studio';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ studio: string }>;
}) {
  const { studio } = await params;
  return getPageMetadata({
    title: `${studio}`,
  });
}

interface SearchParams {
  t?: string;
  gw?: string;
}

interface Params {
  params: Promise<{ studio: string }>;
  searchParams: Promise<SearchParams>;
}

const StudioPage = async ({ params, searchParams }: Params) => {
  const { studio } = await params;
  const { t, gw } = await searchParams;
  const session = await getServerSession(authOptions);
  const studioData = await getStudio(session?.user?.accessToken as string);

  if (studioData?.id !== studio && !gw && !t) {
    notFound();
  }

  // Check if user is the host
  const isHost = studioData?.id === studio;

  // If not host and no guest token, show 404
  if (!isHost && gw === undefined && t === undefined) {
    notFound();
  }

  return (
    <main className='bg-studio-bg-light'>
      <StudioPageClient
        studio={studio}
        t={t || undefined}
        gw={gw || undefined}
        isHost={isHost}
        hostName={session?.user?.name || ''}
      />
    </main>
  );
};

export default StudioPage;
