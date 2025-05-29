'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiVideo,
  FiUserPlus,
  FiSettings,
  FiX,
  FiMenu,
} from 'react-icons/fi';
import Logo from '../logo';
import AvatarDropdown from './avatar-dropdown';

const navItems = [
  { href: '/dashboard/home', icon: <FiHome size={22} />, label: 'Home' },
];

const DashboardMobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className='fixed top-3 left-3 z-50 rounded-full bg-[#1e1e1e] p-2.5 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 md:hidden'
        aria-label='Open menu'
      >
        <FiMenu size={20} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300'
          aria-hidden='true'
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-dashboard-bg fixed top-0 left-0 z-50 h-screen w-72 transform p-4 text-white transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role='dialog'
        aria-modal='true'
        aria-label='Navigation menu'
      >
        <div className='flex h-full flex-col justify-between'>
          {/* Header */}
          <div>
            <div className='mb-8 flex items-center justify-between'>
              <Logo scrolled={false} href='/dashboard/home' />
              <button
                onClick={() => setIsOpen(false)}
                className='rounded-full bg-[#232323] p-1.5 transition active:scale-95'
                aria-label='Close sidebar'
              >
                <FiX size={24} />
              </button>
            </div>

            <nav className='flex flex-col gap-4' aria-label='Main navigation'>
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 text-base font-medium transition-colors hover:bg-[#292929] ${
                    pathname === item.href ? 'bg-[#292929]' : ''
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3 border-b border-[#292929] pb-4'>
              <Link
                href='/studio'
                className='flex items-center gap-2 rounded-3xl bg-[#232323] px-4 py-3 text-sm font-semibold transition hover:bg-[#292929] active:scale-[0.98]'
              >
                <FiVideo size={20} />
                Open Studio
              </Link>
              <Link
                href='/dashboard/invite'
                className='flex items-center gap-2 rounded-3xl bg-[#232323] px-4 py-3 text-sm font-semibold transition hover:bg-[#292929] active:scale-[0.98]'
              >
                <FiUserPlus size={20} />
                Invite
              </Link>
            </div>

            <Link
              href='/dashboard/account/settings'
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition hover:bg-[#292929] ${
                pathname === '/dashboard/account/settings' ? 'bg-[#292929]' : ''
              }`}
              aria-current={
                pathname === '/dashboard/account/settings' ? 'page' : undefined
              }
            >
              <FiSettings size={20} />
              Settings
            </Link>

            <div className='pl-2'>
              <AvatarDropdown />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMobileSidebar;
