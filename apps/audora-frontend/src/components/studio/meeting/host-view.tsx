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
        <div className="flex flex-col md:flex-row w-full h-full bg-black text-white">
            {/* Host Video Section */}
            <div className="flex-1 flex items-center  justify-center p-6">
                <div className="w-full h-full rounded-2xl  border-3 border-primary-500 transition-colors duration-300 shadow-xl"
                    style={{
                        borderColor: cameraOn ? '#4B5563' : '#EF4444',
                    }}>
                    <VideoTile
                        label="You (Host)"
                        stream={localStream}
                        isSelf={true}
                        borderColor=""
                    />
                </div>
            </div>

            {/* Share Meeting Link Panel */}
            <div className="flex  bg-dashboard-bg-darkest  p-6">
                <InviteModal onClose={() => { }} />
            </div>
        </div>
    );
};

export default HostView;