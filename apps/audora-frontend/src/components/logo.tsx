'use client';

import React from 'react';
import Image from 'next/image';
import siteMetadata from '@/lib/seo/siteMetadata';
import Link from 'next/link';

interface LogoParams {
  href?: string;
  scrolled?: boolean;
  page?: string;
}

const Logo = ({ scrolled, page, href = '/' }: LogoParams) => {
  return (
    <Link href={href} className='flex items-center gap-2'>
      <Image
        src={
          scrolled
            ? '/images/audora-logo-black.webp'
            : '/images/audora-logo-white.webp'
        }
        alt='Audora Logo'
        width={20}
        height={20}
        className='rounded-sm object-cover'
      />
      <span
        className={`text-lg font-semibold ${scrolled ? 'text-black' : 'text-zinc-200'}`}
      >
        {siteMetadata.header}{' '}
        <span className='font-normal text-zinc-300'>
          {page && ` | ${page}`}
        </span>
      </span>
    </Link>
  );
};

export default Logo;
