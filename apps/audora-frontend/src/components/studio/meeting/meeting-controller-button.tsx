import React from 'react';
import clsx from 'clsx';

interface MeetingControllerButtonProps {
    onToggle: () => void;
    label: string;
    icon: React.ReactNode;
    showState?: boolean;
    isOn?: boolean;
    active?: boolean;
    className?: string;
    type?: 'camera' | 'microphone' | 'record';
    isGuest?: boolean;
}

const MeetingControllerButton = ({
    onToggle,
    label,
    icon,
    isOn,
    active = false,
    className,
    type,
    isGuest = false,
}: MeetingControllerButtonProps) => {
    if (type === 'record' && isGuest) return null;

    const isRecord = type === 'record';

    return (
        <div className="flex flex-col items-center gap-1">
            <button
                onClick={onToggle}
                className={clsx(
                    'flex items-center justify-center transition-all duration-200 font-medium',
                    {
                        'w-26 h-12 rounded-xl bg-red-500 text-white hover:bg-red-600': isRecord,
                        'w-14 h-14 rounded-full text-white px-4 py-2': !isRecord,
                        'bg-white/10 hover:bg-white/20': active || isOn,
                        'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10': !active && !isOn,
                    },
                    className
                )}
            >
                {icon}
                {isRecord && <span className="ml-2 text-sm">Record</span>}
            </button>
            {!isRecord && <span className="text-xs text-white/70">{label}</span>}
            {isRecord && <span className="text-xs text-white/60">Start</span>}
        </div>
    );
};

export default MeetingControllerButton;