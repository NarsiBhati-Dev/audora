'use client';

import React from 'react';
import Logo from '../logo';
import { useStudioSettingsStore } from '@/store/studio-setting-store';

const GuestStudioHeader = () => {
  const { studioSetting } = useStudioSettingsStore();
  return (
    <header className='bg-studio-bg-light fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-5'>
      <div className='flex items-center gap-3'>
        <Logo scrolled={false} page={studioSetting.name} href={``} />
      </div>
    </header>
  );
};

export default GuestStudioHeader;
