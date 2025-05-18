import React from 'react';
import Image from 'next/image';

interface Participant {
  name: string;
  avatar: string | null;
  status: string;
  resolution: string;
  icon?: React.ReactNode;
}

const participants: Participant[] = [
  {
    name: 'Narsi',
    avatar: '/images/team/narsi-bhati.png',
    status: 'Ready',
    resolution: '3840 × 2160',
  },
  {
    name: 'Stephen',
    avatar: '/images/stephen.png',
    status: 'Ready',
    resolution: '3840 × 2160',
  },
  {
    name: 'All Speakers',
    avatar: null,
    status: '',
    resolution: '3840 × 2160',
    icon: (
      <svg
        width='32'
        height='32'
        fill='none'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <circle cx='12' cy='8' r='4' fill='#a1a1aa' />
        <rect x='4' y='16' width='16' height='4' rx='2' fill='#a1a1aa' />
      </svg>
    ),
  },
];

const RecordSection = () => {
  return (
    <section className='bg-[#f7f7fa] py-20' aria-labelledby='record-heading'>
      <div className='mx-auto flex max-w-6xl flex-col items-center px-4 text-center'>
        <h1
          id='record-heading'
          className='mb-4 text-5xl font-extrabold text-black'
        >
          Record it.
        </h1>
        <p className='mx-auto mb-8 max-w-2xl text-lg text-gray-600'>
          Studio-quality, separate audio and video tracks for each participant,
          thanks to our local recording technology.
        </p>
        <div className='mb-12 flex flex-col justify-center gap-4 sm:flex-row'>
          <a
            href='/dashboard'
            className='bg-primary hover:bg-primary-darker focus:ring-primary rounded-lg px-8 py-3 text-lg font-semibold text-white shadow transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none'
            aria-label='Start recording for free'
          >
            Start for Free
          </a>
          <a
            href='/recording'
            className='group text-primary hover:text-primary-darker flex items-center justify-center font-medium transition-all duration-300 hover:underline'
          >
            Learn more{' '}
            <span className='ml-1 transition-transform duration-300 group-hover:translate-x-1'>
              →
            </span>
          </a>
        </div>
        {/* Main content */}
        <div className='relative mt-8 flex w-full flex-col items-center justify-center md:flex-row'>
          {/* Device image */}
          <div className='relative w-full scale-[1.02] overflow-hidden rounded-3xl border border-gray-200 shadow-2xl transition-transform duration-300 md:w-[600px]'>
            <Image
              src='/images/4k.png'
              alt='4K Quality Badge'
              width={1200}
              height={800}
              className='h-auto w-full object-cover'
              priority
              quality={90}
              sizes='600px'
            />
            {/* REC badge */}
            <div className='absolute top-4 right-4 flex animate-pulse items-center gap-1 rounded-lg bg-red-600 px-3 py-1 text-xs font-bold text-white shadow'>
              <span className='inline-block h-2 w-2 rounded-full bg-white' />{' '}
              REC
            </div>
          </div>
          {/* Floating cards */}
          <div className='mt-8 flex w-full max-w-lg flex-col gap-6 md:mt-0 md:ml-8'>
            {/* Download tracks card */}
            <div className='scale-[1.02] rounded-2xl bg-zinc-900 p-6 shadow-lg transition-transform duration-300'>
              <div className='mb-4 text-base font-semibold text-white'>
                Download separate tracks
              </div>
              <div className='space-y-3'>
                {participants.map(p => (
                  <div
                    key={p.name}
                    className='flex items-center justify-between rounded-xl bg-zinc-800 px-4 py-3 transition-colors duration-300 hover:bg-zinc-700'
                  >
                    <div className='flex items-center gap-3'>
                      {p.avatar ? (
                        <div className='relative h-12 min-h-[48px] w-12 min-w-[48px]'>
                          <Image
                            src={p.avatar}
                            alt={`${p.name}'s avatar`}
                            fill
                            sizes='48px'
                            className='rounded-full border-2 border-zinc-700 object-cover'
                            quality={85}
                          />
                        </div>
                      ) : (
                        <div className='flex h-12 min-h-[48px] w-12 min-w-[48px] items-center justify-center rounded-full border-2 border-zinc-600 bg-zinc-700'>
                          {p.icon}
                        </div>
                      )}
                      <div>
                        <div className='font-medium text-white'>{p.name}</div>
                        {p.status && (
                          <div className='text-xs text-zinc-400'>
                            {p.status}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='flex items-center gap-4'>
                      <span className='text-xs text-zinc-400'>
                        {p.resolution}
                      </span>
                      <button
                        className='hover:text-primary text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50'
                        aria-label={`Download ${p.name}'s WAV file`}
                      >
                        {`"WAV"`}
                      </button>
                      <button
                        className='hover:text-primary text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50'
                        aria-label={`Download ${p.name}'s MP4 file`}
                      >
                        {`"MP4"`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecordSection;
