import React from 'react';

const MobileFallback = () => {
  return (
    <div className='mx-auto flex h-[calc(100vh-80px)] max-w-md flex-col items-center justify-center gap-6 px-6 text-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-12 w-12 text-zinc-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <p className='text-base font-medium text-zinc-500'>
          This app isn’t available on mobile yet.
        </p>
        <p className='text-sm text-zinc-400'>
          Please use a desktop browser for the best experience.
        </p>
      </div>
    </div>
  );
};

export default MobileFallback;
