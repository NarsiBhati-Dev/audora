'use client';

import React, { useState } from 'react';
import { type UserLogin, UserLoginSchema } from '@audora/types';

const LoginForm = () => {
  const [formData, setFormData] = useState<UserLogin>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<UserLogin>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = UserLoginSchema.parse(formData);
      setErrors({});

      console.log('Form submitted:', validatedData);
    } catch (error) {
      if (error instanceof Error) {
        // Handle Zod validation errors
        const zodError = JSON.parse(error.message);
        const formattedErrors: Partial<UserLogin> = {};

        zodError.forEach((err: { path: string[]; message: string }) => {
          const field = err.path[0] as keyof UserLogin;
          formattedErrors[field] = err.message;
        });

        setErrors(formattedErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: UserLogin) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof UserLogin]) {
      setErrors((prev: Partial<UserLogin>) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-2 w-full max-w-xs space-y-3'>
      <div className='space-y-1'>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          className={`focus:ring-primary w-full rounded-lg bg-[#18181b] px-4 py-2 text-white placeholder-gray-400 hover:bg-[#2c2c33] focus:ring-1 focus:outline-none ${
            errors.email ? 'border border-red-500' : ''
          }`}
        />
        {errors.email && <p className='text-sm text-red-500'>{errors.email}</p>}
      </div>

      <div className='space-y-1'>
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          className={`focus:ring-primary w-full rounded-lg bg-[#18181b] px-4 py-3 text-white placeholder-gray-400 hover:bg-[#2c2c33] focus:ring-1 focus:outline-none ${
            errors.password ? 'border border-red-500' : ''
          }`}
        />
        {errors.password && (
          <p className='text-sm text-red-500'>{errors.password}</p>
        )}
      </div>

      <button
        type='submit'
        className='bg-primary hover:bg-primary-darker w-full cursor-pointer rounded-lg py-2 font-semibold text-white transition-all'
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
