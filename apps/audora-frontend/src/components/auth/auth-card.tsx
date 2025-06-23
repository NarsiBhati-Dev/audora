import React from 'react';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

const AuthCard = ({ children, className }: AuthCardProps) => {
  return (
    <section
      className={cn(
        'relative z-10 flex w-full max-w-4xl h-auto md:h-[85vh] flex-col md:flex-row items-center justify-center rounded-none md:rounded-2xl border border-[#232329] bg-[#121212] shadow-2xl',
        className
      )}
    >
      {children}
    </section>
  );
};

export default AuthCard;
