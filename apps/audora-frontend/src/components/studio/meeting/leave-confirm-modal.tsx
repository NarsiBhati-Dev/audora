'use client';

import { useEffect, useRef } from 'react';

export interface LeaveConfirmModalProps {
    isHost: boolean;
    onCancel: () => void;
    onLeave: () => void;
    onEndMeeting: () => void;
}

export default function LeaveConfirmModal({
    isHost,
    onCancel,
    onLeave,
    onEndMeeting,
}: LeaveConfirmModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onCancel();
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onCancel();
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onCancel]);

    const handleLeave = () => {
        onLeave();
        onCancel();
    };

    const handleEndMeeting = () => {
        onEndMeeting();
        onCancel();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div
                ref={modalRef}
                className="w-full max-w-md rounded-2xl p-6 bg-dashboard-bg-darkest border border-white/10 shadow-2xl text-white animate-fadeIn space-y-4"
            >
                <h2 className="text-xl font-semibold tracking-tight">Leave Meeting</h2>
                <p className="text-sm text-gray-300 leading-relaxed">
                    {isHost
                        ? 'You are the host. Do you want to leave or end the meeting for everyone?'
                        : 'Are you sure you want to leave the meeting?'}
                </p>
                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLeave}
                        className="px-4 py-2 rounded-lg bg-red-500/20 text-white hover:bg-red-500/40 transition"
                    >
                        Leave
                    </button>
                    {isHost && (
                        <button
                            onClick={handleEndMeeting}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            <span className="text-sm">End for All</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}