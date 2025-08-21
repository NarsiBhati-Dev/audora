'use client';

import ScreenLayoutWrapper from './screen-layout-wrapper';
import MeetingHeader from './meeting-header';
import MeetingControlBar from './meeting-control-bar';
import { CountdownTimer } from './recording/countdown-timer';
import { useRecordingStore } from '@/store/recording-store';

interface MeetingStartProps {
  isGuest: boolean;
}

const MeetingStart = ({ isGuest }: MeetingStartProps) => {
  const { isCountdownActive, countdownValue, onCountdownComplete } = useRecordingStore();

  return (
    <div className='flex h-screen w-full flex-col bg-black text-white'>
      <MeetingHeader />

      <div className='flex-1 pt-16 pb-24'>
        <ScreenLayoutWrapper isGuest={isGuest} />
      </div>

      <MeetingControlBar isGuest={isGuest} />

      <CountdownTimer
        countdown={countdownValue}
        isVisible={isCountdownActive}
        onComplete={onCountdownComplete}
      />
    </div>
  );
};

export default MeetingStart;
