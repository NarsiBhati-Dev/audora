import React from 'react';
import Image from 'next/image';

const EditSection = () => {
  return (
    <section className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-black/80 via-black/40 to-black/0 py-24'>
      <div className='flex w-full max-w-7xl flex-col items-center px-4 text-center'>
        <h1 className='mb-4 text-5xl font-extrabold text-white'>Edit it.</h1>
        <p className='mb-8 max-w-2xl text-lg text-zinc-300'>
          Cut down on editing time, without losing out on editing capabilities.
          No learning curve needed, and zero file transfer required.
        </p>
        <div className='mb-12 flex flex-col justify-center gap-4 sm:flex-row'>
          <a
            href='/dashboard'
            className='bg-primary hover:bg-primary-darker focus:ring-primary rounded-lg px-8 py-3 text-lg font-semibold text-white shadow transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none'
            aria-label='Start editing for free'
          >
            Start for Free
          </a>
          <a
            href='/video-editor'
            className='group flex items-center justify-center font-medium text-[#7357FF] transition-all duration-300 hover:text-[#5a3fdc] hover:underline'
          >
            Learn more{' '}
            <span className='ml-1 transition-transform duration-300 group-hover:translate-x-1'>
              →
            </span>
          </a>
        </div>
        {/* Editor mockup image */}
        <div className='w-full max-w-4xl overflow-hidden rounded-2xl border-8 border-zinc-800 bg-zinc-900 shadow-2xl'>
          <Image
            src='/images/editor-mockup-2.png'
            alt='Editor interface mockup'
            width={1200}
            height={700}
            className='h-auto w-full object-cover'
            quality={90}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default EditSection;
