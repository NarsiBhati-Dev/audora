import { useEffect } from 'react';
import { useMediaDevices } from '@/hooks/useMediaDevices'
import { useSystemStreamStore } from '@/store/system-stream';
import { renderGuestJoining, renderHostView } from './render-view';

interface GuestHostRenderProps {
    isGuestJoining: boolean;
    isHost: boolean;
    hostName: string | undefined;
    isDesktop: boolean;
    isMeetingStarted: boolean;
}

const GuestHostRender = ({
    isGuestJoining,
    isHost,
    hostName,
    isDesktop,
    isMeetingStarted,
}: GuestHostRenderProps) => {
    const { setAllSettings } = useSystemStreamStore();
    const {
        cameras,
        microphones,
        speakers,
        stream,
        videoDeviceId,
        setVideoDeviceId,
        audioInputId,
        setAudioInputId,
        audioOutputId,
        setAudioOutputId,
        cameraOn,
        micOn,
        toggleCamera,
        toggleMic,
        stopCamera,
        stopMic,
        loading,
        error,
    } = useMediaDevices();

    useEffect(() => {
        setAllSettings({
            stream: stream,
            micOn: micOn,
            camOn: cameraOn,
            cameras: cameras,
            microphones: microphones,
            speakers: speakers,
            videoDeviceId: videoDeviceId,
            audioInputId: audioInputId,
            audioOutputId: audioOutputId,
            setVideoDeviceId: setVideoDeviceId,
            setAudioInputId: setAudioInputId,
            setAudioOutputId: setAudioOutputId,
            setMicToggle: toggleMic,
            setCamToggle: toggleCamera,
            setStopCam: stopCamera,
            setStopMic: stopMic,
            loading: loading,
            error: error,
        });
    }, [
        stream,
        micOn,
        cameraOn,
        cameras,
        microphones,
        speakers,
        videoDeviceId,
        audioInputId,
        audioOutputId,
        loading,
        error
    ]);

    // If guest token is present, show join as guest screen
    if (isGuestJoining) return renderGuestJoining(isMeetingStarted);

    // If host token is present, show host view
    if (isHost) return renderHostView(hostName, isDesktop, isMeetingStarted);

    return null;
}

export default GuestHostRender