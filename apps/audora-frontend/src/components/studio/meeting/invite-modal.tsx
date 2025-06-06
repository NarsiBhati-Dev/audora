'use client';

import { useState } from 'react';
import { FiShare2 } from 'react-icons/fi';
import { X } from 'lucide-react';

const InviteModal = ({ onClose }: { onClose: () => void }) => {
    const [copied, setCopied] = useState(false);
    const [role, setRole] = useState('Guest');
    const meetingLink = 'https://riverside.fm/studio/sss-lJ0...';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(meetingLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-dashboard-bg-darkest max-w-5xl mx-auto flex justify-center items-center  px-4 h-full">
            <div className="relative w-full max-w-5xl bg-dashboard-bg-darkest text-white rounded-2xl p-6 shadow-xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center mb-1">Invite People</h2>
                <p className="text-sm text-gray-400 text-center mb-6">
                    Share this link to invite people to your studio.
                </p>

                {/* Meeting Link + Role */}
                <div className="space-y-3 mb-4">
                    <input
                        type="text"
                        readOnly
                        value={meetingLink}
                        className="w-full px-4 py-2 rounded-lg bg-[#1e1e24] text-sm border border-[#2d2d34] truncate"
                    />

                    <div
                        className="w-full flex items-center bg-dashboard-bg justify-center px-4 py-2 rounded-lg text-sm border border-[#2d2d34] appearance-none"
                    >
                        Guest
                    </div>

                    <button
                        onClick={copyToClipboard}
                        className="w-full px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 rounded-lg transition"
                    >
                        Copy Link
                    </button>
                </div>

                {copied && (
                    <p className="text-green-400 text-sm text-center">Copied to clipboard!</p>
                )}
            </div>
        </div>
    );
};

export default InviteModal;