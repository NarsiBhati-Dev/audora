'use client';

import React from 'react';
import Logo from '../logo';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';

const StudioHeader = () => {
  return (
    <header className='bg-studio-bg-light hidden items-center justify-between px-6 py-4 md:fixed md:top-0 md:left-0 md:z-50 md:flex'>
      <div className='flex items-center gap-3'>
        <Link
          href='/dashboard'
          className='flex items-center rounded-lg p-1.5 hover:bg-zinc-800'
        >
          <FiChevronLeft className='text-zinc-200' size={22} />
        </Link>
        <Logo scrolled={false} page='studio' href='/studio' />
      </div>
    </header>
  );
};

export default StudioHeader;
