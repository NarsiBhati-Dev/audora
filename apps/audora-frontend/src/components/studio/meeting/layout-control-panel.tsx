'use client';

import { useState, useEffect, useRef } from 'react';
import {
  GridLayoutIcon,
  ScreenFillIcon,
  ScreenFitIcon,
  // SpeakerFullIcon,
  SpeakerSplitIcon,
} from '@/data/icons';
import { useLayoutStore } from '@/store/layout-store';
import { motion, AnimatePresence } from 'framer-motion';

export default function LayoutControlPanel() {
  const { layout, setLayout, fitMode, setFitMode } = useLayoutStore();
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
      if (event.key === '1') setLayout('grid');
      // if (event.key === '2') setLayout('speaker-full');
      if (event.key === '2') setLayout('speaker-split');
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 bottom-16 w-80 space-y-4 rounded-xl border border-dashboard-bg-light bg-dashboard-bg-darkest p-4 text-white shadow-2xl backdrop-blur-md pointer-events-auto z-50"
          >
            <div className="space-y-2">
              <button
                onClick={() => setLayout('grid')}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 transition-all duration-200 hover:bg-white/10 cursor-pointer ${layout === 'grid' ? 'bg-white/10 text-primary-500' : 'text-gray-400 hover:text-primary-500'
                  }`}
              >
                <span className="flex items-center gap-3">
                  <GridLayoutIcon className="h-5 w-5" />
                  Grid
                </span>
                <kbd className="rounded bg-white/10 px-2 py-1 text-xs">1</kbd>
              </button>

              {/* <button
                onClick={() => setLayout('speaker-full')}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 transition-all duration-200 hover:bg-white/10 cursor-pointer ${layout === 'speaker-full' ? 'bg-white/10 text-white' : 'text-gray-400'
                  }`}
              >
                <span className="flex items-center gap-3">
                  <SpeakerFullIcon className="h-5 w-5" />
                  Speaker full screen
                </span>
                <kbd className="rounded bg-white/10 px-2 py-1 text-xs">2</kbd>
              </button> */}

              <button
                onClick={() => setLayout('speaker-split')}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 transition-all duration-200 hover:bg-white/10 cursor-pointer ${layout === 'speaker-split' ? 'bg-white/10 text-primary-500' : 'text-gray-400 hover:text-white'
                  }`}
              >
                <span className="flex items-center gap-3">
                  <SpeakerSplitIcon className="h-5 w-5" />
                  Speaker split screen
                </span>
                <kbd className="rounded bg-white/10 px-2 py-1 text-xs">2</kbd>
              </button>
            </div>

            <div className="flex justify-around border-t border-gray-800/50 pt-3">
              <button
                onClick={() => setFitMode('fill')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 cursor-pointer ${fitMode === 'fill' ? 'bg-white/10 text-primary-500' : 'text-gray-500 hover:text-primary-500'
                  }`}
              >
                <ScreenFillIcon className="h-5 w-5" />
                Fill
              </button>

              <button
                onClick={() => setFitMode('fit')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 cursor-pointer ${fitMode === 'fit' ? 'bg-white/10 text-primary-500' : 'text-gray-500 hover:text-primary-500'
                  }`}
              >
                <ScreenFitIcon className="h-5 w-5" />
                Fit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer rounded-lg p-2 transition-all duration-200 hover:bg-white/10 z-50"
      >
        {layout === 'grid' && <GridLayoutIcon className="h-6 w-6" />}
        {/* {layout === 'speaker-full' && <SpeakerFullIcon className="h-6 w-6" />} */}
        {layout === 'speaker-split' && <SpeakerSplitIcon className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}