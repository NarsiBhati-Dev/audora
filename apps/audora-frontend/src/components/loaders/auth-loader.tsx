import React from 'react';
import Spinner from '@/components/loaders/spinner';
import DotLoader from '@/components/loaders/dot-loader';

const AuthLoader = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#121212]/95'>
      <div className='flex flex-col items-center gap-10'>
        <Spinner />

        {/* Loading Text and Dots */}
        <div className='flex flex-col items-center gap-3'>
          <div className='relative'>
            <p className='text-2xl font-bold text-white'>
              Warming up the engines…
            </p>
            <div className='via-primary-500 via-primary-500 absolute -inset-x-4 -bottom-2 h-0.5 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent to-transparent'></div>
          </div>
        </div>

        <DotLoader />
      </div>
    </div>
  );
};

export default AuthLoader;
