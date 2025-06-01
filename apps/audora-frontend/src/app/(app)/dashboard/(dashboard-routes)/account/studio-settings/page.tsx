import { getStudioById } from '@/actions/studio';
import StudioSettingPage from '@/components/dashboard/account/studio-settings/studio-setting-page';
import authOptions from '@/lib/auth/auth-options';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata = getPageMetadata({
  title: 'Studio settings',
});

const StudioSettingsPage = async () => {
  const session = await getServerSession(authOptions);

  const studio = await getStudioById(
    session?.user?.studioId as string,
    session?.user?.accessToken as string,
  );

  if (!studio) {
    redirect('/dashboard');
  }

  return <StudioSettingPage studio={studio} />;
};

export default StudioSettingsPage;
