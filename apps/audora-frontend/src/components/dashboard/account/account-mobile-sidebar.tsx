'use client';

import React, { useState, useEffect } from 'react';
import {
  FiChevronDown,
  FiUser,
  FiCreditCard,
  // FiBell,
  FiSettings,
} from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  {
    section: 'YOUR ACCOUNT',
    items: [
      {
        href: '/dashboard/account/settings',
        icon: <FiUser size={20} />,
        label: 'Profile',
      },
      {
        href: '/dashboard/account/subscription',
        icon: <FiCreditCard size={20} />,
        label: 'Subscription',
      },
      //   {
      //     href: '/dashboard/account/notifications',
      //     icon: <FiBell size={20} />,
      //     label: 'Notifications',
      //   },
    ],
  },
  {
    section: 'AUDIO & VIDEO',
    items: [
      {
        href: '/dashboard/account/studio-settings',
        icon: <FiSettings size={20} />,
        label: 'Studio settings',
      },
    ],
  },
];

const AccountMobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const current = navItems
    .flatMap(group => group.items)
    .find(item => pathname?.startsWith(item.href));

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button */}
      <div className='sticky top-0 z-50 py-3 xl:hidden'>
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className='flex items-center gap-2 rounded-full text-white'
          aria-label='Open account menu'
        >
          <h1 className='text-xl font-bold'>{current?.label ?? 'Account'}</h1>
          <FiChevronDown size={20} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 z-50 bg-black/50 transition-opacity duration-300'
          onClick={() => setIsOpen(false)}
          aria-hidden='true'
        />
      )}

      {/* Bottom Sheet Sidebar */}
      {isOpen && (
        <div
          className={`fixed inset-x-4 bottom-4 z-51 rounded-2xl border border-[#292929] bg-[#161515] text-white shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
          style={{ minHeight: '40vh' }}
          role='dialog'
          aria-modal='true'
        >
          {/* Navigation */}
          <div className='space-y-6 px-8 py-8'>
            {navItems.map(group => (
              <div key={group.section}>
                <h2 className='mb-3 text-xs font-bold tracking-widest text-gray-400'>
                  {group.section}
                </h2>
                <nav className='flex flex-col gap-2'>
                  {group.items.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-[rgb(41,41,41)] ${pathname === item.href ? 'bg-[#292929]' : ''
                        }`}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AccountMobileSidebar;
