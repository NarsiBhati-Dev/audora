'use client';
import GridBackground from '@/components/ui/GridBackground';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa6';

const LoginPage = () => {
  return (
    <main className='flex w-screen items-center justify-center bg-black md:h-screen'>
      <GridBackground />
      <section className='relative z-10 flex h-[80vh] w-full max-w-4xl flex-col items-center justify-center bg-black md:h-[600px] md:flex-row md:rounded-2xl md:border-2 md:border-[#232329] md:bg-[#121212] md:shadow-2xl'>
        {/* Left: Login options */}
        <div className='flex w-full flex-col items-center justify-center px-6 md:max-w-1/2'>
          <h2 className='mb-2 text-center text-2xl font-bold text-white'>
            Log in to Audora
          </h2>
          <p className='mb-6 text-center text-gray-400'>
            {`Don't have an account?`}{' '}
            <Link href='/register' className='text-[#a78bfa] underline'>
              Sign up
            </Link>
          </p>
          {/* Social login buttons row */}
          <div className='mb-4 flex w-full max-w-xs flex-row items-center justify-center gap-4'>
            <button className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-gradient-to-r from-[#18181b] via-[#232329] to-[#18181b] text-2xl text-white shadow-lg transition-all duration-150 hover:scale-105 focus:ring-2 focus:ring-indigo-500 focus:outline-none'>
              <FcGoogle className='text-2xl' />
            </button>
            <button className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-gradient-to-r from-[#18181b] via-[#232329] to-[#18181b] text-2xl text-white shadow-lg transition-all duration-150 hover:scale-105 focus:ring-2 focus:ring-indigo-500 focus:outline-none'>
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
              className='w-full rounded-lg bg-[#18181b] px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#a78bfa] focus:outline-none'
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full rounded-lg bg-[#18181b] px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#a78bfa] focus:outline-none'
            />
            <button
              type='submit'
              className='w-full rounded-lg bg-[#a78bfa] py-3 font-semibold text-white transition-all hover:bg-[#7c5fe6]'
            >
              Log in
            </button>
          </form>

          {/* <Link
            href='#'
            className='block text-center text-xs text-gray-400 hover:underline'
          >
            Forgot password?
          </Link> */}
        </div>
        {/* Right: Image */}
        <div className='hidden h-full w-1/2 items-center justify-center bg-[#0d0d0d] md:flex'>
          <Image
            src='/images/editor-mockup.png'
            alt='Login Image'
            width={350}
            height={500}
            className='h-full w-full rounded-l-2xl object-cover py-10 pl-10'
          />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
