import React from 'react';
import Link from 'next/link';

const options = [
  'Podcasts',
  'Video interviews',
  'Transcriptions',
  'Webinars',
  'Video marketing',
  'AI show notes',
  'Captions',
];

const HeroSection = () => {
  return (
    <div className='relative flex min-h-[94vh] flex-col items-center justify-start overflow-hidden md:flex-row'>
      {/* Video Section */}
      <div className='h-[50vh] w-full md:absolute md:inset-0 md:h-[94vh]'>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster='images/video-poster.png'
          className='h-full w-full object-cover'
        >
          <source src='/videos/audora-hero.mp4' type='video/mp4' />
        </video>
        {/* Gradient Overlay: only on desktop */}
        <div className='absolute inset-0 hidden bg-gradient-to-r from-black/80 via-black/40 to-black/0 md:block' />
      </div>

      {/* Content */}
      <div className='w-full max-w-2xl items-center px-4 py-12 text-center text-white sm:px-8 md:relative md:z-10 md:items-start md:px-12 md:py-24 md:text-left lg:pl-24'>
        <h1 className='mb-4 text-left text-3xl leading-tight font-extrabold text-white sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl'>
          Create Your Best
          <br />
          Content Yet<span className='text-[#7357FF]'>.</span>
        </h1>
        <p className='mb-6 max-w-xl text-left text-base text-gray-200 sm:text-lg md:mb-8 md:text-xl'>
          Record studio-quality podcasts from anywhere. Connect with guests
          worldwide, edit with precision, and publish your episodes with
          confidence - all in one powerful platform.
        </p>
        <div className='mb-6 hidden flex-wrap gap-2 md:mb-8 md:flex md:gap-3'>
          {options.map(option => (
            <button
              key={option}
              className='rounded-full border border-gray-400 bg-black/30 px-3 py-1.5 text-xs text-gray-100 transition-colors hover:bg-white/10 sm:text-sm md:px-4 md:py-2'
              type='button'
              tabIndex={-1}
            >
              {option}
            </button>
          ))}
        </div>
        <Link
          href='/signup'
          className='mb-2 inline-block w-full rounded-lg bg-[#7357FF] px-6 py-3 text-center text-base font-semibold text-white shadow-lg transition-colors hover:bg-[#5a3fdc] sm:w-auto sm:px-8 sm:py-4 sm:text-lg'
        >
          Start Podcasting
        </Link>
        <div className='mt-2 text-[10px] text-gray-300 sm:text-xs'>
          * Launch your podcast today. No credit card required.
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
