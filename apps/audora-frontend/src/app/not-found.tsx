'use client';

import Header from '@/components/header';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const NotFoundPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <>
        <Header />
        <main className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#101010] px-4'>
          <div className='from-primary/10 absolute inset-0 bg-gradient-to-b to-transparent' />
          <div className='bg-primary/20 absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full blur-3xl' />
          <div className='bg-primary/20 absolute right-1/4 bottom-1/4 h-64 w-64 animate-pulse rounded-full blur-3xl' />
          <div className='relative z-10 text-center'>
            <h1 className='mb-4 text-8xl font-bold text-white'>404</h1>
            <h2 className='mb-6 text-3xl font-semibold text-gray-300'>
              Page Not Found
            </h2>
            <p className='mb-8 max-w-md text-gray-400'>
              {`Oops! The page you're looking for doesn't exist or has been moved.`}
            </p>
            <div className='flex flex-col items-center gap-4 sm:flex-row sm:justify-center'>
              <Link
                href='/'
                className='group bg-primary hover:bg-primary-darker hover:shadow-primary/20 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-all hover:shadow-lg'
              >
                <FaHome className='transition-transform group-hover:-translate-x-1' />
                Back to Home
              </Link>
            </div>
            <div className='mt-12 text-sm text-gray-500'>
              <p>Need help? Contact our support team</p>
              <Link
                href='/contact'
                className='text-primary cursor-pointer hover:underline'
              >
                Get Support
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#101010] px-4'>
        {/* Background gradient effect */}
        <div className='from-primary/10 absolute inset-0 bg-gradient-to-b to-transparent' />

        {/* Animated circles */}
        <div className='bg-primary/20 absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full blur-3xl' />
        <div className='bg-primary/20 absolute right-1/4 bottom-1/4 h-64 w-64 animate-pulse rounded-full blur-3xl' />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='relative z-10 text-center'
        >
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
            className='mb-4 text-8xl font-bold text-white'
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='mb-6 text-3xl font-semibold text-gray-300'
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className='mb-8 max-w-md text-gray-400'
          >
            {`Oops! The page you're looking for doesn't exist or has been moved.`}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className='flex flex-col items-center gap-4 sm:flex-row sm:justify-center'
          >
            <Link
              href='/'
              className='group bg-primary hover:bg-primary-darker hover:shadow-primary/20 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-all hover:shadow-lg'
            >
              <FaHome className='transition-transform group-hover:-translate-x-1' />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className='mt-12 text-sm text-gray-500'
          >
            <p>Need help? Contact our support team</p>
            <Link
              href='/contact'
              className='text-primary cursor-pointer hover:underline'
            >
              Get Support
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export default NotFoundPage;
