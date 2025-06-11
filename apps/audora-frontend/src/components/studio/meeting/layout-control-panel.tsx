'use client';

import { useState, useEffect, useRef } from 'react';
import {
  GridLayoutIcon,
  ScreenFillIcon,
  ScreenFitIcon,
  SpeakerFullIcon,
  SpeakerSplitIcon,
} from '@/data/icons';
import { useMeetingStore } from '@/store/meeting-store';

export default function LayoutControlPanel() {
  const { layout, setLayout, fitMode, setFitMode } = useMeetingStore();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === '1') {
        setLayout('grid');
      } else if (event.key === '2') {
        setLayout('speaker-full');
      } else if (event.key === '3') {
        setLayout('speaker-split');
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          ref={panelRef}
          className='bg-dashboard-bg-darkest border-dashboard-bg-light animate-slideUp absolute right-0 bottom-14 w-80 space-y-4 rounded-xl border p-4 text-white shadow-2xl backdrop-blur-md'
        >
          <div className='space-y-2'>
            <button
              onClick={() => setLayout('grid')}
              className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 transition-all duration-200 hover:bg-white/10 ${
                layout === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400'
              }`}
            >
              <span className='flex items-center gap-3'>
                <GridLayoutIcon className='h-5 w-5' /> Grid
              </span>
              <kbd className='rounded bg-white/10 px-2 py-1 text-xs'>1</kbd>
            </button>
            <button
              onClick={() => setLayout('speaker-full')}
              className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 transition-all duration-200 hover:bg-white/10 ${
                layout === 'speaker-full'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400'
              }`}
            >
              <span className='flex items-center gap-3'>
                <SpeakerFullIcon className='h-5 w-5' /> Speaker full screen
              </span>
              <kbd className='rounded bg-white/10 px-2 py-1 text-xs'>2</kbd>
            </button>
            <button
              onClick={() => setLayout('speaker-split')}
              className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 transition-all duration-200 hover:bg-white/10 ${
                layout === 'speaker-split'
                  ? 'bg-white/10 text-purple-400'
                  : 'text-gray-400'
              }`}
            >
              <span className='flex items-center gap-3'>
                <SpeakerSplitIcon className='h-5 w-5' /> Speaker split screen
              </span>
              <kbd className='rounded bg-white/10 px-2 py-1 text-xs'>3</kbd>
            </button>
          </div>

          <div className='flex justify-around border-t border-gray-800/50 pt-3'>
            <button
              onClick={() => setFitMode('fill')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 ${
                fitMode === 'fill'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <ScreenFillIcon className='h-5 w-5' />
              <span>Fill</span>
            </button>
            <button
              onClick={() => setFitMode('fit')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 ${
                fitMode === 'fit'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <ScreenFitIcon className='h-5 w-5' /> Fit
            </button>
          </div>
        </div>
      )}
      <button
        ref={buttonRef}
        className='rounded-lg p-2 transition-all duration-200 hover:bg-white/10'
        onClick={() => setIsOpen(!isOpen)}
      >
        {layout === 'grid' && <GridLayoutIcon className='h-6 w-6' />}
        {layout === 'speaker-full' && <SpeakerFullIcon className='h-6 w-6' />}
        {layout === 'speaker-split' && <SpeakerSplitIcon className='h-6 w-6' />}
      </button>
    </>
  );
}
