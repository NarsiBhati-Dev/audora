'use client';

import React from 'react';
import Logo from '@/components/logo';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import { useStudioSettingsStore } from '@/modules/studio/store/studio-settings-store';

const MeetingHeader = () => {
  const { studioSetting } = useStudioSettingsStore();

  return (
    <header className='fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-800/50 bg-black/50 px-6 py-4 backdrop-blur-md'>
      <div className='flex w-full items-center gap-4'>
        <Link
          href='/dashboard'
          className='flex items-center rounded-xl p-2 transition-all duration-200 hover:bg-white/10'
        >
          <FiChevronLeft className='text-zinc-200 hover:text-white' size={22} />
        </Link>
        <Logo
          scrolled={false}
          page={studioSetting.studioName}
          href={`/dashboard`}
        />
      </div>
      {/* <div className='flex items-center gap-4'>
        <button className='flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-white transition-all duration-200 hover:bg-white/20'>
          <FiSettings className='text-zinc-200' size={18} />
          <span className='text-sm'>Settings</span>
        </button>
      </div> */}
    </header>
  );
};

export default MeetingHeader;
