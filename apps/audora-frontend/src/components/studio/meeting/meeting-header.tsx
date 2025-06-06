'use client';

import React from 'react';
import Logo from '@/components/logo';
import Link from 'next/link';
import { FiChevronLeft, FiSettings } from 'react-icons/fi';
import { useStudioSettingsStore } from '@/store/studio-setting-store';

const MeetingHeader = () => {
    const { studioSetting } = useStudioSettingsStore();

    return (
        <header className='fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-gray-800/50'>
            <div className='flex w-full items-center gap-4'>
                <Link
                    href='/dashboard'
                    className='flex items-center rounded-xl p-2 hover:bg-white/10 transition-all duration-200'
                >
                    <FiChevronLeft className='text-zinc-200 hover:text-white' size={22} />
                </Link>
                <Logo
                    scrolled={false}
                    page={studioSetting.name}
                    href={`/dashboard`}
                />
            </div>
            <div className='flex items-center gap-4'>
                <button className='bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-white transition-all duration-200 flex items-center gap-2'>
                    <FiSettings className='text-zinc-200' size={18} />
                    <span className="text-sm">Settings</span>
                </button>
            </div>
        </header>
    );
};

export default MeetingHeader;




