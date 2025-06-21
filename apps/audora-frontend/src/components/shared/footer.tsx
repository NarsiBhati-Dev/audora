import React from 'react';
import Link from 'next/link';
import { socialLinks, footerSections, bottomLinks } from '@/data/FooterData';
import Logo from '../logo';

const Footer = () => {
  return (
    <footer className='bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f] text-gray-300'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {/* Company Info */}
          <div className='space-y-4'>
            <Logo />
            <p className='text-sm'>
              Empowering creators with the best audio recording and sharing
              platform.
            </p>
            <div className='flex space-x-4'>
              {socialLinks.map(({ href, label, iconPath }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 transition-colors hover:text-white'
                  aria-label={label}
                >
                  <svg
                    className='h-6 w-6'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d={iconPath} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h3 className='mb-4 font-semibold text-white'>{title}</h3>
              <ul className='space-y-2'>
                {links.map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      href={href}
                      className='transition-colors hover:text-white'
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className='mt-12 border-t border-gray-800 pt-8'>
          <div className='flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
            <p className='text-sm'>
              © {new Date().getFullYear()} Audora. All rights reserved.
            </p>
            <div className='flex space-x-6'>
              {bottomLinks.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className='text-sm transition-colors hover:text-white'
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
