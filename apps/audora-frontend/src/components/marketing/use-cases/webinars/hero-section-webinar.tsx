import React from 'react';
import Image from 'next/image';
import GridBackground from '@/components/ui/GridBackground';
import Link from 'next/link';

const HeroSectionWebinar = () => {
  return (
    <>
      {/* Hero Section */}
      <section className='relative flex flex-col items-center bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f] px-4 py-8 text-center md:py-12'>
        <GridBackground />
        <div className='relative mx-auto max-w-3xl'>
          <h1 className='mb-4 text-5xl leading-tight font-extrabold text-white sm:text-6xl'>
            Host Stunning Webinars Effortlessly
          </h1>
          <p className='mb-8 text-lg text-gray-300 sm:text-xl'>
            Engage your audience with high-quality, interactive webinars. No
            downloads, no hassle—just seamless live experiences.
          </p>
          <div className='mb-10 flex flex-col justify-center gap-4 sm:flex-row'>
            <Link
              href='/dashboard'
              className='bg-primary hover:bg-primary-darker rounded-lg px-8 py-3 text-lg font-semibold text-white shadow transition'
            >
              Start Your Webinar Now
            </Link>
            <a
              href='#features'
              className='text-primary hover:text-primary-darker flex items-center justify-center font-medium hover:underline'
            >
              Learn more <span className='ml-1'>→</span>
            </a>
          </div>
        </div>
        <div className='relative flex w-full justify-center'>
          <Image
            src='/images/webinar-hero.png'
            alt='Webinar Hero'
            width={900}
            height={500}
            className='border-primary max-w-full rounded-2xl border object-cover shadow-2xl'
            priority
          />
        </div>
      </section>
    </>
  );
};

export default HeroSectionWebinar;
