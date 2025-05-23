'use client';

import React, { useState } from 'react';
import { type UserLogin, UserLoginSchema } from '@audora/types';
import { toast } from 'react-hot-toast';
import { HashLoader } from 'react-spinners';
import { signIn } from 'next-auth/react';

const LoginForm = () => {
  const [formData, setFormData] = useState<UserLogin>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<UserLogin>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = UserLoginSchema.parse(formData);
      setErrors({});

      const result = await signIn('credentials', {
        email: validatedData.email,
        password: validatedData.password,
        redirect: false,
        callbackUrl: '/dashboard',
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      if (result?.ok) {
        toast.success('Logged in successfully');
      }
    } catch (error) {
      if (error instanceof Error) {
        try {
          // Handle Zod validation errors
          const zodError = JSON.parse(error.message);
          const formattedErrors: Partial<UserLogin> = {};

          zodError.forEach((err: { path: string[]; message: string }) => {
            const field = err.path[0] as keyof UserLogin;
            formattedErrors[field] = err.message;
          });

          setErrors(formattedErrors);
        } catch {
          // If it's not a Zod error, show the error message
          toast.error(error.message);
        }
      }
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
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
          disabled={isLoading}
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
        disabled={isLoading}
        className={`mt-2 w-full rounded-lg bg-[#a78bfa] px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#8b5cf6] focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
          isLoading ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        {isLoading ? (
          <div className='flex justify-center'>
            <HashLoader color='#fafafa' size={20} />
          </div>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
};

export default LoginForm;
