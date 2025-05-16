'use client';

import Link from 'next/link';
import React from 'react';
import HoverCard from './hover-card';
import Image from 'next/image';
import { products } from '@/data/ProductsList';
import ProductItem from './product-item';

const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const textColor = scrolled
    ? 'text-black hover:text-gray-600'
    : 'text-zinc-100 hover:text-zinc-300';
  const buttonBg = scrolled
    ? 'bg-black text-white hover:bg-neutral-800'
    : 'bg-white text-black hover:bg-neutral-100';

  return (
    <nav className='relative z-50 hidden w-full items-center justify-between pl-12 font-semibold text-white md:flex'>
      <ul className='flex space-x-8'>
        <li className='relative z-50'>
          <HoverCard triggerText={'Product'} className={textColor}>
            <div className='grid grid-cols-2 gap-6 pl-12'>
              {/* Left column with feature list */}
              <div className='space-y-1 py-4 text-sm'>
                <h3 className='mb-3 text-lg font-bold text-black'>Products</h3>
                {products.map(item => (
                  <ProductItem
                    key={item.title}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    href={item.href}
                  />
                ))}
              </div>

              {/* Right column with image */}
              <div className='w-full space-y-2 rounded-r-lg bg-zinc-100 p-4'>
                <Image
                  src='/images/product-preview.webp'
                  alt='Preview'
                  width={200}
                  height={200}
                  className='h-84 w-full rounded-md object-center'
                />
              </div>
            </div>
          </HoverCard>
        </li>
        <li className={`${textColor} cursor-pointer`}>
          <Link href={'/blogs'}>Blogs</Link>
        </li>
        <li className={`${textColor} cursor-pointer`}>
          <Link href={'/pricing'}>Pricing</Link>
        </li>
      </ul>

      <div className='flex items-center space-x-4 text-base font-semibold'>
        <Link href='/login' className={`${textColor}`}>
          Login
        </Link>
        <button className={`cursor-pointer rounded-lg px-4 py-2 ${buttonBg} `}>
          Start for Free
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
