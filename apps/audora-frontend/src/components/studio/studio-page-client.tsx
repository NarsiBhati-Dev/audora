'use client';

import { useEffect } from 'react';
import { useStudioSettingsStore } from '@/store/studio/studio-settings-store';
import { getStudioNameFromSlug } from '@/lib/studio/getStudioNameFromSlug';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useMeetingStartStore } from '@/store/meeting-start-store';
import StudioRoleView from './views/studio-role-view';
import GuestLandingScreen from './views/guest-landing-screen';
import { StudioProvider } from '@/components/providers/StudioProvider';

interface StudioPageClientProps {
  studioSlug: string;
  isHost: boolean;
  userId: string | undefined;
  token: string | null;
  studioFixedToken: string;
  isGuestLanding: boolean;
  isGuestJoining: boolean;
  hostName: string | undefined;
}

const StudioPageClient = ({
  studioSlug,
  isHost,
  userId,
  token,
  studioFixedToken,
  isGuestLanding,
  isGuestJoining,
  hostName,
}: StudioPageClientProps) => {
  const { setStudioSetting } = useStudioSettingsStore();
  const isDesktop = useIsDesktop();
  const { isMeetingStarted, setIsMeetingStarted } = useMeetingStartStore();

  useEffect(() => {
    if (studioSlug) {
      setStudioSetting({
        studioSlug: studioSlug,
        studioName: getStudioNameFromSlug(studioSlug),
        studioFixedToken: studioFixedToken,
        enableLobby: false,
        language: 'English',
        enableCaptions: false,
      });
    }

    if (token) {
      localStorage.setItem('studio-token', token);
    }

    return () => {
      setIsMeetingStarted(false);
      setStudioSetting({
        studioSlug: '',
        studioName: '',
        studioFixedToken: '',
        enableLobby: false,
        language: 'English',
        enableCaptions: false,
      });
    };
  }, [
    studioSlug,
    setStudioSetting,
    setIsMeetingStarted,
    token,
    studioFixedToken,
  ]);

  if (isGuestLanding) return <GuestLandingScreen />;

  return (
    <StudioProvider studioSlug={studioSlug} token={token} selfId={userId || ''}>
      <StudioRoleView
        isGuestJoining={isGuestJoining}
        isHost={isHost}
        hostName={hostName}
        isDesktop={isDesktop}
        isMeetingStarted={isMeetingStarted}
      />
    </StudioProvider>
  );
};

export default StudioPageClient;
