'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FiHome,
  // FiFolder,
  // FiCalendar,
  FiVideo,
  FiUserPlus,
  FiSettings,
  // FiChevronLeft,
  // FiChevronRight,
} from 'react-icons/fi';
import Logo from '../logo';
import Tooltip from './tooltip';
import AvatarDropdown from './avatar-dropdown';

const navItems = [
  { href: '/dashboard/home', icon: <FiHome size={22} />, label: 'Home' },
  // {
  //   href: '/dashboard/projects',
  //   icon: <FiFolder size={22} />,
  //   label: 'Projects',
  // },
  // {
  //   href: '/dashboard/schedule',
  //   icon: <FiCalendar size={22} />,
  //   label: 'Scheduled',
  // },
  // {
  //   href: '/dashboard/whats-new',
  //   icon: <MdCelebration size={22} />,
  //   label: `What's new?`,
  // },
];

const DashboardSidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`bg-dashboard-bg hidden h-screen flex-col justify-between pl-2 text-white transition-all duration-300 ease-in-out lg:flex`}
      style={{ width: open ? '16rem' : '4.5rem' }}
    >
      {/* Top Section */}
      <div>
        <div
          className={`mb-8 flex items-center justify-between gap-4 px-4 pt-6 ${open ? '' : 'justify-center'}`}
        >
          {open && <Logo scrolled={false} href='/dashboard/home' />}
          <Tooltip
            tooltip={open ? 'close sidebar' : 'open sidebar'}
            position='right'
          >
            <button
              onClick={() => setOpen(o => !o)}
              className='rounded-full p-[9px] transition hover:bg-[#232323]'
              aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='22'
                height='22'
                viewBox='0 0 24 24'
                fill='none'
                className='injected-svg'
                data-src='https://app.riverside.fm/6.71.17/static/media/collapse.3aeb2685f479dc639bcd.svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
              >
                <g id='Collapse'>
                  <rect
                    id='Rectangle 1014'
                    x='2'
                    y='3'
                    width='20'
                    height='18'
                    rx='4'
                    stroke='#FAFAFA'
                    strokeWidth='1.5'
                  ></rect>
                  <path
                    id='Rectangle 1016-129'
                    d='M10 3L10 12L10 21'
                    stroke='#FAFAFA'
                    strokeWidth='1.5'
                  ></path>
                  <path
                    id='Rectangle 1017-130'
                    d='M5 8L6 8L7 8'
                    stroke='#FAFAFA'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  ></path>
                  <path
                    id='Rectangle 1018-131'
                    d='M5 11L6 11L7 11'
                    stroke='#FAFAFA'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                  ></path>
                </g>
              </svg>
            </button>
          </Tooltip>
        </div>
        <nav className='flex flex-col gap-4 px-2'>
          {navItems.map(item => (
            <Tooltip
              key={item.href}
              tooltip={item.label}
              position='right'
              delay={100}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-3 py-2 text-base font-medium transition-colors hover:bg-[#292929] ${
                  open ? '' : 'justify-center'
                }`}
              >
                {item.icon}
                {open && item.label}
              </Link>
            </Tooltip>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div
        className={`flex flex-col gap-4 px-2 pb-8 ${open ? '' : 'items-center'}`}
      >
        {/* Studio and Invite */}
        <div
          className={`flex items-center gap-3 ${open ? '' : 'flex-col gap-2 border-b border-[#292929] pb-4'}`}
        >
          <Link
            href='/studio'
            className={`flex items-center gap-2 bg-[#232323] text-sm font-semibold transition hover:bg-[#292929] ${
              open ? 'rounded-3xl px-4 py-3' : 'justify-center rounded-full p-3'
            }`}
          >
            <FiVideo size={20} />
            {open && 'Open Studio'}
          </Link>

          <Link
            href='/dashboard/invite'
            className={`rounded-full bg-[#232323] p-3 transition hover:bg-[#292929] ${
              open
                ? 'flex items-center gap-2 rounded-3xl px-4 py-3'
                : 'justify-center rounded-full p-3'
            }`}
          >
            <FiUserPlus size={20} />
          </Link>
        </div>
        {/* Settings */}

        <Link
          href='/dashboard/account/studio-settings'
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition hover:bg-[#292929] ${open ? '' : 'justify-center px-3 py-3'}`}
        >
          <FiSettings size={20} />
          {open && 'Settings'}
        </Link>

        {/* Avatar */}
        <div className={open ? 'pl-2' : 'flex justify-center'}>
          <AvatarDropdown collapsed={!open} />
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
