'use client';

import JoinStudio from '@/components/studio/join-studio';
import MediaSetupScreen from '@/components/studio/media-setup-screen';
import MobileFallback from '@/components/studio/mobile-fallback';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import React from 'react';

const StudioPage = () => {
  const isDesktop = useIsDesktop();

  return (
    <>
      {isDesktop ? (
        <div className='mx-auto mt-16 h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center gap-10 px-4 md:flex md:flex-col md:gap-12 lg:flex-row'>
          <JoinStudio />
          <MediaSetupScreen />
        </div>
      ) : (
        <MobileFallback />
      )}
    </>
  );
};

export default StudioPage;
