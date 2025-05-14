import BackToTopButton from '@/components/back-to-top-button';
import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';

const MarketingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='bg-gray-100'>
      <Header isMarketing={true} />
      <main className='mt-16'>{children}</main>
      <BackToTopButton />
      <Footer />
    </div>
  );
};

export default MarketingLayout;
