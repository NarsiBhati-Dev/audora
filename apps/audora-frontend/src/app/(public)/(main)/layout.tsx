import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
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
      <Footer />
    </div>
  );
};

export default MainLayout;
