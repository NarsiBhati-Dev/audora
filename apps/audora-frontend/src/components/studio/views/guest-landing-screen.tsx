'use client';

import React from 'react';
import GuestStudioHeader from '../guest-studio-header';
import { useStudioSettingsStore } from '@/store/studio-setting-store';
import Link from 'next/link';
import { JoinSessionButton } from '../join_meeting/join-session-button';

const GuestLandingScreen = () => {
  const { studioSetting } = useStudioSettingsStore();

  return (
    <>
      <GuestStudioHeader />
      <main className='flex h-[calc(100vh)] w-full flex-col items-center justify-center'>
        <div className='h-full w-full rounded-lg p-8 shadow-lg md:h-auto md:w-auto'>
          <div className='space-y-6 text-center'>
            <p className='text-6xl text-zinc-400'>👋</p>
            <h1 className='text-3xl font-bold text-white'>
              Welcome to {studioSetting.studioName}
            </h1>
            <p className='text-sm text-zinc-400'>
              {`You're about to join a recording session on Audora.`}
              <br />
              {`Have a great time!`}
            </p>
            <JoinSessionButton studioSlug={studioSetting.studioSlug} />
          </div>
        </div>
      </main>
      <footer className='bg-studio-bg-light fixed right-0 bottom-0 left-0 p-4'>
        <div className='mx-auto max-w-6xl'>
          <p className='text-center text-sm font-medium text-zinc-300'>
            By continuing, you agree to our{' '}
            <Link
              href='/terms-conditions'
              className='text-primary-300 underline'
            >
              Terms
            </Link>{' '}
            and{' '}
            <Link href='/privacy-policy' className='text-primary-300 underline'>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </footer>
    </>
  );
};

export default GuestLandingScreen; 
