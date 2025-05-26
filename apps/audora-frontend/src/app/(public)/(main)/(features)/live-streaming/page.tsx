import React from 'react';
import getPageMetadata from '@/lib/seo/getPageMetadata';

export const metadata = getPageMetadata({
  title: 'Audora Live Streaming',
  description: 'Live Streaming with Audora',
});

const LiveStreamPage = () => {
  return (
    <main className='mt-16'>
      <div className='flex h-screen flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Live Streaming</h1>
      </div>
    </main>
  );
};

export default LiveStreamPage;
