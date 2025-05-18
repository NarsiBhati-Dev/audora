'use client';
import GridBackground from '@/components/ui/GridBackground';
import React from 'react';
import Image from 'next/image';
import AuthButtons from '@/components/auth/auth-button';
import Link from 'next/link';
import AuthCard from '@/components/auth/auth-card';

const RegisterPage = () => {
  return (
    <main className='flex w-screen items-center justify-center md:h-screen'>
      <GridBackground />
      <AuthCard>
        {/* Left: Sign-up options */}
        <div className='flex w-full flex-col items-center justify-center md:max-w-[40vh]'>
          <h2 className='mb-3 text-2xl font-bold text-white'>
            Create your account
          </h2>
          <p className='mb-8 text-sm text-gray-400'>
            {`Sign up to join Audora, it's free`}
          </p>
          <div className='flex w-full flex-col gap-4'>
            <AuthButtons />
          </div>
          <p className='mt-8 w-full text-center text-xs text-gray-400'>
            By signing up, you agree to our{' '}
            <a
              href='/terms-conditions'
              className='text-gray-300 underline hover:text-gray-200'
            >
              Terms
            </a>{' '}
            &{' '}
            <a
              href='/privacy-policy'
              className='text-gray-300 underline hover:text-gray-200'
            >
              Privacy Policy
            </a>
            .
          </p>
          <p className='mt-4 w-full text-center text-sm text-gray-400'>
            Have an account?{' '}
            <Link
              href='/login'
              className='hover:text-primary text-sm text-[#a78bfa] underline'
            >
              Log in
            </Link>
          </p>
        </div>
        {/* Right: Image */}
        <div className='hidden h-full w-[60vh] items-center justify-center rounded-r-2xl bg-[#0d0d0d] py-10 pl-10 md:flex'>
          <Image
            src='/images/editor-mockup.png'
            alt='Register Image'
            width={350}
            height={500}
            className='h-full w-full rounded-l-2xl object-cover'
          />
        </div>
      </AuthCard>
    </main>
  );
};

export default RegisterPage;
