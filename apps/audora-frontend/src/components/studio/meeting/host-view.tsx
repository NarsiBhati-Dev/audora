'use client';

import VideoTile from './video-tile';
import InviteModal from './invite-modal';

interface HostViewProps {
  localStream: MediaStream | null;
  cameraOn: boolean;
  micOn: boolean;
}

const HostView = ({ localStream, cameraOn, micOn }: HostViewProps) => {
  return (
    <div className='flex h-[calc(100vh-160px)] w-full flex-col bg-black text-white md:flex-row'>
      {/* Left: Video */}
      <div className='flex aspect-video w-full items-center justify-center p-6 md:w-1/2'>
        <VideoTile
          label='You (Host)'
          stream={localStream}
          isSelf={true}
          borderColor={cameraOn ? 'border-gray-600' : 'border-red-500'}
          camOn={cameraOn}
          micOn={micOn}
        />
      </div>

      {/* Right: Invite Modal */}
      <div className='flex w-full items-center justify-center p-6 md:w-1/2'>
        <div className='w-full max-w-2xl'>
          <InviteModal />
        </div>
      </div>
    </div>
  );
};

export default HostView;
