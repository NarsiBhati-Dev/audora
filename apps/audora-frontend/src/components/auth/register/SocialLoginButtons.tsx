'use client';

import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { loginWithGoogle } from '@/lib/auth/loginWithGoogle';

interface SocialLoginButton {
  icon: React.ReactNode;
  onClick?: () => void;
  label: string;
}

interface SocialLoginButtonsProps {
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
}

const socialButtons: SocialLoginButton[] = [
  {
    icon: <FcGoogle className='text-2xl' />,
    label: 'Login with Google',
  },
  {
    icon: <FaApple className='text-2xl' />,
    label: 'Login with Apple',
  },
];

export default function SocialLoginButtons({}: SocialLoginButtonsProps) {
  const handleClick = (index: number) => {
    if (index === 0) {
      loginWithGoogle();
    }
  };

  return (
    <div className='flex gap-4'>
      {socialButtons.map((button, index) => (
        <button
          key={button.label}
          className='hover:ring-primary-500 flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-gradient-to-r from-[#18181b] via-[#232329] to-[#18181b] text-2xl text-white shadow-lg transition-all duration-150 hover:scale-105 hover:ring-1 hover:outline-none'
          onClick={() => handleClick(index)}
          aria-label={button.label}
        >
          {button.icon}
        </button>
      ))}
    </div>
  );
}
