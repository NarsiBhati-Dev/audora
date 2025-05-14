import React from 'react';

const StartPage = () => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-black'>
      <div className='flex flex-col items-center gap-4'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent'></div>
        <p className='text-lg font-bold text-white'>
          Rolling out the red carpet...
        </p>
      </div>
    </main>
  );
};

export default StartPage;
