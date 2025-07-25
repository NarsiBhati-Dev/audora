'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react'; // Optional: for a more refined icon

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 120);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return showButton ? (
    <button
      onClick={scrollToTop}
      className='from-primary-500 to-primary-300 focus:ring-primary-500/60 fixed right-6 bottom-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr text-white shadow-xl transition hover:scale-105 hover:shadow-2xl focus:ring-2 focus:outline-none'
      aria-label='Back to top'
    >
      <ArrowUp className='h-5 w-5' />
    </button>
  ) : null;
};

export default BackToTopButton;
