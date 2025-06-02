'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <div className='bg-studio-bg-light flex h-screen w-full flex-col items-center justify-center'>
      <div className='w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Welcome to Audora Studio
          </h1>
          <p className='mt-2 text-gray-600'>
            Your professional recording studio is ready to use.
          </p>
        </div>

        <div className='mt-8 space-y-4'>
          <button
            className='bg-primary-500 hover:bg-primary-600 w-full rounded-lg px-4 py-2 text-white'
            onClick={() => router.push('/dashboard')}
          >
            Go to Dashboard
          </button>
          <button
            className='w-full rounded-lg bg-zinc-100 px-4 py-2 text-zinc-900 hover:bg-zinc-200'
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
