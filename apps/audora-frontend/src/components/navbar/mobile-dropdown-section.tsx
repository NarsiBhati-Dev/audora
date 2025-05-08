'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

type DropdownItem = {
  title: string;
  href: string;
  description: string;
  icon: React.ElementType;
};

type Props = {
  sectionKey: string;
  label: string;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: (key: string) => void;
  onCloseMenu: () => void;
};

const MobileDropdownSection: React.FC<Props> = ({
  sectionKey,
  label,
  items,
  isOpen,
  onToggle,
  onCloseMenu,
}) => {
  return (
    <div className='border-b border-gray-400'>
      <button
        onClick={() => onToggle(sectionKey)}
        className='flex w-full items-center justify-between py-4 text-lg font-semibold text-black'
        aria-expanded={isOpen}
        aria-controls={`dropdown-${sectionKey}`}
      >
        {label}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && items.length > 0 && (
        <div
          className='pb-2 pl-4 transition-all duration-300'
          id={`dropdown-${sectionKey}`}
        >
          {items.map(item => (
            <Link
              key={item.title}
              href={item.href}
              className='flex items-center gap-4 py-2'
              onClick={() => {
                window.scrollTo(0, 0);
                onToggle(sectionKey); // close dropdown
                onCloseMenu(); // close menu
              }}
            >
              <div className='bg-primary-light rounded-md p-3'>
                <item.icon className='h-5 w-5 text-[#7b61ff]' />
              </div>
              <div>
                <p className='text-base font-semibold text-black'>
                  {item.title}
                </p>
                <p className='mt-1 text-sm text-zinc-600'>{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileDropdownSection;
