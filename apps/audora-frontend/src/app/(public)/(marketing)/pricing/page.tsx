import React from 'react';
import getPageMetadata from '@/lib/seo/getPageMetadata';

export const metadata = getPageMetadata({
  title: 'Audora Pricing',
  description: 'Pricing for Audora',
});

const PricingPage = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center bg-black'>
      <h1 className='text-4xl font-bold text-white'>PricingPage</h1>
    </div>
  );
};

export default PricingPage;
