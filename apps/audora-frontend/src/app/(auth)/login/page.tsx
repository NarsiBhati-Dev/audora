'use client';
import GridBackground from '@/components/ui/GridBackground';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa6';
import AuthCard from '@/components/auth/auth-card';

const LoginPage = () => {
  return (
    <main className='flex w-screen items-center justify-center bg-black md:h-screen'>
      <GridBackground />
      <AuthCard>
        {/* Left: Login options */}
        <div className='flex w-full flex-col items-center justify-center px-6 md:max-w-[40vh]'>
          <h2 className='mb-2 text-center text-2xl font-bold text-white'>
            Log in to Audora
          </h2>
          <p className='mb-6 text-center text-sm text-gray-400'>
            {`Don't have an account?`}{' '}
            <Link
              href='/register'
              className='hover:text-primary text-sm text-[#a78bfa] underline'
            >
              Sign up
            </Link>
          </p>
          {/* Social login buttons row */}
          <div className='mb-4 flex w-full max-w-xs flex-row items-center justify-center gap-4'>
            <button className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-gradient-to-r from-[#18181b] via-[#232329] to-[#18181b] text-2xl text-white shadow-lg transition-all duration-150 hover:scale-105 hover:ring-1 hover:ring-indigo-500 hover:outline-none'>
              <FcGoogle className='text-2xl' />
            </button>
            <button className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-gradient-to-r from-[#18181b] via-[#232329] to-[#18181b] text-2xl text-white shadow-lg transition-all duration-150 hover:scale-105 hover:ring-1 hover:ring-indigo-500 hover:outline-none'>
              <FaApple className='text-2xl' />
            </button>
          </div>
          {/* Or separator */}
          <div className='mb-4 flex w-full max-w-xs items-center gap-2'>
            <div className='h-px flex-1 bg-zinc-700' />
            <span className='text-xs text-zinc-400'>Or</span>
            <div className='h-px flex-1 bg-zinc-700' />
          </div>
          {/* Login form */}
          <form className='mb-2 w-full max-w-xs space-y-3'>
            <input
              type='email'
              placeholder='Email'
              className='focus:ring-primary w-full rounded-lg bg-[#18181b] px-4 py-2 text-white placeholder-gray-400 hover:bg-[#2c2c33] focus:ring-1 focus:outline-none'
            />
            <input
              type='password'
              placeholder='Password'
              className='focus:ring-primary w-full rounded-lg bg-[#18181b] px-4 py-3 text-white placeholder-gray-400 hover:bg-[#2c2c33] focus:ring-1 focus:outline-none'
            />
            <button
              type='submit'
              className='bg-primary hover:bg-primary-darker w-full cursor-pointer rounded-lg py-2 font-semibold text-white transition-all'
            >
              Sign up
            </button>
          </form>

          <Link
            href='/password-recovery'
            className='mt-2 block text-center text-sm text-gray-400 hover:underline'
          >
            Forgot password?
          </Link>
        </div>
        {/* Right: Image */}
        <div className='hidden h-full w-[60vh] items-center justify-center bg-[#0d0d0d] md:flex'>
          <Image
            src='/images/editor-mockup.png'
            alt='Login Image'
            width={350}
            height={500}
            className='h-full w-full rounded-l-2xl object-cover py-10 pl-10'
          />
        </div>
      </AuthCard>
    </main>
  );
};

export default LoginPage;
