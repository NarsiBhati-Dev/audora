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
    <div className='flex flex-col items-center gap-1'>
      <button
        onClick={onToggle}
        className={clsx(
          'flex items-center justify-center font-medium transition-all duration-200',
          {
            'h-12 w-26 rounded-xl bg-red-500 text-white hover:bg-red-600':
              isRecord,
            'h-14 w-14 rounded-full px-4 py-2 text-white': !isRecord,
            'bg-white/10 hover:bg-white/20': active || isOn,
            'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white':
              !active && !isOn,
          },
          className,
        )}
      >
        {icon}
        {isRecord && <span className='ml-2 text-sm'>Record</span>}
      </button>
      {!isRecord && <span className='text-xs text-white/70'>{label}</span>}
      {isRecord && <span className='text-xs text-white/60'>Start</span>}
    </div>
  );
};

export default MeetingControllerButton;
