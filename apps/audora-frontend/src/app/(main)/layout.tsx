import BackToTopButton from '@/components/back-to-top-button';
import Header from '@/components/header';
import React from 'react';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='bg-black'>
      <Header />
      <main className='text-white'>{children}</main>
      <BackToTopButton />
    </div>
  );
};

export default MainLayout;
