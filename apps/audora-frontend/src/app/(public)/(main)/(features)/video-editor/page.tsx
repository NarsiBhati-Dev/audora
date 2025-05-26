import React from 'react';
import getPageMetadata from '@/lib/seo/getPageMetadata';

export const metadata = getPageMetadata({
  title: 'Audora Video Editor',
  description: 'Video Editor with Audora',
});

const VideoEditorPage = () => {
  return (
    <main className='mt-16'>
      <div className='flex h-screen flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Video Editor</h1>
      </div>
    </main>
  );
};

export default VideoEditorPage;
