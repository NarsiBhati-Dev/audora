'use client';

import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const RegisterFormFull = ({ onBack }: { onBack?: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-center md:max-w-[40vh]'>
      <div className='flex w-full flex-col items-start justify-start px-2'>
        <button
          className='flex -translate-y-16 cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-gray-300 hover:bg-zinc-800 hover:text-white'
          onClick={onBack}
          type='button'
        >
          <FaArrowLeft className='text-sm' /> Back
        </button>
      </div>
      <section className='md:-translate-y-5'>
        <h2 className='mb-3 text-center text-2xl font-bold text-white'>
          Create your account
        </h2>
        <p className='mb-8 text-center text-sm text-gray-400'>
          {`Sign up to join Audora, it's free`}
        </p>
        <div className='py- flex w-full max-w-md flex-col justify-center px-10'>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              className='w-full rounded-lg border-none bg-[#232329] px-4 py-3 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:outline-none'
              required
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              className='w-full rounded-lg border-none bg-[#232329] px-4 py-3 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:outline-none'
              required
            />
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className='w-full rounded-lg border-none bg-[#232329] px-4 py-3 pr-16 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:outline-none'
                required
              />
              <button
                type='button'
                className='absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium text-indigo-300 hover:text-indigo-400'
                onClick={() => setShowPassword(v => !v)}
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button
              type='submit'
              className='mt-2 w-full rounded-lg bg-[#a78bfa] px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#8b5cf6] focus:ring-1 focus:ring-indigo-500 focus:outline-none'
            >
              Create your account
            </button>
          </form>
        </div>
        <p className='mt-8 w-full text-center text-xs text-gray-400'>
          {`By signing up, you agree to our`}{' '}
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
          <a
            href='/login'
            className='hover:text-primary text-[#a78bfa] underline'
          >
            Log in
          </a>
        </p>
      </section>
    </div>
  );
};

export default RegisterFormFull;
