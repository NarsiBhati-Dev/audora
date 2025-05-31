'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { MdBolt, MdOutlinePlayCircle } from 'react-icons/md';
import Link from 'next/link';
import { AnimatedAvatar } from './animated-avatar';
import { signOut } from 'next-auth/react';

export default function AvatarDropdown({ collapsed = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label='User menu'
        className='focus:outline-none'
      >
        <AnimatedAvatar open={open} />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15 }}
          className={
            collapsed
              ? 'origin-top-center absolute right-0 bottom-full left-[130px] mb-3 w-68 -translate-x-1/2 overflow-hidden rounded-2xl border border-[#2c2c2c] bg-[#1a1a1a] p-4 shadow-xl'
              : 'absolute right-[-10px] bottom-full mb-3 w-64 origin-top-right overflow-hidden rounded-2xl border border-[#2c2c2c] bg-[#1a1a1a] shadow-xl md:right-[-30px]'
          }
        >
          <Link
            href='/dashboard/account/subscription'
            className='m-2 block rounded-lg p-4 hover:bg-zinc-800'
          >
            <p className='text-sm text-gray-400'>Free Plan</p>
            <p className='text-lg font-semibold text-white'>00:00 / 2 hours</p>
          </Link>

          <div className='flex flex-col gap-1 border-t border-zinc-700 p-2'>
            <Link
              href='/upgrade'
              className='flex items-center gap-3 rounded-lg p-2 text-base font-medium text-lime-400 transition hover:bg-zinc-800 hover:text-lime-300'
            >
              <MdBolt className='text-lime-400' size={18} />
              Unlock more features
            </Link>
            <Link
              href='/demo'
              className='flex items-center gap-3 rounded-lg p-2 text-base font-medium text-white transition hover:bg-zinc-800 hover:text-gray-200'
            >
              <MdOutlinePlayCircle size={20} />
              Watch a demo
            </Link>
            <Link
              href='/dashboard/account/settings'
              className='flex items-center gap-3 rounded-lg p-2 text-base font-medium text-white transition hover:bg-zinc-800 hover:text-gray-200'
            >
              <FiUser size={20} />
              Manage account
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className='flex w-full items-center gap-3 rounded-lg p-2 text-left text-base font-medium text-white transition hover:bg-zinc-800 hover:text-red-400'
            >
              <FiLogOut size={18} />
              Log out
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
