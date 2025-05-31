'use client';

import React from 'react';
import Logo from '../logo';
import Link from 'next/link';
import { FiChevronLeft } from 'react-icons/fi';

const StudioHeader = () => {
  return (
    <header className='fixed top-0 right-0 left-0 z-50 flex items-center justify-between bg-black px-6 py-4'>
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
