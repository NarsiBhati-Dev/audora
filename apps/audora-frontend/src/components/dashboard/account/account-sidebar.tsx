'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FiCreditCard, FiSettings, FiUser } from 'react-icons/fi';

const navItems = [
  {
    label: 'Profile',
    href: '/dashboard/account/settings',
    icon: <FiUser size={24} />,
  },
  {
    label: 'Subscription',
    href: '/dashboard/account/subscription',
    icon: <FiCreditCard size={24} />,
  },
  {
    label: 'Studio settings',
    href: '/dashboard/account/studio-settings',
    icon: <FiSettings size={24} />,
  },
];

const AccountSidebar = () => {
  const pathname = usePathname();
  return (
    <>
      {/* Sidebar */}
      <aside className='mt-12 hidden w-64 flex-shrink-0 p-6 xl:block'>
        {/* Account Section */}
        <div className='mb-8'>
          <h2
            className='mb-4 text-xs font-bold tracking-widest text-white'
            style={{
              color: '#a78bfa',
              textShadow: '0 0 10px rgba(167, 139, 250, 0.5)',
            }}
          >
            YOUR ACCOUNT
          </h2>
          <nav className='space-y-1'>
            {navItems.slice(0, 2).map(item => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium transition-all hover:text-white ${pathname === item.href ? 'text-white' : 'text-gray-400'
                  }`}
              >
                <span className='text-lg'>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Audio & Video Section */}
        <div>
          <h2 className='mb-3 text-xs font-bold tracking-widest text-green-300'>
            AUDIO & VIDEO
          </h2>
          <nav>
            {navItems[2] && (
              <Link
                href={navItems[2].href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium transition-all hover:text-white ${pathname === navItems[2].href ? 'text-white' : 'text-gray-400'
                  }`}
              >
                <span className='text-lg'>{navItems[2].icon}</span>
                {navItems[2].label}
              </Link>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AccountSidebar;
