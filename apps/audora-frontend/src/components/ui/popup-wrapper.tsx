'use client';

import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useRef } from 'react';

type PopupWrapperProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function PopupWrapper({
  open,
  onClose,
  children,
}: PopupWrapperProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className='fixed inset-0 z-40 bg-black/50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={onClose}
          >
            <div
              ref={modalRef}
              onClick={e => e.stopPropagation()}
              className='relative w-full max-w-md rounded-xl bg-zinc-900 p-6 text-white shadow-xl'
            >
              <button
                onClick={onClose}
                className='absolute top-3 right-3 rounded-full bg-zinc-800 p-1 text-zinc-400 transition hover:text-white'
              >
                <X size={16} />
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
