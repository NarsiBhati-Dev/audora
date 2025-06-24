'use client';

import AuthButtons from '../auth-button';

const RegisterWithOAuth = ({ onEmailClick }: { onEmailClick?: () => void }) => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center md:max-w-[45%] px-2'>
      <h2 className='mb-3 text-2xl font-bold text-white'>
        Create your account
      </h2>
      <p className='mb-8 text-xs text-gray-400'>
        {`Sign up to join Audora, it's free`}
      </p>

      <AuthButtons onEmailClick={onEmailClick} />

      <p className='mt-4 w-full text-center text-xs text-gray-400'>
        By signing up, you agree to our{' '}
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
    </div>
  );
};

export default RegisterWithOAuth;
