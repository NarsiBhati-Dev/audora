'use client';

import GuestJoinView from './guest-join-view';
import HostStudioView from './host-studio-view';
import MobileFallback from './mobile-fallback';

interface StudioRoleViewProps {
  isGuestJoining: boolean;
  isHost: boolean;
  hostName: string | undefined;
  isDesktop: boolean;
  isMeetingStarted: boolean;
}

const StudioRoleView = ({
  isGuestJoining,
  isHost,
  hostName,
  isDesktop,
  isMeetingStarted,
}: StudioRoleViewProps) => {


  if (!isDesktop) return <MobileFallback />;

  if (isGuestJoining)
    return (
      <GuestJoinView
        isMeetingStarted={isMeetingStarted}
      />
    );

  if (isHost)
    return (
      <HostStudioView
        hostName={hostName}
        isDesktop={isDesktop}
        isMeetingStarted={isMeetingStarted}
      />
    );

  return null;
};

export default StudioRoleView;
