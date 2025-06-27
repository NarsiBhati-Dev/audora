import StudioPageClient from '@/components/studio/studio-page-client';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth/auth-options';
import { notFound } from 'next/navigation';
import { generateMeetingToken } from '@/actions/meeting';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ studio: string }>;
}) {
  const { studio } = await params;
  return getPageMetadata({
    title: `${studio}`,
    description: `Join the ${studio} studio`,
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

  const meetingTokenResponse = await generateMeetingToken(
    studio,
    session?.user?.id as string | undefined,
    t as string,
  );

  if (!meetingTokenResponse.success) {
    notFound();
  }

  const { token, userId, participantRole, studioFixedToken } =
    meetingTokenResponse.data;

  const isHost = participantRole === 'host';
  const isGuestLanding =
    participantRole === 'guest' && t !== undefined && gw === undefined;
  const isGuestJoining =
    participantRole === 'guest' && t !== undefined && gw === 'on';

  if (!isHost && !isGuestLanding && !isGuestJoining) {
    notFound();
  }

  return (
    <main className='bg-studio-bg-light'>
      <StudioPageClient
        studioSlug={studio}
        userId={userId}
        token={token}
        studioFixedToken={studioFixedToken}
        isHost={isHost}
        isGuestLanding={isGuestLanding}
        isGuestJoining={isGuestJoining}
        hostName={session?.user?.name}
      />
    </main>
  );
};

export default StudioPage;
