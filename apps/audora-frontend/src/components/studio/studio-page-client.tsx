'use client';

import { useEffect } from 'react';
import { useStudioSettingsStore } from '@/store/studio-setting-store';
import { getStudioNameFromSlug } from '@/lib/studio/getStudioNameFromSlug';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useMeetingStartStore } from '@/store/meeting-start-store';
import StudioRoleView from './views/studio-role-view';
import GuestLandingScreen from './views/guest-landing-screen';

interface StudioPageClientProps {
  studioSlug: string;
  isHost: boolean;
  userId: string | undefined;
  token: string | null;
  isGuestLanding: boolean;
  isGuestJoining: boolean;
  hostName: string | undefined;
}

const StudioPageClient = ({
  studioSlug,
  isHost,
  // userId,
  token,
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
      });
    };
  }, [studioSlug, setStudioSetting, setIsMeetingStarted, token]);

  if (isGuestLanding) return <GuestLandingScreen />;

  return (
    <StudioRoleView
      studioSlug={studioSlug}
      isGuestJoining={isGuestJoining}
      isHost={isHost}
      hostName={hostName}
      isDesktop={isDesktop}
      isMeetingStarted={isMeetingStarted}
    />
  );
};

export default StudioPageClient;
