'use client';

import React from 'react';
import GuestStudioHeader from './guest-studio-header';
import JoinStudio from './join_meeting/join-studio';
import MediaSetupScreen from './media/media-setup-screen';
import MobileFallback from './mobile-fallback';
import StudioHeader from './studio-header';
import StudioLayout from './studio-layout';
import WelcomeScreen from './welcome-screen';

const renderGuestLanding = () => <WelcomeScreen />;

const renderGuestJoining = () => (
  <>
    <GuestStudioHeader />
    <StudioLayout>
      <JoinStudio isHost={false} />
      <MediaSetupScreen />
    </StudioLayout>
  </>
);

const renderHostView = (hostName: string | undefined, isDesktop: boolean) => {
  return isDesktop ? (
    <>
      <StudioHeader />
      <StudioLayout>
        <JoinStudio isHost={true} hostName={hostName} />
        <MediaSetupScreen />
      </StudioLayout>
    </>
  ) : (
    <MobileFallback />
  );
};

export { renderGuestLanding, renderGuestJoining, renderHostView };
