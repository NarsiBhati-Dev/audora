import React from 'react';
import getPageMetadata from '@/lib/seo/getPageMetadata';

export const metadata = getPageMetadata({
  title: 'Audora Recording',
  description: 'Recording with Audora',
});

const RecordingPage = () => {
  return (
    <main className='mt-16'>
      <div className='flex h-screen flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Recording</h1>
      </div>
    </main>
  );
};

export default RecordingPage;
