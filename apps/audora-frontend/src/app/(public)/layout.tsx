import BackToTopButton from '@/components/shared/back-to-top-button';
import React from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <BackToTopButton />
    </>
  );
};

export default PublicLayout;
