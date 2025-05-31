import StudioHeader from '@/components/studio/studio-header';
import React from 'react';

const StudioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StudioHeader />
      {children}
    </>
  );
};

export default StudioLayout;
