'use client';

import { useEffect } from 'react';
import { useStudioSettingsStore } from '@/store/studio-setting-store';
import { getStudioNameFromSlug } from '@/lib/studio/getStudioNameFromSlug';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { useMeetingStartStore } from '@/store/meeting-start-store';
import StudioRoleView from './views/studio-role-view';
import GuestLandingScreen from './views/guest-landing-screen';
// import { getGuestUserId } from '@/lib/studio/get-userId';

interface StudioPageClientProps {
  studio: string;
  isHost: boolean;
  userId: string | null;
  isGuestLanding: boolean;
  isGuestJoining: boolean;
  hostName: string | undefined;
}

const StudioPageClient = ({
  studio,
  isHost,
  // userId,
  isGuestLanding,
  isGuestJoining,
  hostName,
}: StudioPageClientProps) => {
  const { setStudioSetting } = useStudioSettingsStore();
  const isDesktop = useIsDesktop();
  const { isMeetingStarted, setIsMeetingStarted } = useMeetingStartStore();

  useEffect(() => {
    if (studio) {
      setStudioSetting({
        studioSlug: studio,
        studioName: getStudioNameFromSlug(studio),
      });
    }

    return () => {
      setIsMeetingStarted(false);
    };
  }, [studio, setStudioSetting, setIsMeetingStarted]);

  // If welcome token is present, show welcome screen
  if (isGuestLanding) return <GuestLandingScreen />;

  return (
    <StudioRoleView
      isGuestJoining={isGuestJoining}
      isHost={isHost}
      hostName={hostName}
      isDesktop={isDesktop}
      isMeetingStarted={isMeetingStarted}
    />
  );
};

export default StudioPageClient;
