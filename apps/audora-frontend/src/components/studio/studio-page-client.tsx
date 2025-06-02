'use client';

import { useIsDesktop } from '@/hooks/useIsDesktop';
import React from 'react';
import JoinStudio from './join_meeting/join-studio';
import MediaSetupScreen from './media/media-setup-screen';
import MobileFallback from './mobile-fallback';
import { useStudioSettingsStore } from '@/store/studio-setting-store';
import StudioHeader from './studio-header';
import WelcomeScreen from './welcome-screen';
import GuestStudioHeader from './guest-studio-header';

interface StudioPageClientProps {
  studio: string;
  t: string | undefined;
  gw: string | undefined;
  isHost: boolean;
  hostName: string;
}

const StudioPageClient = ({
  studio,
  t,
  gw,
  isHost,
  hostName,
}: StudioPageClientProps) => {
  const isDesktop = useIsDesktop();
  const { studioSetting } = useStudioSettingsStore();

  studioSetting.studioId = studio;
  studioSetting.name = getStudioNameFromSlug(studio);

  // If welcome token is present, show welcome screen
  if (t && !isHost && gw === undefined) {
    return <WelcomeScreen />;
  }

  // If guest token is present, show join as guest screen
  if (t && gw && !isHost) {
    return (
      <>
        <GuestStudioHeader studioName={studioSetting.name} />
        <div className='mx-auto mt-16 h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center gap-10 px-4 md:flex md:flex-col md:gap-12 lg:flex-row'>
          <JoinStudio isHost={false} hostName={hostName} />
          <MediaSetupScreen />
        </div>
      </>
    );
  }

  // Default view for host
  return (
    <>
      {isDesktop ? (
        <>
          <StudioHeader />
          <div className='mx-auto mt-16 h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center gap-10 px-4 md:flex md:flex-col md:gap-12 lg:flex-row'>
            <JoinStudio isHost={true} hostName={hostName} />
            <MediaSetupScreen />
          </div>
        </>
      ) : (
        <MobileFallback />
      )}
    </>
  );
};

function getStudioNameFromSlug(slug: string): string {
  return slug.slice(0, -7);
}

export default StudioPageClient;
