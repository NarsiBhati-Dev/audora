import React from 'react';
import { BackgroundLines } from '../ui/background-lines';

const ThankYouPage = () => {
  return (
    <BackgroundLines className='flex w-full items-center justify-center bg-zinc-950 px-4'>
      <div className='flex flex-col items-center justify-center gap-2 text-center'>
        <h1 className='text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl'>
          🎉 Thanks for joining!
        </h1>
        <p className='md:text-md text-sm text-zinc-400 sm:text-base'>
          You can close this tab now.
        </p>
      </div>
    </BackgroundLines>
  );
};

export default ThankYouPage;
