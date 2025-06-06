import {
    Mic,
    Video,
    Volume2,
    FileText,
    Upload,
    PhoneOff,
    CircleDot,
} from 'lucide-react';
import MeetingControllerButton from './meeting-controller-button';
import { CameraIcon, MicrophoneIcon } from '@/data/icons';
import LayoutControlPanel from './layout-control-panel';


const MeetingControlBar = () => {
    return (
        <>
            <div className="fixed bottom-6 left-0 right-0 mx-auto bg-black/50 backdrop-blur-md px-8 py-4 rounded-2xl max-w-4xl flex justify-between items-center border border-gray-800/50 shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                        <p className="text-sm text-white font-medium">00:00</p>
                        <span className="text-gray-400">•</span>
                        <p className="text-sm text-white font-medium">00:00</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <MeetingControllerButton label="Record" onToggle={() => { }} active />
                    <MeetingControllerButton label="Mic" onToggle={() => { }} icon={<MicrophoneIcon className='w-6 h-6' />} isOn />
                    <MeetingControllerButton label="Cam" onToggle={() => { }} icon={<CameraIcon className='w-6 h-6' />} isOn />
                    <MeetingControllerButton label="Speaker" onToggle={() => { }} icon={<Volume2 className='w-6 h-6' />} isOn />
                    <MeetingControllerButton label="Share" onToggle={() => { }} icon={<Upload className='w-6 h-6' />} />
                    <MeetingControllerButton label="Leave" onToggle={() => { }} icon={<PhoneOff className='w-5 h-5 text-red-500' />} />
                </div>
                <div className="flex items-center relative">
                    <LayoutControlPanel />
                </div>
            </div>
        </>
    );
};

export default MeetingControlBar;