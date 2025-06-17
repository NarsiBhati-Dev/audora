// 'use client';

// import { useEffect, useState, ReactNode } from 'react';
// import { useMediaDevices } from '@/hooks/useMediaDevices';
// import { useSystemStreamStore } from '@/store/system-stream';
// import { useSignaling } from '@/hooks/webRTC/useSignaling';
// import { useSignalStore } from '@/store/signal-store';
// import { useMeetingStartStore } from '@/store/meeting-start-store';
// import onMessage from '@/utils/onMessage';
// import { Message } from '@audora/types';

// interface StudioProviderProps {
//     studioSlug: string;
//     token: string | null;
//     children: ReactNode;
//     selfId: string;
// }

// export const StudioProvider = ({
//     studioSlug,
//     token,
//     children,
//     selfId,
// }: StudioProviderProps) => {
//     const { setIsMeetingStarted } = useMeetingStartStore();
//     const { setAllSettings } = useSystemStreamStore();
//     const {
//         cameras,
//         microphones,
//         speakers,
//         stream,
//         videoDeviceId,
//         setVideoDeviceId,
//         audioInputId,
//         setAudioInputId,
//         audioOutputId,
//         setAudioOutputId,
//         cameraOn,
//         micOn,
//         toggleCamera,
//         toggleMic,
//         stopCamera,
//         stopMic,
//         loading,
//         error,
//     } = useMediaDevices();

//     if (!token) return <>{children}</>;

//     const { socket, sendMessage } = useSignaling({
//         studioSlug,
//         token: token,
//         onMessage: (message: Message) => onMessage(message, sendMessage, selfId),
//         onClose: () => setIsMeetingStarted(false),
//     });

//     useEffect(() => {
//         if (socket) {
//             useSignalStore.setState({ socket, sendMessage });
//         }
//     }, [socket, sendMessage]);

//     useEffect(() => {
//         setAllSettings({
//             stream,
//             micOn,
//             camOn: cameraOn,
//             cameras,
//             microphones,
//             speakers,
//             videoDeviceId,
//             audioInputId,
//             audioOutputId,
//             setVideoDeviceId,
//             setAudioInputId,
//             setAudioOutputId,
//             setMicToggle: toggleMic,
//             setCamToggle: toggleCamera,
//             setStopCam: stopCamera,
//             setStopMic: stopMic,
//             loading,
//             error,
//             selfId,
//         });
//     }, [
//         stream,
//         micOn,
//         cameraOn,
//         cameras,
//         microphones,
//         speakers,
//         videoDeviceId,
//         audioInputId,
//         audioOutputId,
//         loading,
//         error,
//     ]);

//     return <>{children}</>;
// };
'use client';

import { ReactNode } from 'react';
import { useInitMeeting } from '@/hooks/webRTC/useInitMeeting';

interface StudioProviderProps {
    studioSlug: string;
    token: string | null;
    children: ReactNode;
    selfId: string;
}

export const StudioProvider = ({
    studioSlug,
    token,
    children,
    selfId,
}: StudioProviderProps) => {
    useInitMeeting({ studioSlug, token, selfId });

    return <>{children}</>;
};