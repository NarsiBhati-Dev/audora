'use client';

import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const PasswordRecoveryPage = () => {
  const [email, setEmail] = useState('');

  return (
    <main className='flex h-screen w-full items-center justify-center bg-[#101010]'>
      <div className='flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-lg p-4'>
        <h1 className='text-2xl font-bold text-white'>Forgot password?</h1>
        <p className='text-center text-zinc-400'>
          {`No worries, we'll send you a reset link.`}
        </p>
        <input
          type='email'
          placeholder='Enter your email...'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='focus:ring-primary w-full rounded bg-zinc-900 px-4 py-2 text-white placeholder-zinc-500 focus:ring-1 focus:outline-none'
        />
        <button className='bg-primary hover:bg-primary-darker w-full cursor-pointer rounded py-2 font-semibold text-white transition-colors'>
          Send reset link
        </button>
        <Link
          href='/login'
          className='mt-2 flex items-center gap-2 text-sm text-zinc-400 hover:text-white'
        >
          <FaArrowLeft /> Back to Log in
        </Link>
      </div>
    </main>
  );
};

export default PasswordRecoveryPage;
