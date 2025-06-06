"use client";

import { useEffect, useState } from "react";
import MeetingHeader from "./meeting-header";
import ScreenLayoutWrapper from "./screen-layout-wrapper";
import MeetingControlBar from "./meeting-control-bar";


export default function VideoCallPage() {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(true);

    useEffect(() => {
        (async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            setLocalStream(stream);
        })();
    }, []);

    const toggleMic = () => {
        const track = localStream?.getAudioTracks()[0];
        if (track) {
            track.enabled = !track.enabled;
            setMicOn(track.enabled);
        }
    };

    const toggleCam = () => {
        const track = localStream?.getVideoTracks()[0];
        if (track) {
            track.enabled = !track.enabled;
            setCamOn(track.enabled);
        }
    };

    return (
        <div className="max-h-[calc(100vh-160px)] mt-16  h-full bg-gradient-to-b from-gray-900 to-black text-white flex flex-col transition-all duration-300">
            <MeetingHeader />
            <div className="flex flex-1 relative">
                <ScreenLayoutWrapper />
                <MeetingControlBar />
            </div>
        </div>
    );
}