'use client';

import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/dashboard',
      });

      if (result?.error) {
        toast.error('Failed to sign in with Google. Please try again.');
        return;
      }

      if (result?.ok) {
        toast.success('Signed in with Google successfully');
      }
    } catch {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className='flex w-full items-center justify-center gap-2 rounded-lg border border-gray-600 bg-[#18181b] px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#2c2c33] focus:ring-1 focus:ring-indigo-500 focus:outline-none'
    >
      <FcGoogle className='h-5 w-5' />
      Continue with Google
    </button>
  );
};

export default GoogleSignIn;
