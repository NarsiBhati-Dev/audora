'use client';

import { useStudioSettingsStore } from '@/store/studio-setting-store';
import React, { useState } from 'react';
import { JoinStudioButton } from './join-studio-button';

interface JoinStudioProps {
  isHost: boolean;
  hostName: string;
}

const JoinStudio = ({ isHost, hostName }: JoinStudioProps) => {
  const [isUsingHeadphones, setIsUsingHeadphones] = useState(false);
  const [guestName, setGuestName] = useState('');
  const { studioSetting } = useStudioSettingsStore();

  return (
    <div className='mx-auto w-full max-w-lg px-4 sm:px-6'>
      <div className='flex flex-col gap-4'>
        <p className='text-sm text-zinc-400'>
          {`You're about to join`}{' '}
          <span className='font-medium text-white'>{studioSetting.name}</span>
        </p>

        <h1 className='text-2xl font-bold text-white'>
          {`Let's check your cam and mic`}
        </h1>

        <div className='space-y-2'>
          <div className='relative w-full'>
            {isHost ? (
              <>
                <input
                  type='text'
                  value={hostName}
                  readOnly
                  className='focus:ring-primary-500 w-full rounded-lg bg-zinc-800 px-4 py-3 pr-20 text-sm font-medium text-white outline-none focus:ring-1 focus:ring-offset-0'
                />
                <div className='absolute top-1/2 right-3 -translate-y-1/2 rounded-md bg-zinc-700 px-3 py-1.5 text-sm font-medium text-white/50'>
                  Host
                </div>
              </>
            ) : (
              <>
                <input
                  type='text'
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  placeholder='Enter your name'
                  className='focus:ring-primary-500 w-full rounded-lg bg-zinc-800 px-4 py-3 pr-20 text-sm font-medium text-white outline-none focus:ring-1 focus:ring-offset-0'
                />
                <div className='absolute top-1/2 right-3 -translate-y-1/2 rounded-md bg-zinc-700 px-3 py-1.5 text-sm font-medium text-white/50'>
                  Guest
                </div>
              </>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-2 sm:flex-row'>
          <button
            className={`w-full flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition ${!isUsingHeadphones ? 'bg-primary-400 hover:bg-primary-500' : 'bg-zinc-700 hover:bg-zinc-800'}`}
            onClick={() => setIsUsingHeadphones(false)}
          >
            I am not using headphones
          </button>
          <button
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition ${isUsingHeadphones ? 'bg-primary-400 hover:bg-primary-500' : 'bg-zinc-700 hover:bg-zinc-800'}`}
            onClick={() => setIsUsingHeadphones(true)}
          >
            I am using headphones
          </button>
        </div>

        <JoinStudioButton />

        <p className='text-center text-sm text-zinc-400'>
          {isHost ? (
            <>
              You are joining as a host.{' '}
              <span className='text-primary-400 hover:text-primary-300 cursor-pointer font-medium'>
                Join as a producer
              </span>
            </>
          ) : (
            'You are joining as a guest'
          )}
        </p>
      </div>
    </div>
  );
};

export default JoinStudio;
