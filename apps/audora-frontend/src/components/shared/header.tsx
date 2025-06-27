'use client';

import React, { useEffect, useState } from 'react';
import Logo from '@/components/logo';
import Navbar from '../navbar/navbar';
import MobileNavbar from '../navbar/mobile-navbar';
import { useIsDesktop } from '@/hooks/useIsDesktop';

const SCROLL_THRESHOLD = 60;

const Header = ({ isMarketing = false }: { isMarketing?: boolean }) => {
  const [scrolled, setScrolled] = useState(isMarketing);
  const isDesktop = useIsDesktop();
  useEffect(() => {
    if (isMarketing) {
      return;
    }

    setScrolled(window.scrollY > SCROLL_THRESHOLD);

    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMarketing]);

  return (
    <header
      className={`fixed top-0 z-50 w-full px-4 transition-[background-color,box-shadow] duration-500 ease-in-out md:px-8 lg:px-16 xl:px-24 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent shadow-none'
      }`}
    >
      <div className='mx-auto flex max-w-[1480px] items-center justify-between py-3'>
        <Logo scrolled={scrolled} />
        {isDesktop ? (
          <Navbar scrolled={scrolled} />
        ) : (
          <MobileNavbar scrolled={scrolled} />
        )}
      </div>
    </header>
  );
};

export default Header;
