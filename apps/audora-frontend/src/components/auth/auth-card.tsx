import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
}

const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <section className='relative z-10 my-2 flex h-[80vh] w-full max-w-4xl flex-col items-center justify-center overflow-hidden bg-black md:mx-2 md:h-[600px] md:flex-row md:rounded-2xl md:border md:border-[#232329] md:bg-[#121212] md:shadow-2xl'>
      {children}
    </section>
  );
};

export default AuthCard;
