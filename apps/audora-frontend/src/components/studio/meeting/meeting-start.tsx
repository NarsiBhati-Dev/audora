import ScreenLayoutWrapper from './screen-layout-wrapper';
import MeetingHeader from './meeting-header';
import MeetingControlBar from './meeting-control-bar';

interface MeetingStartProps {
    isGuest?: boolean;
}

const MeetingStart = ({ isGuest = false }: MeetingStartProps) => {
    return (
        <div className="h-[calc(100vh-4rem)] mt-16 flex flex-col bg-black text-white">
            {/* Header */}
            <div className="shrink-0">
                <MeetingHeader />
            </div>

            {/* Middle content */}
            <div className="flex-1 overflow-hidden">
                <ScreenLayoutWrapper />
            </div>

            {/* Footer */}
            <div className="shrink-0">
                <MeetingControlBar isGuest={isGuest} />
            </div>
        </div>
    );
}

export default MeetingStart;