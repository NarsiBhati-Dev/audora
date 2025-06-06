'use client';
import { useState } from 'react';
import { FiShare2 } from 'react-icons/fi';
import VideoTile from './VideoTile';

const HostView = ({
    localStream,
    cameraOn,
}: {
    localStream: MediaStream | null;
    cameraOn: boolean;
}) => {
    const [copied, setCopied] = useState(false);
    const meetingLink = typeof window !== 'undefined' ? window.location.href : '';

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(meetingLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-full bg-black text-white">
            {/* Host Video Section */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border-4 transition-colors duration-300 shadow-xl"
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
            <div className="w-full md:w-1/3 bg-[#090c11] p-8 flex flex-col justify-center items-center gap-4  shadow-inner">
                <h3 className="text-2xl font-bold">Invite People</h3>
                <p className="text-sm text-gray-400 text-center">
                    Share this link to invite people to your studio.
                </p>

                <div className="w-full flex items-center gap-2">
                    <input
                        type="text"
                        value={meetingLink}
                        readOnly
                        className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-sm text-white border border-gray-600"
                    />
                    <button
                        onClick={copyToClipboard}
                        className="p-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition"
                        title="Copy to clipboard"
                    >
                        <FiShare2 className="w-5 h-5" />
                    </button>
                </div>

                {copied && (
                    <p className="text-green-400 text-sm transition-opacity duration-200">
                        Copied to clipboard!
                    </p>
                )}
            </div>
        </div>
    );
};

export default HostView;