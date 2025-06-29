'use client';
import React from 'react';
import StudioHeader from '../studio-header';
import StudioLayout from '../studio-layout';
import JoinStudio from '../join_meeting/join-studio';
import MediaSetupScreen from '../media/media-setup-screen';
import MobileFallback from './mobile-fallback';
import MeetingStart from '../meeting/meeting-start';

interface HostStudioViewProps {
  hostName?: string;
  isDesktop: boolean;
  isMeetingStarted: boolean;
}

const HostStudioView = ({
  hostName,
  isDesktop,
  isMeetingStarted,
}: HostStudioViewProps) => {
  if (!isDesktop) return <MobileFallback />;

  return isMeetingStarted ? (
    <MeetingStart isGuest={false} />
  ) : (
    <>
      <StudioHeader />
      <StudioLayout>
        <JoinStudio isHost={true} hostName={hostName} />
        <MediaSetupScreen />
      </StudioLayout>
    </>
  );
};

export default HostStudioView;
