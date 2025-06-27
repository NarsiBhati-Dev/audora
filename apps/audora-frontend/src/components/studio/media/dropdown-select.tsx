import { HiCheck, HiOutlineChevronDown } from 'react-icons/hi';
import { CameraOffIcon, MicrophoneOffIcon, MicrophoneIcon } from '@/data/icons';
import { CameraIcon } from '@/data/icons';
import { SpeakerIcon } from '@/data/icons';
import { useState, useEffect, useRef } from 'react';

interface Props {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  iconType?: 'mic' | 'camera' | 'speaker';
  disabled?: boolean;
}

export default function DropdownSelect({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  iconType,
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find(opt => opt.value === value);

  const getIcon = () => {
    const baseClass = 'h-5 w-5 min-w-[1.25rem] min-h-[1.25rem]';
    const colorClass = disabled ? 'text-red-500' : 'text-white';
    const iconClass = `${baseClass} ${colorClass}`;

    if (iconType === 'mic')
      return disabled ? (
        <MicrophoneOffIcon className={iconClass} />
      ) : (
        <MicrophoneIcon className={iconClass} />
      );
    if (iconType === 'camera')
      return disabled ? (
        <CameraOffIcon className={iconClass} />
      ) : (
        <CameraIcon className={iconClass} />
      );
    if (iconType === 'speaker') return <SpeakerIcon className={iconClass} />;
    return null;
  };

  return (
    <div className='relative w-full text-sm font-semibold' ref={containerRef}>
      <button
        type='button'
        disabled={disabled}
        className={`flex w-full items-center justify-between rounded-lg bg-zinc-800 px-4 py-3 text-left transition-all duration-150 ${
          disabled ? 'cursor-not-allowed text-red-500' : 'hover:border-zinc-600'
        }`}
        onClick={() => {
          if (!disabled) setOpen(prev => !prev);
        }}
      >
        <span className='flex w-full items-center gap-2'>
          <span className='shrink-0'>{getIcon()}</span>
          <span className='w-58 truncate overflow-hidden whitespace-nowrap'>
            {selected
              ? selected.label.replace(/^default\s*-\s*/i, '')
              : placeholder}
          </span>
        </span>
        <HiOutlineChevronDown
          className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && !disabled && (
        <div
          role='listbox'
          className='absolute z-40 mt-2 max-h-64 w-full overflow-y-auto rounded-lg bg-zinc-800 p-2 shadow-xl'
          style={{ scrollbarWidth: 'none' }}
        >
          {options.map(option => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                type='button'
                role='option'
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-3 text-left hover:bg-zinc-700 ${
                  isSelected ? 'bg-zinc-800' : ''
                }`}
              >
                <span className='flex w-62 items-center gap-2'>
                  <span className='shrink-0'>{getIcon()}</span>
                  <span className='truncate overflow-hidden text-ellipsis whitespace-nowrap'>
                    {option.label.replace(/^default\s*-\s*/i, '')}
                  </span>
                </span>
                {isSelected && <HiCheck className='h-5 w-6 text-white' />}
              </button>
            );
          })}
          <div className='mt-2 flex h-6 w-full items-center justify-center border-t border-zinc-700'>
            <p className='font-bold text-zinc-400'>Audora.xyz</p>
          </div>
        </div>
      )}
    </div>
  );
}
