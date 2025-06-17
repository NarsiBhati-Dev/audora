'use client';

import React from 'react';
import Logo from '../logo';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';
import { useStudioSettingsStore } from '@/store/studio-setting-store';

const StudioHeader = () => {
  const { studioSetting } = useStudioSettingsStore();

  return (
    <header className='bg-studio-bg-light fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4'>
      <div className='flex items-center gap-3'>
        <Link
          href='/dashboard'
          className='flex items-center rounded-lg p-1.5 hover:bg-zinc-800'
        >
          <FiChevronLeft className='text-zinc-200' size={22} />
        </Link>
        <Logo
          scrolled={false}
          page={studioSetting.studioName}
          href={`/studio/${studioSetting.studioSlug}`}
        />
      </div>
    </header>
  );
};

export default StudioHeader;
