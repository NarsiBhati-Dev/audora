'use client';

import {
    Volume2,
    Upload,
    PhoneOff,
    VideoIcon,
} from 'lucide-react';
import MeetingControllerButton from './meeting-controller-button';
import {
    CameraIcon,
    MicrophoneIcon,
    MicrophoneOffIcon,
    CameraOffIcon,
} from '@/data/icons';
import LayoutControlPanel from './layout-control-panel';
import { useRouter } from 'next/navigation';
import { useSystemStreamStore } from '@/store/system-stream';

const MeetingControlBar = ({ isGuest = false }) => {
    const router = useRouter();
    const {
        micOn,
        camOn,
        setMicToggle,
        setCamToggle,
    } = useSystemStreamStore();

    const handleLeave = () => {
        // Stop all media tracks
        const tracks = document.querySelectorAll('video, audio');
        tracks.forEach(track => {
            if (track instanceof HTMLMediaElement) {
                track.srcObject = null;
            }
        });

        router.push('/');
    };

    return (
        <div className="fixed bottom-1.5 left-0 right-0 mx-auto w-full max-w-4xl flex justify-between items-center">
            <div className="flex w-full justify-center items-center gap-6">
                <MeetingControllerButton
                    icon={<VideoIcon className="w-5 h-5" />}
                    label="Record"
                    className="text-white"
                    onToggle={() => { }}
                    active
                    type="record"
                    isGuest={isGuest}
                />
                <MeetingControllerButton
                    label="Mic"
                    onToggle={() => setMicToggle(!micOn)}
                    icon={
                        micOn
                            ? <MicrophoneIcon className="w-5 h-5" />
                            : <MicrophoneOffIcon className="w-5 h-5 text-red-500" />
                    }
                    isOn={micOn}
                    type="microphone"
                />
                <MeetingControllerButton
                    label="Cam"
                    onToggle={() => setCamToggle(!camOn)}
                    icon={
                        camOn
                            ? <CameraIcon className="w-5 h-5" />
                            : <CameraOffIcon className="w-5 h-5 text-red-500" />
                    }
                    isOn={camOn}
                    type="camera"
                />
                <MeetingControllerButton
                    label="Speaker"
                    onToggle={() => { }}
                    icon={<Volume2 className="w-5 h-5" />}
                    isOn
                />

                {/* <MeetingControllerButton
                    label="Share"
                    onToggle={() => { }}
                    icon={<Upload className="w-5 h-5" />}
                /> */}
                <MeetingControllerButton
                    label="Leave"
                    onToggle={handleLeave}
                    icon={<PhoneOff className="w-5 h-5 text-red-500" />}
                />
            </div>
            <div className="flex items-center relative">
                <LayoutControlPanel />
            </div>
        </div>
    );
};

export default MeetingControlBar;