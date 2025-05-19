import GridBackground from '@/components/ui/GridBackground';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AuthCard from '@/components/auth/auth-card';
import SocialLoginButtons from '@/components/auth/register/SocialLoginButtons';
import getPageMetadata from '@/lib/seo/getPageMetadata';
import LoginForm from '@/components/auth/login-form';

export const metadata = getPageMetadata({
  title: 'Login',
  description: 'Login to your Audora account',
});

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
          <SocialLoginButtons />
          {/* Or separator */}
          <div className='mt-4 mb-4 flex w-full max-w-xs items-center gap-2'>
            <div className='h-px flex-1 bg-zinc-700' />
            <span className='text-xs text-zinc-400'>Or</span>
            <div className='h-px flex-1 bg-zinc-700' />
          </div>

          {/* Login form */}
          <LoginForm />

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
            priority
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
