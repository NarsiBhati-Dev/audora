import ScreenLayoutWrapper from './screen-layout-wrapper';
import MeetingHeader from './meeting-header';
import MeetingControlBar from './meeting-control-bar';

interface MeetingStartProps {
  isGuest: boolean;
}

const MeetingStart = ({ isGuest }: MeetingStartProps) => {
  return (
    <div className='mt-16 flex h-[calc(100vh-4rem)] flex-col bg-black text-white'>
      {/* Header */}
      <div className='shrink-0'>
        <MeetingHeader />
      </div>

      {/* Middle content */}
      <div className='flex-1 overflow-hidden'>
        <ScreenLayoutWrapper isGuest={isGuest} />
      </div>

      {/* Footer */}
      <div className='shrink-0'>
        <MeetingControlBar isGuest={isGuest} />
      </div>
    </div>
  );
};

export default MeetingStart;
