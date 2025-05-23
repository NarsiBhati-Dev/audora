'use client';

import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  const handleLogout = () => {
    signOut({
      callbackUrl: '/login',
      redirect: true,
    });
  };

  return (
    <button
      onClick={handleLogout}
      className='rounded-lg bg-[#a78bfa] px-4 py-2 text-white transition-colors hover:bg-[#8b5cf6]'
    >
      Logout
    </button>
  );
};

export default LogoutButton;
