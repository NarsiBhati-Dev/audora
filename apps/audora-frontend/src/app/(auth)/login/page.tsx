import GridBackground from '@/components/shared/ui/grid-background';
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
    <main className="relative h-screen w-screen bg-black overflow-hidden flex items-center justify-center px-4 md:px-8 p-4">
      <GridBackground />

      <AuthCard className="flex w-full max-w-4xl h-full md:h-[85vh] flex-col md:flex-row overflow-hidden rounded-2xl border border-[#232329] bg-[#121212] shadow-2xl">
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col items-center justify-center">
          <h2 className="mb-2 text-2xl md:text-3xl font-bold text-white text-center">
            Log in to Audora
          </h2>
          <p className="mb-6 text-sm text-white text-center">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-primary-500 hover:text-primary-600 underline"
            >
              Sign up
            </Link>
          </p>

          <SocialLoginButtons />

          <div className="my-6 flex w-full max-w-xs items-center gap-2">
            <div className="h-px flex-1 bg-zinc-700" />
            <span className="text-xs text-zinc-400">Or</span>
            <div className="h-px flex-1 bg-zinc-700" />
          </div>

          <LoginForm />

          <Link
            href="/password-recovery"
            className="mt-3 text-xs text-gray-400 hover:underline text-center"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative hidden md:flex w-1/2 items-center justify-center p-4">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <Image
            src="/images/editor-mockup.png"
            alt="Login Visual"
            priority
            width={500}
            height={500}
            className="object-cover w-full h-full rounded-bl-2xl scale-120 opacity-90"
          />
            <div className="absolute inset-0 bg-black/30 rounded-xl" />
          </div>
        </div>
      </AuthCard>
    </main>
  );
};

export default LoginPage;
