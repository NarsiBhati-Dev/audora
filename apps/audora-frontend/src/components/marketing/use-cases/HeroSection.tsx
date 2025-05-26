// components/HeroSection.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GridBackground from '@/components/ui/GridBackground';

interface HeroSectionProps {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  learnMoreHref?: string;
  imageSrc: string;
  imageAlt?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  buttonLabel,
  buttonHref,
  learnMoreHref = '#features',
  imageSrc,
  imageAlt = '',
}) => {
  return (
    <section className='relative flex flex-col items-center bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f] px-4 py-16 text-center md:py-24'>
      <GridBackground />
      <div className='relative mx-auto max-w-3xl'>
        <h1 className='mb-6 text-5xl leading-tight font-extrabold text-white sm:text-6xl'>
          {title}
        </h1>
        <p className='mb-10 text-lg text-white/90 sm:text-xl'>{description}</p>
        <div className='mb-12 flex flex-col justify-center gap-4 sm:flex-row'>
          <Link
            href={buttonHref}
            className='bg-primary hover:bg-primary-darker rounded-lg px-8 py-3 text-lg font-semibold text-white shadow transition'
          >
            {buttonLabel}
          </Link>
          <a
            href={learnMoreHref}
            className='text-primary hover:text-primary-darker flex items-center justify-center font-medium hover:underline'
          >
            Learn more <span className='ml-1'>→</span>
          </a>
        </div>
      </div>
      <div className='relative flex w-full justify-center'>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={900}
          height={500}
          className='max-w-full rounded-2xl border border-white/20 object-cover shadow-2xl'
          priority
        />
      </div>
    </section>
  );
};

export default HeroSection;
