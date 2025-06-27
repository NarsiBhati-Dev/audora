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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
      <div
        ref={modalRef}
        className='bg-dashboard-bg-darkest animate-fadeIn w-full max-w-md space-y-4 rounded-2xl border border-white/10 p-6 text-white shadow-2xl'
      >
        <h2 className='text-xl font-semibold tracking-tight'>Leave Meeting</h2>
        <p className='text-sm leading-relaxed text-gray-300'>
          {isHost
            ? 'You are the host. Do you want to leave or end the meeting for everyone?'
            : 'Are you sure you want to leave the meeting?'}
        </p>
        <div className='flex justify-end gap-3 pt-4'>
          <button
            onClick={onCancel}
            className='rounded-lg bg-white/10 px-4 py-2 text-gray-300 transition hover:bg-white/20'
          >
            Cancel
          </button>
          <button
            onClick={handleLeave}
            className='rounded-lg bg-red-500/20 px-4 py-2 text-white transition hover:bg-red-500/40'
          >
            Leave
          </button>
          {isHost && (
            <button
              onClick={handleEndMeeting}
              className='rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700'
            >
              <span className='text-sm'>End for All</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
