'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FiHome,
  FiFolder,
  // FiCalendar,
  FiVideo,
  FiUserPlus,
  FiSettings,
  // FiChevronLeft,
  // FiChevronRight,
} from 'react-icons/fi';
import Logo from '../../logo';
import Tooltip from '../tooltip';
import AvatarDropdown from '../avatar/avatar-dropdown';
import { DashboardSidebarIcon } from '@/data/icons';
import { Plus } from 'lucide-react';
import PopupWrapper from '../../shared/ui/popup-wrapper';
import CreateStudioPopup from '../account/create-studio-popup';
import { useStudioSettingsStore } from '@/store/studio/studio-settings-store';

const navItems = [
  { href: '/dashboard/home', icon: <FiHome size={22} />, label: 'Home' },
  {
    href: '/projects',
    icon: <FiFolder size={22} />,
    label: 'Projects',
  },
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

const DashboardDesktopSidebar = () => {
  const [open, setOpen] = useState(true);
  const [isCreateStudioOpen, setIsCreateStudioOpen] = useState(false);
  const { studioSetting } = useStudioSettingsStore();

  return (
    <aside
      className={`bg-dashboard-bg hidden h-screen flex-col justify-between pl-2 text-white transition-all duration-300 ease-in-out lg:flex`}
      style={{ width: open ? '16rem' : '4.5rem' }}
    >
      {/* Top Section */}
      <div>
        <div
          className={`mb-6 flex items-center justify-between gap-4 px-4 pt-6 ${open ? '' : 'justify-center'}`}
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
              <DashboardSidebarIcon />
            </button>
          </Tooltip>
        </div>
        <nav className='flex flex-col gap-4 px-2'>
          {!studioSetting.studioSlug ? (
            <>
              <button
                onClick={() => setIsCreateStudioOpen(true)}
                className={`flex items-center gap-4 rounded-xl px-3 py-2 text-base font-medium transition-colors hover:bg-[#292929] ${
                  open ? '' : 'justify-center'
                }`}
              >
                <Plus size={26} className='text-white' />
                {open && 'Create Studio'}
              </button>
              {isCreateStudioOpen && (
                <PopupWrapper
                  open={isCreateStudioOpen}
                  onClose={() => setIsCreateStudioOpen(false)}
                >
                  <CreateStudioPopup
                    onClose={() => setIsCreateStudioOpen(false)}
                  />
                </PopupWrapper>
              )}
            </>
          ) : (
            navItems.map(item => (
              <Tooltip
                key={item.href}
                tooltip={item.label}
                position='right'
                delay={100}
              >
                <Link
                  href={
                    item.label === 'Projects'
                      ? `/studio/${studioSetting.studioSlug}${item.href}`
                      : item.href
                  }
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 text-base font-medium transition-colors hover:bg-[#292929] ${
                    open ? '' : 'justify-center'
                  }`}
                >
                  {item.icon}
                  {open && item.label}
                </Link>
              </Tooltip>
            ))
          )}
        </nav>
      </div>

      {/* Bottom Section */}
      <div
        className={`flex flex-col gap-4 px-2 pb-8 ${open ? '' : 'items-center'}`}
      >
        {studioSetting.studioSlug && (
          <>
            {/* Studio and Invite */}
            <div
              className={`flex items-center gap-3 ${open ? '' : 'flex-col gap-2 border-b border-[#292929] pb-4'}`}
            >
              <a
                href={`/studio/${studioSetting.studioSlug}`}
                className={`flex items-center gap-2 bg-[#232323] text-sm font-semibold transition hover:bg-[#292929] ${
                  open
                    ? 'rounded-3xl px-4 py-3'
                    : 'justify-center rounded-full p-3'
                }`}
              >
                <FiVideo size={20} />
                {open && 'Open Studio'}
              </a>

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
          </>
        )}

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

export default DashboardDesktopSidebar;
