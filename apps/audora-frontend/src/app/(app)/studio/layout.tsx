import StudioHeader from '@/components/studio/studio-header';
import React from 'react';

const StudioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='bg-studio-bg-light'>
      <StudioHeader />
      {children}
    </main>
  );
};

export default StudioLayout;
