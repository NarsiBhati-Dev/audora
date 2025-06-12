'use client';
import React from 'react';
import GuestStudioHeader from '../guest-studio-header';
import JoinStudio from '../join_meeting/join-studio';
import MediaSetupScreen from '../media/media-setup-screen';
import StudioLayout from '../studio-layout';
import MeetingStart from '../meeting/meeting-start';
import MobileFallback from './mobile-fallback';

interface GuestJoinViewProps {
  isMeetingStarted: boolean;
  isDesktop: boolean;
}

const GuestJoinView = ({ isMeetingStarted, isDesktop }: GuestJoinViewProps) => {
  if (!isDesktop) return <MobileFallback />;

  return isMeetingStarted ? (
    <MeetingStart isGuest />
  ) : (
    <>
      <GuestStudioHeader />
      <StudioLayout>
        <JoinStudio isHost={false} />
        <MediaSetupScreen />
      </StudioLayout>
    </>
  );
};

export default GuestJoinView;
