'use client';

import VideoTile from './VideoTile';
import InviteModal from './invite-modal';

const HostView = ({
  localStream,
  cameraOn,
}: {
  localStream: MediaStream | null;
  cameraOn: boolean;
}) => {
  return (
    <div className='flex h-[calc(100vh-100px)] w-full flex-col bg-black text-white md:flex-row'>
      {/* Host Video Section */}
      <div className='flex flex-1 items-center justify-center p-6'>
        <div
          className='h-full w-full rounded-2xl shadow-xl transition-colors duration-300'
          style={{
            borderColor: cameraOn ? '#4B5563' : '#EF4444',
          }}
        >
          <VideoTile
            label='You (Host)'
            stream={localStream}
            isSelf={true}
            borderColor=''
            camOn={cameraOn}
            micOn={false}
          />
        </div>
      </div>

      {/* Share Meeting Link Panel */}
      <div className='bg-dashboard-bg-darkest my-6 flex h-full w-xl overflow-hidden rounded-2xl'>
        <InviteModal />
      </div>
    </div>
  );
};

export default HostView;
