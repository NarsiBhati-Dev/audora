'use client';

import React from 'react';

const LoginForm = () => {
  return (
    // Login form
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
  );
};

export default LoginForm;
