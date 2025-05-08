'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const videos = [
  {
    names: 'Angel Poon & Kerry Washington',
    youtubeId: 'XVR9OgOtnZo',
  },
  {
    names: 'Web Dev Cody',
    youtubeId: 'yR7bIVhktOE',
  },
];

const TrustedSection = () => {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  return (
    <section className='bg-gradient-to-r from-black/80 via-black/40 to-black/0 py-10'>
      <div className='mx-auto max-w-7xl px-4'>
        <h2 className='mb-8 text-center text-2xl font-extrabold text-white sm:text-3xl'>
          Made with Audora
        </h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {videos.map((video, i) => (
            <div
              key={i}
              className='mx-auto max-w-[300px] rounded-2xl bg-[#232326] p-3 shadow-lg'
            >
              <div
                className={`relative mb-3 overflow-hidden rounded-xl`}
                style={{ aspectRatio: '16/9' }}
              >
                {playingIdx === i ? (
                  <iframe
                    width='100%'
                    height='100%'
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                    title={video.names}
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                    className='h-full w-full'
                  />
                ) : (
                  <>
                    <Image
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.names}
                      width={300}
                      height={169}
                      className='h-full w-full object-cover'
                    />
                    <button
                      className='absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40'
                      onClick={() => setPlayingIdx(i)}
                    >
                      <div className='rounded-full bg-black/70 p-2'>
                        <svg
                          width='24'
                          height='24'
                          fill='white'
                          viewBox='0 0 24 24'
                        >
                          <path d='M8 5v14l11-7z' />
                        </svg>
                      </div>
                    </button>
                  </>
                )}
              </div>
              <div className='text-sm font-medium text-gray-100'>
                {video.names}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
