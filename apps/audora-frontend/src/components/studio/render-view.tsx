import React from 'react';
import GuestStudioHeader from './guest-studio-header';
import JoinStudio from './join_meeting/join-studio';
import MediaSetupScreen from './media/media-setup-screen';
import MobileFallback from './mobile-fallback';
import StudioHeader from './studio-header';
import StudioLayout from './studio-layout';
import WelcomeScreen from './welcome-screen';
import MeetingStart from './meeting/meeting-start';


const renderGuestLanding = () => <WelcomeScreen />;

const renderGuestJoining = (isMeetingStarted: boolean) => {
  return (
    <>
      {isMeetingStarted ? (
        <MeetingStart isGuest={true} />
      ) : (
        <>
          <GuestStudioHeader />
          <StudioLayout>
            <JoinStudio isHost={false} />
            <MediaSetupScreen />
          </StudioLayout>
        </>
      )}
    </>
  );
};

const renderHostView = (hostName: string | undefined, isDesktop: boolean, isMeetingStarted: boolean) => {
  return isDesktop ? (
    isMeetingStarted ? (
      <>
        <MeetingStart isGuest={false} />
      </>
    ) : (
      <>
        <StudioHeader />
        <StudioLayout>
          <JoinStudio isHost={true} hostName={hostName} />
          <MediaSetupScreen />
        </StudioLayout>
      </>
    )
  ) : (
    <MobileFallback />
  );
};

export { renderGuestLanding, renderGuestJoining, renderHostView };
