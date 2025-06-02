import StudioPageClient from '@/components/studio/studio-page-client';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth/auth-options';
import { notFound } from 'next/navigation';

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
  g?: string;
}

interface Params {
  params: Promise<{ studio: string }>;
  searchParams: Promise<SearchParams>;
}

const StudioPage = async ({ params, searchParams }: Params) => {
  const { studio } = await params;
  const { t, g } = await searchParams;
  const session = await getServerSession(authOptions);

  if (studio !== session?.user?.studioId && !g && !t) {
    notFound();
  }

  // Check if user is the host
  const isHost = session?.user?.studioId === studio;

  // If not host and no guest token, show 404
  if (!isHost && g === undefined && t === undefined) {
    notFound();
  }

  return (
    <main className='bg-studio-bg-light'>
      <StudioPageClient
        studio={studio}
        t={t || undefined}
        g={g || undefined}
        isHost={isHost}
        hostName={session?.user?.name || ''}
      />
    </main>
  );
};

export default StudioPage;
