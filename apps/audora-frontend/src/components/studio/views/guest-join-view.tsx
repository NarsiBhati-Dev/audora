'use client';
import React from 'react';
import GuestStudioHeader from '../guest-studio-header';
import JoinStudio from '../join_meeting/join-studio';
import MediaSetupScreen from '../media/media-setup-screen';
import StudioLayout from '../studio-layout';
import MeetingStart from '../meeting/meeting-start';

interface GuestJoinViewProps {
  isMeetingStarted: boolean;
}

const GuestJoinView = ({ isMeetingStarted }: GuestJoinViewProps) => {
  return isMeetingStarted ? (
    <MeetingStart isGuest={true} />
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
