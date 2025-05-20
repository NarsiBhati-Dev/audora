'use client';

import { loginWithGoogle } from '@/lib/auth/loginWithGoogle';
import { FaApple } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';

const providers = [
  {
    label: 'Continue with Google',
    icon: <FcGoogle className='text-2xl' />,
    onClick: () => loginWithGoogle(),
  },
  { label: 'Continue with Apple', icon: <FaApple className='text-2xl' /> },
  { label: 'Continue with Email', icon: <MdEmail className='text-2xl' /> },
];

export default function AuthButtons({
  onEmailClick,
}: {
  onEmailClick?: () => void;
}) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleClick = async (label: string, onClick?: () => void) => {
    if (label === 'Continue with Email') {
      onEmailClick?.();
      return;
    }

    setLoading(label);
    try {
      await onClick?.();
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className='flex w-full flex-col items-center gap-4 py-4'>
      {providers.map(({ label, icon, onClick }, i) => (
        <button
          key={i}
          onClick={() => handleClick(label, onClick)}
          disabled={loading === label}
          className={`flex w-full max-w-[300px] cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-gradient-to-r from-[#18181b] via-[rgb(35,35,41)] to-[#18181b] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-150 hover:scale-[1.03] hover:bg-[#232329]/90 hover:shadow-xl hover:ring-1 hover:ring-indigo-500 hover:outline-none active:scale-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100`}
        >
          <span className='flex-shrink-0 text-2xl'>{icon}</span>
          <span className='flex-1 text-left'>
            {loading === label ? (
              <div className='flex justify-center'>
                <HashLoader color='#7357ff' size={20} />
              </div>
            ) : (
              label
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
