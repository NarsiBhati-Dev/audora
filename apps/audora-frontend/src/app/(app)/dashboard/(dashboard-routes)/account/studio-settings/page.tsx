import StudioSettingPage from '@/components/dashboard/account/studio-settings/studio-setting-page';
import getPageMetadata from '@/lib/seo/getPageMetadata';

export const metadata = getPageMetadata({
  title: 'Studio settings',
});

const StudioSettingsPage = () => {
  return <StudioSettingPage />;
};

export default StudioSettingsPage;
