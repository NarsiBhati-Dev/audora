'use client';

import ScreenLayoutWrapper from './screen-layout-wrapper';
import MeetingHeader from './meeting-header';
import MeetingControlBar from './meeting-control-bar';

interface MeetingStartProps {
  isGuest: boolean;
}

const MeetingStart = ({ isGuest }: MeetingStartProps) => {
  return (
    <div className="flex h-screen w-full flex-col bg-black text-white">
      <MeetingHeader />

      <div className="max-h-[calc(100vh-6rem)] my-auto">
        <ScreenLayoutWrapper isGuest={isGuest} />
      </div>

      <MeetingControlBar isGuest={isGuest} />
    </div>
  );
};

export default MeetingStart;