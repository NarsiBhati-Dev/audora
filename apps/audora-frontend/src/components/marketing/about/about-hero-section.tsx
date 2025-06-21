import React from 'react';
import GridBackground from '@/components/shared/ui/grid-background';

const AboutHeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f] py-36'>
        <GridBackground />
        <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='mb-6 text-sm font-semibold tracking-widest text-gray-400 uppercase'>
              AUDIO. VIDEO. ANYWHERE.
            </div>
            <h1 className='mb-6 text-5xl leading-tight font-extrabold text-white md:text-6xl'>
              Audora is Built for Creators.
              <br />
              Capture Your{' '}
              <span className='bg-gradient-to-r from-[#6965db] to-[#a18fff] bg-clip-text text-transparent'>
                Best Content
              </span>{' '}
              Remotely.
            </h1>
            <div className='mb-2 text-lg font-semibold text-gray-300 md:text-xl'>
              Record studio-quality audio and video straight from your
              browser—with no compromise.
            </div>
            <p className='mx-auto max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg'>
              {`Whether you're podcasting, hosting interviews, or creating
              long-form content, Audora ensures your recordings are locally
              captured, perfectly synced, and ready to publish.`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutHeroSection;
