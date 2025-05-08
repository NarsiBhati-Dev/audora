'use client';

import React, { useState, useRef } from 'react';
import DropdownTrigger from './dropdown-trigger';

interface HoverCardProps {
  triggerText: string;
  children: React.ReactNode;
  className?: string;
}

const HoverCard = ({
  triggerText,
  children,
  className = '',
}: HoverCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <div
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownTrigger
        text={triggerText}
        className={className}
        isOpen={isOpen}
      />

      <div
        className={`absolute top-full left-0 mt-7 w-[800px] rounded-xl border border-gray-300 bg-white text-gray-800 shadow-xl transition-all duration-200 ${
          isOpen
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default HoverCard;
