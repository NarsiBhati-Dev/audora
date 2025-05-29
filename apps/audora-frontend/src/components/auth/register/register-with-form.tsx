'use client';

import { RegisterUser } from '@/actions/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import HashLoader from 'react-spinners/HashLoader';

// Validation helpers
const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*.,?])(?=.{8,})/.test(password);

const RegisterWithForm = ({ onBack }: { onBack?: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Password requirement checks
  const passwordChecks = [
    {
      label: 'One capital letter',
      test: (pw: string) => /[A-Z]/.test(pw),
    },
    {
      label: 'One special character (!@#$..)',
      test: (pw: string) => /[!@#$%^&*.,?]/.test(pw),
    },
    {
      label: 'One lower-case letter',
      test: (pw: string) => /[a-z]/.test(pw),
    },
    {
      label: 'At least 8 characters',
      test: (pw: string) => pw.length >= 8,
    },
  ];

  // Validate all fields and return error messages
  const getValidationErrors = (data: typeof formData) => {
    const errs: string[] = [];
    if (!data.name.trim()) {
      errs.push('Name is required');
    }
    if (!validateEmail(data.email)) {
      errs.push('Please enter a valid email address');
    }
    if (!validatePassword(data.password)) {
      errs.push(
        'Password should contain at least 8 characters, 1 special character (!@#$%^&*.,?), 1 Capital letter and 1 lower-case letter.',
      );
    }
    return errs;
  };

  // Only update form data on change, don't set errors
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = getValidationErrors(formData);
    setErrors(validationErrors);
    if (validationErrors.length === 0) {
      registerMutation.mutate(formData);
    }
  };

  const route = useRouter();

  const registerMutation = useMutation({
    mutationFn: RegisterUser,
    onSuccess: () => {
      toast.success('User Signed up Successfully');
      route.push('/login');
    },
    onError: err => {
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      toast.error(err.message);
    },
  });

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center md:max-w-[40vh]'>
      <button
        className='absolute top-2 left-2 flex items-center gap-2 rounded-md px-2 py-1 text-sm font-medium text-gray-300 hover:bg-zinc-800 hover:text-white'
        onClick={onBack}
        type='button'
      >
        <FaArrowLeft className='text-sm' /> Back
      </button>
      <div className='flex w-full flex-col items-start justify-start px-2'>
        <section className='md:-translate'>
          <h2 className='mb-2 text-center text-2xl font-bold text-white'>
            Create your account
          </h2>
          <p className='mb-6 text-center text-sm text-gray-400'>
            {`Sign up to join Audora, it's free`}
          </p>
          <div className='flex w-full max-w-md flex-col justify-center px-10 py-4'>
            <form className='space-y-2' onSubmit={handleSubmit}>
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                className={`w-full rounded-lg border ${errors.includes('Name is required') ? 'border-red-400' : 'border-none'} bg-[#232329] px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:outline-none`}
                required
              />
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-lg border ${errors.some(e => e.toLowerCase().includes('email')) ? 'border-red-400' : 'border-none'} bg-[#232329] px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:outline-none`}
                required
              />
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full rounded-lg border ${errors.some(e => e.toLowerCase().includes('password')) ? 'border-red-400' : 'border-none'} bg-[#232329] px-4 py-2.5 pr-16 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:outline-none`}
                  required
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <button
                  type='button'
                  className='absolute top-1/2 right-3 -translate-y-1/2 text-sm font-medium text-indigo-300 hover:text-indigo-400'
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
                {/* Password requirements tooltip */}
                {passwordFocused && (
                  <div className='absolute top-0 left-full z-10 ml-4 w-68 rounded-xl border border-white/10 bg-[#232329] p-3 text-sm text-gray-200 shadow-xl'>
                    <div className='mb-2 text-sm font-semibold text-white'>
                      Password should contain at least:
                    </div>
                    <ul className='space-y-2 pl-5'>
                      {passwordChecks.map((req, idx) => (
                        <li
                          key={idx}
                          className={
                            req.test(formData.password)
                              ? 'text-green-500'
                              : 'text-gray-400'
                          }
                        >
                          <div className='flex items-center gap-2 text-xs'>
                            <FaCheck size={8} />
                            {req.label}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {/* Error box */}
              <div
                className='mb-2 rounded-lg border border-red-400 bg-[#2a2022] px-6 py-2 text-xs text-red-200 transition-all duration-200'
                style={{
                  minHeight: errors.length > 0 ? undefined : '40px',
                  borderColor: errors.length > 0 ? '#f87171' : 'transparent',
                  background: errors.length > 0 ? '#2a2022' : 'transparent',
                }}
              >
                {errors.length > 0 ? (
                  <ul className='list-disc space-y-1 pl-4'>
                    {errors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <button
                type='submit'
                disabled={registerMutation.isPending}
                className={`mt-2 w-full cursor-pointer rounded-lg bg-[#a78bfa] px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#8b5cf6] focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
                  registerMutation.isPending
                    ? 'cursor-not-allowed opacity-50'
                    : ''
                }`}
              >
                {registerMutation.isPending ? (
                  <div className='flex justify-center'>
                    <HashLoader color='#fafafa' size={20} />
                  </div>
                ) : (
                  'Create your account'
                )}
              </button>
            </form>
          </div>
          <p className='mt-2 w-full text-center text-xs text-gray-400'>
            {`By signing up, you agree to our`}{' '}
            <a
              href='/terms-conditions'
              className='cursor-pointer text-gray-300 underline hover:text-gray-200'
            >
              Terms
            </a>{' '}
            &{' '}
            <a
              href='/privacy-policy'
              className='cursor-pointer text-gray-300 underline hover:text-gray-200'
            >
              Privacy Policy
            </a>
            .
          </p>

          <p className='mt-4 w-full text-center text-xs text-gray-400'>
            Have an account?{' '}
            <a
              href='/login'
              className='text-primary-500 hover:text-primary-600 cursor-pointer underline'
            >
              Log in
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default RegisterWithForm;
