import React from 'react';

interface MeetingControllerButtonProps {
    onToggle: () => void;
    label: string;
    isOn?: boolean; // optional, for buttons like 'Share' or 'Leave'
    icon?: React.ReactNode;
    active?: boolean; // highlight state, e.g., for Record
}

const MeetingControllerButton = ({
    onToggle,
    isOn,
    icon,
    label,
    active = false,
}: MeetingControllerButtonProps) => {
    return (
        <div className="flex flex-col items-center gap-1.5">
            <button
                onClick={onToggle}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200
                    ${active
                        ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20'
                        : isOn
                            ? 'bg-white/10 hover:bg-white/20 text-white'
                            : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                    }`}
            >
                {icon}
            </button>
            <p className="text-xs text-gray-400 font-medium">{label}{typeof isOn === 'boolean' ? ` ${isOn ? 'On' : 'Off'}` : ''}</p>
        </div>
    );
};

export default MeetingControllerButton;