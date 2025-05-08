'use client';

import React from 'react';
import Link from 'next/link';
import type { IconType } from 'react-icons';

interface ProductItemProps {
  icon: IconType;
  title: string;
  description: string;
  href: string;
}

const ProductItem = ({
  icon: Icon,
  title,
  description,
  href,
}: ProductItemProps) => {
  return (
    <Link href={href} aria-label={title} className='block'>
      <div className='group flex w-full cursor-pointer items-start gap-3 rounded-lg p-3 transition-colors hover:bg-zinc-100'>
        <div className='bg-primary-light rounded-md p-3'>
          <Icon className='h-5 w-5 text-[#7b61ff]' />
        </div>
        <div>
          <p className='text-sm font-semibold text-black group-hover:text-[#7b61ff]'>
            {title}
          </p>
          <p className='text-sm text-zinc-600 group-hover:text-zinc-800'>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
