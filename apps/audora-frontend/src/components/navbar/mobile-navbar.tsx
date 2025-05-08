import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { products } from '@/data/ProductsList';
import Logo from '../logo';
import MobileDropdownSection from './mobile-dropdown-section';

const noScrollbar = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const menuSections = [{ label: 'Product', key: 'product1', items: products }];

const MobileNavbar = ({ scrolled }: { scrolled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const textColor = scrolled ? 'text-black' : 'text-zinc-100';

  // Prevent body scroll when menu is open
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
      <style>{noScrollbar}</style>
      <div className='md:hidden'>
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${textColor} rounded-lg transition-colors`}
          aria-label='Toggle menu'
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Menu Content */}
        <div
          className={`fixed top-0 left-0 z-50 h-full w-full transform rounded-b-2xl bg-white shadow-xl transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className='relative flex h-full flex-col p-4'>
            {/* Close button */}
            <div className='mb-2 flex items-center justify-between'>
              <Logo scrolled={true} />
              <button
                onClick={() => setIsOpen(false)}
                className='rounded-lg p-2 text-black'
                aria-label='Close menu'
              >
                <X size={28} />
              </button>
            </div>

            {/* Scrollable Menu Sections */}
            <nav
              className='no-scrollbar mt-2 mb-4 flex-1 overflow-y-auto pb-32'
              style={{ maxHeight: 'calc(100dvh - 180px)' }}
            >
              {menuSections.map((section, index) => (
                <MobileDropdownSection
                  key={index}
                  sectionKey={section.key}
                  label={section.label}
                  items={section.items}
                  isOpen={openDropdown === section.key}
                  onToggle={key =>
                    setOpenDropdown(openDropdown === key ? null : key)
                  }
                  onCloseMenu={() => setIsOpen(false)}
                />
              ))}

              <Link
                href='/blogs'
                className='block border-b border-gray-400 py-4 text-lg font-semibold text-black'
                onClick={() => setIsOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href='/pricing'
                className='block border-b border-gray-400 py-4 text-lg font-semibold text-black'
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
            </nav>

            {/* Auth Buttons - fixed at the bottom */}
            <div className='fixed bottom-0 left-0 z-50 w-full space-y-4 rounded-b-2xl bg-white p-4 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.04)]'>
              <Link
                href='/login'
                className='block w-full rounded-lg border-2 border-black py-4 text-center text-lg font-bold'
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href='/signup'
                className='block w-full rounded-lg bg-black py-4 text-center text-lg font-bold text-white'
                onClick={() => setIsOpen(false)}
              >
                Start for Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
