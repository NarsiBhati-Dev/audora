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
      className='fixed right-6 bottom-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-[#6965db] to-[#a18fff] text-white shadow-xl transition hover:scale-105 hover:shadow-2xl focus:ring-2 focus:ring-[#a18fff]/60 focus:outline-none'
      aria-label='Back to top'
    >
      <ArrowUp className='h-5 w-5' />
    </button>
  ) : null;
};

export default BackToTopButton;
