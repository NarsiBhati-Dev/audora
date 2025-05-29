import getPageMetadata from '@/lib/seo/getPageMetadata';
import React from 'react';

export const metadata = getPageMetadata({
  title: 'Subscription',
});

const SubscriptionPage = () => {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold text-white'>Subscription</h1>
    </div>
  );
};

export default SubscriptionPage;
