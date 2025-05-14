'use client';
import GridBackground from '@/components/ui/GridBackground';
import React from 'react';
import Image from 'next/image';
import AuthButtons from '@/components/auth/auth-button';
import Link from 'next/link';

const RegisterPage = () => {
  return (
    <main className='flex w-screen items-center justify-center md:h-screen'>
      <GridBackground />
      <section className='relative z-10 flex h-[80vh] w-full max-w-4xl flex-col items-center justify-center bg-black md:h-[600px] md:flex-row md:rounded-2xl md:border-2 md:border-[#232329] md:bg-[#121212] md:shadow-2xl'>
        {/* Left: Sign-up options */}
        <div className='flex w-full flex-col items-center justify-center md:max-w-1/2'>
          <h2 className='mb-3 text-2xl font-bold text-white'>
            Create your account
          </h2>
          <p className='mb-8 text-gray-400'>
            {`Sign up to join Audora, it's free`}
          </p>
          <div className='flex w-full flex-col gap-4'>
            <AuthButtons />
          </div>
          <p className='mt-8 w-full text-center text-xs text-gray-500'>
            By signing up, you agree to our{' '}
            <a href='#' className='underline'>
              Terms
            </a>{' '}
            &{' '}
            <a href='#' className='underline'>
              Privacy Policy
            </a>
            .
          </p>
          <p className='mt-4 w-full text-center text-sm text-gray-400'>
            Have an account?{' '}
            <Link href='/login' className='text-[#a78bfa] underline'>
              Log in
            </Link>
          </p>
        </div>
        {/* Right: Image */}
        <div className='hidden h-full w-1/2 items-center justify-center rounded-r-2xl bg-[#0d0d0d] py-10 pl-10 md:flex'>
          <Image
            src='/images/editor-mockup.png'
            alt='Register Image'
            width={350}
            height={500}
            className='h-full w-full rounded-l-2xl object-cover'
          />
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
